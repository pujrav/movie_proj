'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { ChoiceOption, fetchRandomPair, submitVote } from '../lib/api';
import type { MovieSummary } from '../types/movie';

function buildChoiceLabel(choice: ChoiceOption) {
  switch (choice) {
    case ChoiceOption.MOVIE_A:
      return 'Choose Left';
    case ChoiceOption.MOVIE_B:
      return 'Choose Right';
    default:
      return "Never watched either";
  }
}

export default function MovieDuelClient() {
  const [movieA, setMovieA] = useState<MovieSummary | null>(null);
  const [movieB, setMovieB] = useState<MovieSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  async function loadPair() {
    setLoading(true);
    setError(null);
    setFeedback('');

    try {
      const pair = await fetchRandomPair();
      setMovieA(pair.movieA);
      setMovieB(pair.movieB);
    } catch (errorValue) {
      const message = errorValue instanceof Error ? errorValue.message : 'Unexpected error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPair();
  }, []);

  async function handleVote(choice: ChoiceOption) {
    if (!movieA || !movieB) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await submitVote({
        movieA: movieA.id,
        movieB: movieB.id,
        choice,
      });
      setFeedback(`${buildChoiceLabel(choice)} recorded. Loading new pair...`);
      await loadPair();
    } catch (errorValue) {
      const message = errorValue instanceof Error ? errorValue.message : 'Unable to submit vote';
      setError(message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-slate-300 shadow-lg shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Taste profile progress</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-12/12 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500" />
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Hint</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Use left / right buttons or keyboard shortcuts to speed through duels.
          </p>
        </div>
      </div>

      {loading && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 text-slate-300">
          Loading movie pair...
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-rose-500 bg-rose-500/10 p-6 text-rose-200">
          {error}
        </div>
      )}

      {feedback && (
        <div className="rounded-3xl border border-emerald-500 bg-emerald-500/10 p-6 text-emerald-200">
          {feedback}
        </div>
      )}

      {movieA && movieB && (
        <div className="grid gap-6 xl:grid-cols-2">
          <MovieCard
            title={movieA.title}
            overview={movieA.overview}
            posterUrl={movieA.poster_url}
            genres={movieA.genres}
            releaseYear={movieA.release_year}
          />
          <MovieCard
            title={movieB.title}
            overview={movieB.overview}
            posterUrl={movieB.poster_url}
            genres={movieB.genres}
            releaseYear={movieB.release_year}
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <button
          type="button"
          className="rounded-3xl bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-4 text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleVote(ChoiceOption.MOVIE_A)}
          disabled={loading}
        >
          Choose Left
        </button>
        <button
          type="button"
          className="rounded-3xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 px-6 py-4 text-white shadow-lg shadow-slate-950/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleVote(ChoiceOption.NONE)}
          disabled={loading}
        >
          Never watched either
        </button>
        <button
          type="button"
          className="rounded-3xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-4 text-white shadow-lg shadow-fuchsia-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleVote(ChoiceOption.MOVIE_B)}
          disabled={loading}
        >
          Choose Right
        </button>
      </div>
    </div>
  );
}
