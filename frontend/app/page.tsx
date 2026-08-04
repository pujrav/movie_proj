import Link from "next/link";

const stats = [
  { label: "Duels played", value: "1.2M" },
  { label: "Taste profiles", value: "48k" },
  { label: "Match accuracy", value: "94%" },
  { label: "To first pick", value: "12s" },
];

const features = [
  {
    title: "Taste through duels",
    description: "Two posters, one choice. Comparative preference beats star ratings.",
  },
  {
    title: "A profile that explains itself",
    description: "Your Taste DNA is readable: genres, moods, pacing and era.",
  },
  {
    title: "Ask in plain language",
    description: "The assistant understands intent, not just keywords.",
  },
  {
    title: "Beyond the front page",
    description: "Surfaces hidden gems weighted by your exploration score.",
  },
  {
    title: "Know where to watch",
    description: "Every recommendation includes live availability and runtime.",
  },
  {
    title: "Yours alone",
    description: "No social feed, no engagement bait. Your history stays private.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.12),transparent_38%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.16),transparent_30%),#020617] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="flex items-center justify-between rounded-3xl border border-slate-800/90 bg-slate-900/80 px-6 py-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/20">
              <span className="text-lg font-semibold">C</span>
            </div>
            <span className="text-lg font-semibold tracking-wide">CineMatch</span>
          </div>
          <nav className="hidden items-center gap-8 text-slate-300 md:flex">
            <Link href="#features" className="transition hover:text-white">
              Features
            </Link>
            <Link href="#how" className="transition hover:text-white">
              How it works
            </Link>
            <Link href="#testimonials" className="transition hover:text-white">
              Testimonials
            </Link>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200 transition hover:border-slate-500">
              Log in
            </button>
            <Link
              href="/movie-duel"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </header>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-slate-300 ring-1 ring-white/10">
              Taste modeling, not star ratings
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                Discover movies you&apos;ll <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">actually love</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                CineMatch builds your taste profile from quick head-to-head movie duels, then uses AI to recommend films and series with a clear explanation for every pick.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/movie-duel"
                className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/20 transition hover:opacity-90"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="rounded-full border border-slate-700 px-6 py-3 text-sm text-slate-200 transition hover:border-slate-500"
              >
                Learn More
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl bg-white/5 p-5 text-center ring-1 ring-white/10">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.32em] text-violet-300">CineMatch</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Movie Duel is how we learn your taste.</h2>
            <p className="mt-4 text-slate-300 leading-7">
              Pick between two high-impact movies, and we capture your preferences at the genre, tone, and pacing level. It&apos;s fast, fun, and more honest than ratings.
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Next duel</p>
                <p className="mt-2 text-xl font-semibold text-white">Interstellar vs Blade Runner 2049</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Progress</p>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-14/20 bg-gradient-to-r from-fuchsia-500 to-sky-500" />
                </div>
                <p className="mt-2 text-sm text-slate-400">8 / 12 duels completed</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16 space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Why CineMatch</p>
            <h2 className="text-3xl font-semibold text-white">Recommendations that can show their work</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 transition hover:border-violet-400/30 hover:bg-slate-900">
                <div className="mb-4 h-12 w-12 rounded-2xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20 flex items-center justify-center">
                  <span className="text-lg">+</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-slate-400 leading-7">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
