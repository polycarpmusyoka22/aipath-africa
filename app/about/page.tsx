export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-blue-500">AIPath Africa</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connecting Africa's AI talent with global opportunities through
            innovative recruitment, AI training, and workforce solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-8">
              To empower African professionals by connecting them with
              high-quality AI jobs, remote work, and career development
              opportunities from leading companies worldwide.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-400 leading-8">
              To become Africa's leading AI talent platform, enabling thousands
              of professionals to build meaningful careers in artificial
              intelligence and emerging technologies.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">
            Why Choose AIPath Africa?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div>
              <h3 className="text-xl font-semibold mb-3">Global Opportunities</h3>
              <p>Access remote AI jobs from companies around the world.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
              <p>Learn new skills and prepare for AI careers with confidence.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Trusted Platform</h3>
              <p>A secure platform built to connect talent and employers.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}