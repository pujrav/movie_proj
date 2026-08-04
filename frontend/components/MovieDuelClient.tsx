'use client';

import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { ChoiceOption, fetchRandomPair, submitVote } from '../lib/api';
import type { MovieSummary } from '../types/movie';

function buildChoiceLabel(choice: ChoiceOption) {
  switch (choice) {
    case ChoiceOption.MOVIE_A:
      return 'Choose Movie A';
    case ChoiceOption.MOVIE_B:
      return 'Choose Movie B';
    default:
      return "I haven't watched either";
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
      setFeedback(`Vote recorded (${buildChoiceLabel(choice)}). Loading new pair...`);
      await loadPair();
    } catch (errorValue) {
      const message = errorValue instanceof Error ? errorValue.message : 'Unable to submit vote';
      setError(message);
    }
  }

  return (
    <div className="space-y-6">
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
          className="rounded-3xl bg-slate-800 px-5 py-4 text-left text-white transition hover:bg-slate-700"
          onClick={() => handleVote(ChoiceOption.MOVIE_A)}
          disabled={loading}
        >
          Choose Movie A
        </button>
        <button
          type="button"
          className="rounded-3xl bg-slate-800 px-5 py-4 text-left text-white transition hover:bg-slate-700"
          onClick={() => handleVote(ChoiceOption.MOVIE_B)}
          disabled={loading}
        >
          Choose Movie B
        </button>
        <button
          type="button"
          className="rounded-3xl bg-slate-800 px-5 py-4 text-left text-white transition hover:bg-slate-700"
          onClick={() => handleVote(ChoiceOption.NONE)}
          disabled={loading}
        >
          I haven't watched either
        </button>
      </div>
    </div>
  );
}
