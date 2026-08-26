export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-black to-blue-950 px-6">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb33,transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-7xl text-center">

        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-blue-400">
          Africa's AI Career Platform
        </span>

        <h1 className="mt-8 text-6xl font-black leading-tight md:text-7xl">
          Connecting
          <span className="text-blue-500"> African Talent </span>
          with
          <br />
          Global AI Opportunities
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-300">
          Find remote AI jobs, data annotation projects, machine learning
          opportunities, and AI training programs from the world's top
          companies.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-700">
            Explore Jobs
          </button>

          <button className="rounded-xl border border-gray-700 px-8 py-4 text-lg transition hover:border-blue-500">
            Hire Talent
          </button>

        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">

          <div>
            <h2 className="text-4xl font-bold text-blue-500">5K+</h2>
            <p className="text-gray-400">AI Professionals</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-500">250+</h2>
            <p className="text-gray-400">Companies</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-500">18</h2>
            <p className="text-gray-400">African Countries</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-500">100%</h2>
            <p className="text-gray-400">Remote Ready</p>
          </div>

        </div>

      </div>

    </section>
  );
}