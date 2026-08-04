export interface MovieSummary {
  id: number;
  tmdb_id: number;
  title: string;
  genres: string[];
  poster_url: string;
  overview: string;
  rating: number;
  release_year: number;
}
