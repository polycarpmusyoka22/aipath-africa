import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#09090B] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            African AI Talent &amp; Project Delivery
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Hire Skilled African AI Talent for Your Next Project
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
            Access African professionals for AI data annotation, model
            evaluation, data collection, language projects, AI training, and
            technical work.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-400">
            Looking for work? Explore remote AI opportunities and build your
            career with AIPath Africa.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/hire"
              className="w-full rounded-xl bg-cyan-500 px-8 py-4 text-center text-lg font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
            >
              Hire AI Talent
            </Link>

            <Link
              href="/jobs"
              className="w-full rounded-xl border border-gray-700 px-8 py-4 text-center text-lg font-medium text-white transition hover:border-cyan-500 hover:bg-white/5 sm:w-auto"
            >
              Explore AI Jobs
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5K+</div>
            <div className="mt-2 text-sm text-gray-400">
              AI Professionals
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-white">250+</div>
            <div className="mt-2 text-sm text-gray-400">
              Companies
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-white">18</div>
            <div className="mt-2 text-sm text-gray-400">
              African Countries
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="mt-2 text-sm text-gray-400">
              Remote Access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}