import MovieDuelClient from "../../components/MovieDuelClient";

export default function MovieDuelPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-xl shadow-slate-900/20">
          <h1 className="text-3xl font-semibold">Movie Duel</h1>
          <p className="mt-2 text-slate-400">
            Pick the movie that matches your taste best, or choose if you haven't watched either.
          </p>
          <div className="mt-8">
            <MovieDuelClient />
          </div>
        </section>
      </div>
    </main>
  );
}
