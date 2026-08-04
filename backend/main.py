from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import router as movies_router

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
