"""Database engine/session setup.

Defaults to a local SQLite file (backend/cinematch.db) so Phase 2 works with
zero external setup. Set DATABASE_URL in backend/.env to point at Postgres
(or anything else SQLAlchemy supports) once this gets deployed.
"""

import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

_BACKEND_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=_BACKEND_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{_BACKEND_DIR / 'cinematch.db'}")

# check_same_thread=False is only needed/safe for SQLite — FastAPI may serve
# a request's DB session from a different thread than it was created on.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency — yields a request-scoped DB session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
