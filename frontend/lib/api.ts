import type { MovieSummary } from "../types/movie";

export const backendBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export interface RandomPairResponse {
  movieA: MovieSummary;
  movieB: MovieSummary;
}

/* eslint-disable no-unused-vars */
export enum ChoiceOption {
  MOVIE_A = "movieA",
  MOVIE_B = "movieB",
  NONE = "none",
}
/* eslint-enable no-unused-vars */

export interface VotePayload {
  movieA: number;
  movieB: number;
  choice: ChoiceOption;
}

export async function fetchRandomPair(): Promise<RandomPairResponse> {
  const response = await fetch(`${backendBaseUrl}/movies/random-pair`);
  if (!response.ok) {
    throw new Error("Unable to load movies. Please try again.");
  }
  return response.json();
}

export async function submitVote(payload: VotePayload): Promise<void> {
  const response = await fetch(`${backendBaseUrl}/movies/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to submit vote.");
  }
}
