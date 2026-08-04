from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class ChoiceOption(str, Enum):
    MOVIE_A = "movieA"
    MOVIE_B = "movieB"
    NONE = "none"


class UserProfile(BaseModel):
    id: int
    email: str
    age_range: Optional[str]
    gender: Optional[str]
    favorite_language: Optional[str]
    created_at: datetime


class MovieSummary(BaseModel):
    id: int
    tmdb_id: int
    title: str
    genres: List[str]
    poster_url: str
    overview: str
    rating: float
    release_year: int


class MoviePairResponse(BaseModel):
    movieA: MovieSummary
    movieB: MovieSummary


class VoteRequest(BaseModel):
    movieA: int = Field(..., description="Local movie id for the first movie")
    movieB: int = Field(..., description="Local movie id for the second movie")
    choice: ChoiceOption


class VoteResponse(BaseModel):
    success: bool
    vote_id: int


class TasteProfile(BaseModel):
    user_id: int
    genre_preferences: List[str]
    pacing_preferences: List[str]
    tone_preferences: List[str]
    updated_at: datetime
