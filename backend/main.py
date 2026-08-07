from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv  # ADD THIS

load_dotenv()  # ADD THIS

from .api import router as movies_router
from .database import Base, engine

# Phase 2: create tables on startup if they don't exist yet. Fine for SQLite;
# swap for Alembic migrations before this needs to run against Postgres.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CineMatch Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(movies_router)

@app.get("/")
def read_root():
    return {"message": "CineMatch backend is running"}