export default function About() {
  return (
    <section className="bg-[#0B1120] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-2 items-center">

          <div>
            <span className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-400">
              About AIPath Africa
            </span>

            <h2 className="mt-6 text-5xl font-bold text-white leading-tight">
              Empowering Africa's Next Generation of AI Professionals
            </h2>

            <p className="mt-8 text-lg text-gray-400">
              AIPath Africa bridges the gap between talented African professionals
              and the world's fastest-growing AI companies. Whether you're looking
              for AI annotation work, machine learning roles, prompt engineering,
              or AI research opportunities, we're here to help you succeed.
            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">
                <span className="text-blue-500 text-2xl">✓</span>
                <p>Remote AI Jobs</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-blue-500 text-2xl">✓</span>
                <p>Career Development</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-blue-500 text-2xl">✓</span>
                <p>AI Skills Training</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-blue-500 text-2xl">✓</span>
                <p>Global Employer Network</p>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-2xl bg-[#111827] p-8 border border-white/10">
              <h3 className="text-5xl font-bold text-blue-500">5000+</h3>
              <p className="mt-3 text-gray-400">Professionals</p>
            </div>

            <div className="rounded-2xl bg-[#111827] p-8 border border-white/10">
              <h3 className="text-5xl font-bold text-blue-500">250+</h3>
              <p className="mt-3 text-gray-400">AI Companies</p>
            </div>

            <div className="rounded-2xl bg-[#111827] p-8 border border-white/10">
              <h3 className="text-5xl font-bold text-blue-500">18</h3>
              <p className="mt-3 text-gray-400">Countries</p>
            </div>

            <div className="rounded-2xl bg-[#111827] p-8 border border-white/10">
              <h3 className="text-5xl font-bold text-blue-500">100%</h3>
              <p className="mt-3 text-gray-400">Remote</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}