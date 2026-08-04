import random
from typing import List

from fastapi import APIRouter, HTTPException

from backend.models import MoviePairResponse, MovieSummary, VoteRequest, VoteResponse

router = APIRouter(prefix="/movies", tags=["movies"])

# Mock movie data used for Phase 1. Later we will replace this with TMDB integration.
MOCK_MOVIES: List[MovieSummary] = [
    MovieSummary(
        id=1,
        tmdb_id=299534,
        title="Avengers: Endgame",
        genres=["Action", "Adventure", "Sci-Fi"],
        poster_url="https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        overview="After the devastating events of Avengers: Infinity War, the universe is in ruins.",
        rating=8.3,
        release_year=2019,
    ),
    MovieSummary(
        id=2,
        tmdb_id=550,
        title="Fight Club",
        genres=["Drama"],
        poster_url="https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
        overview="An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
        rating=8.4,
        release_year=1999,
    ),
    MovieSummary(
        id=3,
        tmdb_id=157336,
        title="Interstellar",
        genres=["Adventure", "Drama", "Sci-Fi"],
        poster_url="https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        overview="A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        rating=8.6,
        release_year=2014,
    ),
    MovieSummary(
        id=4,
        tmdb_id=24428,
        title="The Avengers",
        genres=["Action", "Adventure", "Sci-Fi"],
        poster_url="https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
        overview="Earth's mightiest heroes must come together and learn to fight as a team.",
        rating=8.0,
        release_year=2012,
    ),
]

# In-memory storage for Phase 1 vote tracking.
_votes: List[dict] = []
_vote_counter = 1


def _get_random_movie_pair() -> MoviePairResponse:
    first, second = random.sample(MOCK_MOVIES, 2)
    return MoviePairResponse(movieA=first, movieB=second)


@router.get("/random-pair", response_model=MoviePairResponse)
def get_random_pair():
    """Return two distinct movies for the Movie Duel exercise."""
    return _get_random_movie_pair()


@router.post("/vote", response_model=VoteResponse)
def submit_vote(payload: VoteRequest):
    """Store the user's vote for a movie pair and return a lightweight acknowledgement."""
    global _vote_counter

    movie_ids = {movie.id for movie in MOCK_MOVIES}
    if payload.movieA not in movie_ids or payload.movieB not in movie_ids:
        raise HTTPException(status_code=400, detail="Invalid movie ids provided")

    vote_record = {
        "id": _vote_counter,
        "movieA": payload.movieA,
        "movieB": payload.movieB,
        "choice": payload.choice.value,
    }
    _votes.append(vote_record)
    _vote_counter += 1

    return VoteResponse(success=True, vote_id=vote_record["id"])
