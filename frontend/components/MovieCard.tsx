export interface MovieCardProps {
  title: string;
  overview: string;
  posterUrl: string;
  genres: string[];
  releaseYear: number;
}

export default function MovieCard({
  title,
  overview,
  posterUrl,
  genres,
  releaseYear,
}: MovieCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-950/40">
      <img
        src={posterUrl}
        alt={`${title} poster`}
        className="h-96 w-full object-cover"
      />
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-400">{releaseYear}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          {genres.map((genre) => (
            <span key={genre} className="rounded-full bg-slate-800 px-2 py-1">
              {genre}
            </span>
          ))}
        </div>
        <p className="text-sm leading-6 text-slate-300">{overview}</p>
      </div>
    </article>
  );
}
