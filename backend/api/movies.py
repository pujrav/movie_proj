from __future__ import annotations

import random
import os
from pathlib import Path
from typing import List

import httpx
from fastapi import APIRouter, Depends, HTTPException
from dotenv import load_dotenv
from sqlalchemy.orm import Session

from backend.database import MovieRecord, VoteRecord, get_db
from backend.models import MoviePairResponse, MovieSummary, VoteRequest, VoteResponse

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

router = APIRouter(prefix="/movies", tags=["movies"])

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = os.getenv("TMDB_BASE_URL", "https://api.themoviedb.org/3")
TMDB_IMAGE_BASE = os.getenv("TMDB_IMAGE_BASE", "https://image.tmdb.org/t/p/w500")


def _movie_record_to_summary(record: MovieRecord) -> MovieSummary:
    """Convert a persisted MovieRecord row into the API's MovieSummary model."""
    return MovieSummary(
        id=record.id,
        tmdb_id=record.tmdb_id,
        title=record.title,
        genres=record.genres.split(","),
        poster_url=record.poster_url,
        overview=record.overview,
        rating=record.rating,
        release_year=record.release_year,
    )


def _parse_tmdb_movie(raw: dict) -> dict | None:
    """Convert a raw TMDB movie dict into fields for a MovieRecord row.
    Returns None if essential fields are missing."""
    try:
        poster = raw.get("poster_path")
        if not poster:
            return None  # skip movies without posters

        release_year = int(raw.get("release_date", "0000")[:4])
        if release_year == 0:
            return None

        genres = raw.get("genre_ids", [])
        # TMDB returns genre IDs in list endpoint — map to names
        genre_map = {
            28: "Action", 12: "Adventure", 16: "Animation",
            35: "Comedy", 80: "Crime", 99: "Documentary",
            18: "Drama", 10751: "Family", 14: "Fantasy",
            36: "History", 27: "Horror", 10402: "Music",
            9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
            10770: "TV Movie", 53: "Thriller", 10752: "War",
            37: "Western"
        }
        genre_names = [genre_map.get(g, "Other") for g in genres] or ["Other"]

        return dict(
            tmdb_id=raw["id"],
            title=raw["title"],
            genres=",".join(genre_names),
            poster_url=f"{TMDB_IMAGE_BASE}{poster}",
            overview=raw.get("overview", "No overview available."),
            rating=round(raw.get("vote_average", 0.0), 1),
            release_year=release_year,
        )
    except (KeyError, ValueError, TypeError):
        return None


async def _fetch_tmdb_movies() -> List[dict]:
    """Fetch popular movies from TMDB and return as a list of MovieRecord field dicts.
    Pulls 3 pages (~60 movies) for a good duel pool."""
    if not TMDB_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="TMDB_API_KEY not configured. Check your .env file."
        )

    movies: List[dict] = []
    async with httpx.AsyncClient() as client:
        for page in range(1, 4):  # pages 1, 2, 3 = ~60 movies
            response = await client.get(
                f"{TMDB_BASE_URL}/movie/popular",
                params={
                    "api_key": TMDB_API_KEY,
                    "language": "en-US",
                    "page": page,
                },
                timeout=10.0,
            )
            if response.status_code != 200:
                raise HTTPException(
                    status_code=502,
                    detail=f"TMDB API error: {response.status_code}"
                )

            results = response.json().get("results", [])
            for raw in results:
                movie = _parse_tmdb_movie(raw)
                if movie:
                    movies.append(movie)

    return movies


async def _refresh_movie_cache(db: Session) -> List[MovieRecord]:
    """Force a fresh pull from TMDB, replacing the persisted movie cache."""
    movies = await _fetch_tmdb_movies()

    db.query(MovieRecord).delete()
    db.add_all(MovieRecord(**fields) for fields in movies)
    db.commit()

    return db.query(MovieRecord).all()


async def _get_or_refresh_cache(db: Session) -> List[MovieRecord]:
    """Return the persisted movie cache, populating it from TMDB if empty."""
    records = db.query(MovieRecord).all()
    if not records:
        records = await _refresh_movie_cache(db)
    return records


@router.get("/random-pair", response_model=MoviePairResponse)
async def get_random_pair(db: Session = Depends(get_db)):
    """Return two distinct movies from TMDB for the Movie Duel."""
    records = await _get_or_refresh_cache(db)
    if len(records) < 2:
        raise HTTPException(
            status_code=500,
            detail="Not enough movies available. Check TMDB connection."
        )
    first, second = random.sample(records, 2)
    return MoviePairResponse(
        movieA=_movie_record_to_summary(first),
        movieB=_movie_record_to_summary(second),
    )


@router.get("/refresh-cache")
async def refresh_cache(db: Session = Depends(get_db)):
    """Force a fresh fetch from TMDB. Useful during development."""
    records = await _refresh_movie_cache(db)
    return {"message": f"Cache refreshed. {len(records)} movies loaded."}


@router.post("/vote", response_model=VoteResponse)
async def submit_vote(payload: VoteRequest, db: Session = Depends(get_db)):
    """Store the user's vote and return acknowledgement."""
    records = await _get_or_refresh_cache(db)
    movie_ids = {record.id for record in records}

    if payload.movieA not in movie_ids or payload.movieB not in movie_ids:
        raise HTTPException(status_code=400, detail="Invalid movie ids provided")

    vote = VoteRecord(
        movie_a_id=payload.movieA,
        movie_b_id=payload.movieB,
        choice=payload.choice.value,
    )
    db.add(vote)
    db.commit()
    db.refresh(vote)

    return VoteResponse(success=True, vote_id=vote.id)


@router.get("/votes")
async def get_votes(db: Session = Depends(get_db)):
    """Dev endpoint — see all recorded votes."""
    votes = db.query(VoteRecord).order_by(VoteRecord.id).all()
    return {
        "total": len(votes),
        "votes": [
            {
                "id": vote.id,
                "movieA": vote.movie_a_id,
                "movieB": vote.movie_b_id,
                "choice": vote.choice,
            }
            for vote in votes
        ],
    }
