const categories = [
  {
    title: "Computer Vision",
    description:
      "Support visual AI projects with structured image and video annotation.",
    services: [
      "Bounding boxes",
      "Segmentation",
      "Object tracking",
      "Image classification",
      "2D / 3D annotation",
    ],
  },
  {
    title: "LiDAR & 3D",
    description:
      "Support spatial and autonomous-vehicle datasets with specialized annotation.",
    services: [
      "Point-cloud annotation",
      "3D cuboids",
      "Road objects",
      "Vehicle annotation",
      "Lane and road marking",
    ],
  },
  {
    title: "AI & LLM Evaluation",
    description:
      "Human evaluation and review workflows for modern AI systems.",
    services: [
      "Response evaluation",
      "Prompt evaluation",
      "Text classification",
      "Search relevance",
      "Safety evaluation",
    ],
  },
  {
    title: "Language & Speech",
    description:
      "Support multilingual AI projects with language and speech workflows.",
    services: [
      "Transcription",
      "Translation",
      "Speech collection",
      "Voice evaluation",
      "African-language datasets",
    ],
  },
  {
    title: "Data Collection",
    description:
      "Coordinate structured collection projects across African markets.",
    services: [
      "Image collection",
      "Video collection",
      "Audio collection",
      "Field data",
      "Geospatial data",
    ],
  },
];

export default function AIDataOperations() {
  return (
    <section className="border-y border-white/10 bg-[#0D0D10]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            AI Data Operations
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI Talent for the Work Behind AI
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Access African talent for data collection, annotation, evaluation,
            language work, quality assurance, and other AI project workflows.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/30 hover:bg-white/[0.05]"
            >
              <h3 className="text-xl font-semibold text-white">
                {category.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                {category.description}
              </p>

              <div className="mt-6 space-y-3">
                {category.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="text-cyan-300">✓</span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}