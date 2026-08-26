const jobs = [
  {
    title: "AI Data Annotator",
    company: "CloudFactory",
    location: "Remote",
    salary: "$8–12/hr",
    type: "Contract",
  },
  {
    title: "LLM Trainer",
    company: "Outlier AI",
    location: "Remote",
    salary: "$20–35/hr",
    type: "Part-Time",
  },
  {
    title: "AI Prompt Engineer",
    company: "Invisible Technologies",
    location: "Remote",
    salary: "$30–50/hr",
    type: "Full-Time",
  },
  {
    title: "Machine Learning Engineer",
    company: "Scale AI",
    location: "Remote",
    salary: "$40–70/hr",
    type: "Full-Time",
  },
  {
    title: "AI Quality Reviewer",
    company: "DataForce",
    location: "Remote",
    salary: "$15–25/hr",
    type: "Contract",
  },
  {
    title: "Computer Vision Annotator",
    company: "TELUS Digital",
    location: "Remote",
    salary: "$10–18/hr",
    type: "Part-Time",
  },
];

export default function Jobs() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white">
            Featured AI Jobs
          </h2>

          <p className="mt-4 text-lg text-gray-400">
            Discover high-paying AI opportunities from leading global companies.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-8 hover:border-cyan-500 hover:-translate-y-2 transition duration-300"
            >
              <span className="inline-block rounded-full bg-cyan-500/20 text-cyan-400 px-3 py-1 text-sm">
                {job.type}
              </span>

              <h3 className="mt-5 text-2xl font-bold text-white">
                {job.title}
              </h3>

              <p className="mt-3 text-gray-300">
                🏢 {job.company}
              </p>

              <p className="text-gray-400">
                📍 {job.location}
              </p>

              <p className="mt-4 text-cyan-400 font-bold text-lg">
                {job.salary}
              </p>

              <button className="mt-8 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400 transition">
                Apply Now →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="rounded-xl border border-cyan-500 px-8 py-4 text-cyan-400 font-semibold hover:bg-cyan-500 hover:text-black transition">
            View All Jobs
          </button>
        </div>

      </div>
    </section>
  );
}