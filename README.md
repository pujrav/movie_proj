# CineMatch 🎬

**An interactive AI-powered movie recommendation platform powered by "Movie Duel" gameplay**

CineMatch helps users discover movies tailored to their taste by comparing movies head-to-head. Instead of traditional ratings, users engage in a game-like interface to build their unique taste profile, which is then used to generate personalized AI-powered recommendations.

---

## 📊 Current Status: Phase 1 + 2 + Real Movie Data ✅

Phase 1 MVP is **complete and fully functional**, Phase 4 TMDB integration and Phase 2 database persistence have both landed ahead of schedule. User authentication (Phase 3) is the next milestone — see [What's Coming](#-whats-coming-next) below.

### ✨ What's Implemented

#### **Core Gameplay**
- ✅ **Movie Duel Game**: Users compare two real movies side-by-side
- ✅ **Interactive Voting**: Choose Movie A, Movie B, or "I haven't watched either"
- ✅ **Real-time Pair Loading**: New movie pairs load immediately after voting
- ✅ **Vote History**: Votes are persisted to a database and survive server restarts

#### **User Interface**
- ✅ **Homepage**: Beautiful landing page with hero section and CTA ("Start Movie Duel")
- ✅ **Movie Duel Page**: Clean, responsive game interface with two movie cards side-by-side
- ✅ **Movie Cards**: Display poster, title, genres, release year, rating, and overview
- ✅ **Loading States**: Visual feedback while fetching movie pairs and submitting votes
- ✅ **Error Handling**: Graceful error messages if API requests fail
- ✅ **Dark Theme**: Modern dark-mode design with sky-500 blue accents
- ✅ **Responsive Layout**: Works on desktop and tablet screens

#### **Backend APIs**
- ✅ `GET /` - Health check endpoint
- ✅ `GET /movies/random-pair` - Fetch two random movies without duplication
- ✅ `GET /movies/refresh-cache` - Force a fresh pull from TMDB
- ✅ `POST /movies/vote` - Record user votes and submit choices
- ✅ `GET /movies/votes` - Dev endpoint to inspect all recorded votes

#### **Data**
- ✅ **Real TMDB Integration**: Pulls ~60 live popular movies (title, genres, poster, rating, release year, overview) from The Movie Database API
- ✅ **Persistent Storage**: Votes and the movie cache are stored in a real database (SQLite locally by default, `DATABASE_URL` swaps in Postgres) via SQLAlchemy — both **survive server restarts** now (see [backend/database/](backend/database/))
- ✅ **Type-Safe Models**: Pydantic schemas for API validation; separate SQLAlchemy ORM models for persistence

#### **Code Quality**
- ✅ **TypeScript**: Full type safety across frontend
- ✅ **ESLint**: Zero linting errors or warnings
- ✅ **Production Build**: Optimized build passing all checks
- ✅ **Python Type Hints**: Backend uses Pydantic for validation
- ✅ **CORS Configured**: Secure cross-origin communication setup

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 14.2.5 | React meta-framework for production |
| **React** | 18.3.1 | UI component library |
| **TypeScript** | 5.4.5 | Type-safe JavaScript |
| **Tailwind CSS** | 3.4.5 | Utility-first CSS styling |
| **ESLint** | 9.x | Code quality linting |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **FastAPI** | 0.128.8 | Modern Python web framework |
| **Python** | 3.9 | Backend language |
| **Uvicorn** | 0.39.0 | ASGI server |
| **Pydantic** | 2.13.4 | Data validation |
| **httpx** | 0.28.1 | Async HTTP client (TMDB calls) |
| **python-dotenv** | 1.2.1 | Loads `.env` config |
| **SQLAlchemy** | 2.0.51 | ORM — persists votes and movie cache |
| **SQLite** | (bundled) | Default local database (`backend/cinematch.db`); swap for Postgres via `DATABASE_URL` |
| **TMDB API** | v3 | Source of real movie data — requires `TMDB_API_KEY` |

### Development
| Tool | Purpose |
|------|---------|
| **Git/GitHub** | Version control |
| **Virtual Environment** | Python dependency isolation |
| **npm** | Node package management |
| **Node.js** | v26.6.0 |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v26.6.0+ (with npm 11.18.0+)
- Python 3.9+
- macOS, Linux, or WSL

### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure TMDB (required — /movies endpoints call out to TMDB live)
cp .env.example .env
# then edit backend/.env and set TMDB_API_KEY to a real TMDB v3 API key

# Start server with hot-reload — run from the PROJECT ROOT, not from backend/.
# backend/main.py uses a relative import (`from .api import router`), so it
# must be launched as a package: `backend.main:app`. Running `uvicorn main:app`
# from inside backend/ will fail with "attempted relative import with no
# known parent package".
cd ..
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Started server process
INFO:     Application startup complete
```

> **Note:** Movie data and votes are persisted to a local SQLite database
> (`backend/cinematch.db`, created automatically on first run) — both survive
> server restarts. `GET /movies/refresh-cache` still force-refreshes the
> movie cache from TMDB on demand. To reset everything during development,
> stop the server and delete `backend/cinematch.db`.

### Frontend Setup

Open a **new terminal/tab**:

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  ✓ Ready in 925ms
```

### Access the App

Open your browser and visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

### Environment Variables

- **Backend**: `backend/.env` with a real `TMDB_API_KEY` is **required** — the `/movies` endpoints fail without it. Set it up in Backend Setup above (`cp backend/.env.example backend/.env`, then edit it).
- **Frontend**: optional. It defaults to `http://localhost:8000` for the API; only create `frontend/.env.local` (`cp frontend/.env.example frontend/.env.local`) if you need to point it elsewhere.

---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:8000`

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "message": "CineMatch backend is running"
}
```

---

#### 2. Get Random Movie Pair
```http
GET /movies/random-pair
```
Pulls from a persisted cache of ~60 movies fetched live from TMDB's
"popular" endpoint (fetched and stored in the database on first request,
then reused — including across server restarts — until
`/movies/refresh-cache` is called).

**Response (200 OK):**
```json
{
  "movieA": {
    "id": 1,
    "tmdb_id": 278,
    "title": "The Shawshank Redemption",
    "genres": ["Drama", "Crime"],
    "poster_url": "https://image.tmdb.org/t/p/w500/...",
    "overview": "Two imprisoned men bond over...",
    "rating": 9.3,
    "release_year": 1994
  },
  "movieB": {
    "id": 4,
    "tmdb_id": 550,
    "title": "Fight Club",
    "genres": ["Drama", "Thriller"],
    "poster_url": "https://image.tmdb.org/t/p/w500/...",
    "overview": "An insomniac office worker...",
    "rating": 8.8,
    "release_year": 1999
  }
}
```

---

#### 3. Refresh Movie Cache
```http
GET /movies/refresh-cache
```
Forces a fresh pull of ~60 popular movies from TMDB, replacing the
persisted cache in the database. Useful during development or once the
cache goes stale.

**Response (200 OK):**
```json
{
  "message": "Cache refreshed. 60 movies loaded."
}
```

---

#### 4. Submit Vote
```http
POST /movies/vote
Content-Type: application/json

{
  "movieA": 1,
  "movieB": 4,
  "choice": "movieA"
}
```

**Parameters:**
- `movieA` (int): local `id` of the first movie (from `/movies/random-pair`)
- `movieB` (int): local `id` of the second movie
- `choice` (string): one of `"movieA"`, `"movieB"`, or `"none"`

**Response (200 OK):**
```json
{
  "success": true,
  "vote_id": 1
}
```

---

#### 5. List Votes (dev only)
```http
GET /movies/votes
```
Returns every vote ever recorded (persisted — not reset by server restarts).

**Response (200 OK):**
```json
{
  "total": 18,
  "votes": [
    { "id": 1, "movieA": 3, "movieB": 53, "choice": "movieB" }
  ]
}
```

---

## 📁 Project Structure

```
Movie_ai_proj/
├── backend/
│   ├── .venv/                    # Python virtual environment
│   ├── api/
│   │   └── movies.py             # Movie endpoints
│   ├── database/
│   │   ├── session.py            # Engine/session setup (SQLite default, DATABASE_URL override)
│   │   └── models.py             # SQLAlchemy ORM models (MovieRecord, VoteRecord)
│   ├── cinematch.db              # SQLite database file (created on first run, gitignored)
│   ├── main.py                   # FastAPI application
│   ├── models.py                 # Pydantic API schemas
│   ├── requirements.txt           # Python dependencies
│   ├── .env.example              # Environment template
│   └── .gitignore                # Git exclusions
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx            # Root layout component
│   │   ├── page.tsx              # Homepage
│   │   └── movie-duel/
│   │       └── page.tsx          # Movie Duel game page
│   ├── components/
│   │   ├── MovieCard.tsx         # Movie card display
│   │   └── MovieDuelClient.tsx   # Game state management
│   ├── lib/
│   │   └── api.ts                # API client
│   ├── types/
│   │   └── movie.ts              # TypeScript interfaces
│   ├── styles/
│   │   └── globals.css           # Global Tailwind styles
│   ├── package.json              # Node dependencies
│   ├── tsconfig.json             # TypeScript config
│   ├── tailwind.config.ts        # Tailwind configuration
│   ├── postcss.config.mjs        # PostCSS config
│   ├── next.config.ts            # Next.js config
│   ├── .eslintrc.json            # ESLint rules
│   ├── .eslintignore             # ESLint exclusions
│   ├── .env.example              # Environment template (.env.local is optional, see below)
│   └── .gitignore                # Git exclusions
│
├── CHANGES_SUMMARY.md            # Detailed changelog
├── README.md                     # This file
└── .gitignore                    # Root gitignore
```

---

## 💻 Development Commands

### Frontend
```bash
cd frontend

npm run dev       # Start development server (hot reload)
npm run build     # Build for production
npm run start     # Run production build
npm run lint      # Check code quality with ESLint
```

### Backend
```bash
# From the PROJECT ROOT (see note in Backend Setup above about why)
source backend/.venv/bin/activate
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### Testing APIs
```bash
# Health check
curl http://localhost:8000/

# Force-refresh the TMDB movie cache
curl http://localhost:8000/movies/refresh-cache

# Get random movie pair
curl http://localhost:8000/movies/random-pair

# Submit a vote
curl -X POST http://localhost:8000/movies/vote \
  -H "Content-Type: application/json" \
  -d '{"movieA": 1, "movieB": 4, "choice": "movieA"}'

# See all votes recorded this session
curl http://localhost:8000/movies/votes
```

---

## 🎮 How to Use CineMatch

### Step 1: Start Both Servers
Follow the Quick Start guide above to run both backend and frontend.

### Step 2: Visit Homepage
Open http://localhost:3000 in your browser.

### Step 3: Start Movie Duel
Click the "Start Movie Duel" button on the homepage.

### Step 4: Compare Movies
You'll see two movie cards side-by-side. Each card shows:
- Movie poster image
- Title and release year
- Genres
- Rating
- Overview/description

### Step 5: Vote
Click one of three buttons:
- **Choose Movie A** - You prefer the left movie
- **Choose Movie B** - You prefer the right movie
- **I haven't watched either** - Skip this comparison

### Step 6: Repeat
After voting, a new pair of movies loads automatically. Continue playing to build your taste profile!

---

## 🔄 What's Coming Next

### Phase 2: Database & Persistence — ✅ done ahead of schedule
- [x] SQLite (local, default) / PostgreSQL (deployed, via `DATABASE_URL`) integration
- [x] SQLAlchemy ORM models for votes and the movie cache ([backend/database/models.py](backend/database/models.py))
- [x] Vote history persistence — survives server restarts
- [x] Migrated `_votes` and `_movie_cache` off in-memory Python lists in [backend/api/movies.py](backend/api/movies.py)
- [ ] Alembic migrations (currently uses `Base.metadata.create_all` on startup — fine for SQLite, worth revisiting before Postgres/production)

### Phase 3: User Authentication — **up next**
- [ ] User accounts with Clerk
- [ ] Personalized taste profiles per user
- [ ] Vote history tied to user accounts
- [ ] User statistics and insights

### Phase 4: Real Movie Data — ✅ done ahead of schedule
- [x] TMDB API integration (currently ~60 popular movies per cache refresh; can widen to more pages later)
- [x] Movie posters, ratings, and metadata
- [x] Real release dates and genres
- [ ] User reviews integration (not started)

### Phase 5: AI Recommendations
- [ ] OpenAI integration for explanations
- [ ] Taste profile generation from votes
- [ ] Personalized movie recommendations
- [ ] "Why we think you'll like this" explanations
- [ ] Recommendation explanations powered by AI

### Phase 6: Advanced Features
- [ ] Social sharing (share recommendations)
- [ ] Friend taste comparison
- [ ] Movie watchlist
- [ ] Rating and review system
- [ ] Admin dashboard with analytics
- [ ] Mobile app (React Native)

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| **Frontend Components** | 2 reusable components |
| **Frontend Pages** | 2 pages (Homepage, Movie Duel) |
| **Backend Endpoints** | 5 endpoints |
| **Movie Data** | ~60 live movies from TMDB per cache refresh, persisted in DB |
| **TypeScript Files** | 100% type safe |
| **Python Dependencies** | 6 direct packages (FastAPI, Uvicorn, Pydantic, httpx, python-dotenv, SQLAlchemy) |
| **Node Dependencies** | 15+ packages |
| **Build Status** | ✅ All checks passing |
| **ESLint Errors** | 0 |
| **TypeScript Errors** | 0 |
| **Lines of Code** | ~800+ |

---

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 8000 is in use:
```bash
# Kill processes on specific port
lsof -i tcp:8000 -t | xargs kill -9
lsof -i tcp:3000 -t | xargs kill -9
```

### Module Not Found Error (Backend)
Ensure the virtual environment is activated and you're running uvicorn
from the **project root** (not `cd backend`) — see the note in
[Backend Setup](#backend-setup):
```bash
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### "TMDB_API_KEY not configured" Error
Set a real key in `backend/.env` (see [Environment Variables](#-environment-variables)),
then hit `curl http://localhost:8000/movies/refresh-cache` to confirm it's picked up.

### Reset Local Database
Votes and the movie cache persist in `backend/cinematch.db` (SQLite). To
wipe everything and start clean:
```bash
# Stop the backend server first
rm backend/cinematch.db
# Next server start recreates empty tables; next /movies/random-pair call
# repopulates the movie cache from TMDB
```

### CORS Errors
The backend CORS is configured for `http://localhost:3000`. If using a different port, update [backend/main.py](backend/main.py):
```python
allow_origins=["http://localhost:YOUR_PORT"]
```

### ESLint Errors (Frontend)
```bash
cd frontend
npm run lint          # See errors
npm install --legacy-peer-deps  # Fix if needed
```

---

## 📝 Environment Variables

### Backend (.env)
```
TMDB_API_KEY=...              # Required now — /movies endpoints call TMDB live
TMDB_BASE_URL=https://api.themoviedb.org/3   # Optional, defaults shown
TMDB_IMAGE_BASE=https://image.tmdb.org/t/p/w500  # Optional, defaults shown
DATABASE_URL=postgresql://...  # Optional — defaults to local SQLite (backend/cinematch.db) if unset
OPENAI_API_KEY=...            # Not read yet — for Phase 5
```
`backend/.env` is loaded explicitly from `backend/api/movies.py` regardless
of the process's working directory — get a free key at
[themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🤝 Contributing

### Code Style
- **Frontend**: TypeScript with ESLint + Prettier
- **Backend**: Python with type hints via Pydantic
- **Git**: Conventional commits recommended

### Development Workflow
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Run linter: `npm run lint` (frontend) or `pylint` (backend)
4. Commit: `git commit -m "feat: add your feature"`
5. Push: `git push origin feature/your-feature`

---

## 📄 License

This project is private. All rights reserved.

---

## 👤 Author

**Raveesh Pujari**
- GitHub: [@pujrav](https://github.com/pujrav)
- Repository: [movie_proj](https://github.com/pujrav/movie_proj)

---

## 📞 Support

For issues or questions:
1. Check the [CHANGES_SUMMARY.md](CHANGES_SUMMARY.md) for detailed implementation notes
2. Review the API documentation above
3. Check existing GitHub issues

---

**Last Updated:** August 6, 2026  
**Status:** Phase 1 MVP + TMDB Live Data + Database Persistence ✅  
**Next Phase:** User Authentication (Phase 3)
