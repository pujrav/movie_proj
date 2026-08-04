# CineMatch

Interactive movie recommendation platform.

## Phase 1 MVP

This repository contains the Phase 1 foundation for CineMatch:
- `frontend/`: Next.js + TypeScript + Tailwind UI
- `backend/`: FastAPI backend with mock movie duel endpoints
- `shared/`: space for shared types and utilities
- `docs/`: project documentation

## Current Phase 1 features

- `GET /movies/random-pair` returns two mock movies
- `POST /movies/vote` stores a duel vote in-memory
- Homepage and Movie Duel UI in the Next.js frontend
- frontend/backend connection via `NEXT_PUBLIC_API_BASE_URL`

## Setup

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment variables

Copy the example files and add any API keys later:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

## Project structure

- `frontend/`
  - `app/`
  - `components/`
  - `lib/`
  - `styles/`
  - `package.json`
- `backend/`
  - `api/`
  - `models.py`
  - `main.py`
- `shared/`
- `docs/`
