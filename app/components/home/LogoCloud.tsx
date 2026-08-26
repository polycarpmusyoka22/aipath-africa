const companies = [
  "OpenAI",
  "Google",
  "Microsoft",
  "NVIDIA",
  "Scale AI",
  "Appen",
  "CloudFactory",
  "Sama",
];

export default function LogoCloud() {
  return (
    <section className="bg-[#0d1117] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-3xl font-bold text-white">
          Trusted by the AI Industry
        </h2>

        <p className="mt-4 text-center text-gray-400">
          Connecting talent with leading AI companies worldwide.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">

          {companies.map((company) => (
            <div
              key={company}
              className="rounded-xl border border-white/10 bg-white/5 p-8 text-center transition duration-300 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <h3 className="text-lg font-semibold text-white">
                {company}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}