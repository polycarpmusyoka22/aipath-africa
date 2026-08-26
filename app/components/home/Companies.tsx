export default function Companies() {
  const companies = [
    "Outlier",
    "TELUS Digital",
    "Scale AI",
    "Appen",
    "Sama",
    "Invisible",
    "CloudFactory",
    "Alignerr",
  ];

  return (
    <section
      id="companies"
      className="py-28 bg-zinc-950 text-white px-8"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <p className="text-green-500 uppercase tracking-[5px]">
            Trusted Companies
          </p>

          <h2 className="text-5xl font-bold mt-4">
            Companies Hiring AI Talent
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {companies.map((company) => (
            <div
              key={company}
              className="bg-black border border-zinc-800 rounded-2xl p-8 text-center text-xl font-bold hover:border-green-500 transition"
            >
              {company}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}