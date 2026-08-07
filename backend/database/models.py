"""SQLAlchemy ORM models — the persisted counterparts of backend/models.py's
Pydantic API schemas. Kept in a separate module/package (backend.database.models
vs. backend.models) so the two never collide on import.
"""

from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Float, Integer, String

from .session import Base


class MovieRecord(Base):
    """A cached TMDB movie. Repopulated wholesale on cache refresh, so
    `id` (the value the frontend/API refer to as the local movie id) is
    stable across requests but not guaranteed stable across refreshes."""

    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, autoincrement=True)
    tmdb_id = Column(Integer, nullable=False, index=True)
    title = Column(String, nullable=False)
    genres = Column(String, nullable=False)  # comma-separated genre names
    poster_url = Column(String, nullable=False)
    overview = Column(String, nullable=False)
    rating = Column(Float, nullable=False)
    release_year = Column(Integer, nullable=False)
    cached_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class VoteRecord(Base):
    """A single Movie Duel vote. movie_a_id/movie_b_id reference MovieRecord.id
    at the time of voting — not enforced as a foreign key, since a later cache
    refresh can legitimately invalidate old ids (same behavior as Phase 1)."""

    __tablename__ = "votes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    movie_a_id = Column(Integer, nullable=False)
    movie_b_id = Column(Integer, nullable=False)
    choice = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
