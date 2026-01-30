export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-center">
      <div className="max-w-2xl space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
          QuizApp Studio
        </p>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">
          Something epic is in the works
        </h1>
        <p className="text-lg text-slate-300">
          We are crafting the next-gen quiz experience for AI engineers. Check
          back soon to explore guided practice runs, real-world agent missions,
          and deep dives built by mentors who care about your growth.
        </p>
        <div className="inline-flex items-center gap-3 rounded-full border border-slate-800/70 bg-slate-900/40 px-6 py-3 text-sm text-slate-200">
          <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-emerald-400" />
          In development &mdash; stay tuned
        </div>
      </div>
    </main>
  )
}
