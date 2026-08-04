import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-10 shadow-xl shadow-slate-900/20">
          <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
            CineMatch MVP
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white">
            Build a personalized movie taste profile with Movie Duel.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 leading-7">
            Choose between two movies, teach CineMatch what you love, and get smarter recommendations over time.
          </p>
          <div className="mt-8">
            <Link
              href="/movie-duel"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Start Movie Duel
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
