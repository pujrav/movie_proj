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
    <article className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/90 shadow-2xl shadow-slate-950/40 transition hover:-translate-y-1 hover:border-violet-400/30">
      <div className="relative h-[34rem] overflow-hidden rounded-b-[2.5rem] bg-slate-900">
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
        <div className="absolute left-4 top-4 rounded-full bg-slate-900/70 px-3 py-2 text-sm text-slate-100 ring-1 ring-white/10">
          {releaseYear}
        </div>
      </div>
      <div className="space-y-4 p-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          {genres.map((genre) => (
            <span key={genre} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {genre}
            </span>
          ))}
        </div>
        <p className="text-sm leading-7 text-slate-300">{overview}</p>
      </div>
    </article>
  );
}
