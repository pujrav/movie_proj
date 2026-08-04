import MovieDuelClient from "../../components/MovieDuelClient";

export default function MovieDuelPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),transparent_26%),#020617] text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[280px_1fr] lg:px-10">
        <aside className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30">
              C
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-violet-300">CineMatch</p>
              <p className="text-sm text-slate-400">Movie Duel</p>
            </div>
          </div>
          <nav className="space-y-2">
            {[
              { label: "Dashboard", active: false },
              { label: "Movie Duel", active: true },
              { label: "AI Recommendations", active: false },
              { label: "Watchlist", active: false },
              { label: "Profile", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
                  item.active ? "bg-violet-500/20 text-white ring-1 ring-violet-500/30" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Taste profile</p>
            <p className="mt-3 text-xl font-semibold text-white">0 preferences recorded</p>
            <p className="mt-3 text-sm text-slate-400">Play more duels to sharpen your recommendations.</p>
            <button className="mt-6 w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90">
              Continue duel
            </button>
          </div>
        </aside>

        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Movie Duel</p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Which one would you rewatch?</h1>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              1 / 8
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-slate-400">
            Choose the movie that matches your taste best, or skip if you haven&apos;t watched either.
          </p>
          <div className="mt-8">
            <MovieDuelClient />
          </div>
        </section>
      </div>
    </main>
  );
}
