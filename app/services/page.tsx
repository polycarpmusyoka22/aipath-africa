export default function ServicesPage() {
  const services = [
    {
      title: "AI Talent Recruitment",
      description:
        "Helping companies hire skilled AI professionals from across Africa.",
      icon: "🤝",
    },
    {
      title: "Data Annotation & Labeling",
      description:
        "High-quality image, video, text, audio, and LiDAR annotation services.",
      icon: "🏷️",
    },
    {
      title: "AI Model Training",
      description:
        "Support for RLHF, prompt engineering, AI evaluation, and model improvement.",
      icon: "🧠",
    },
    {
      title: "Enterprise AI Solutions",
      description:
        "Custom AI workforce solutions for startups and enterprises.",
      icon: "🏢",
    },
    {
      title: "Career Development",
      description:
        "Resources and opportunities to help professionals grow in AI careers.",
      icon: "🚀",
    },
    {
      title: "Remote Work Opportunities",
      description:
        "Connecting African talent with global remote AI jobs.",
      icon: "🌍",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold">
            Our <span className="text-blue-500">Services</span>
          </h1>
          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
            We connect businesses with exceptional AI talent while empowering
            professionals across Africa to build successful AI careers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-blue-500 hover:-translate-y-1"
            >
              <div className="text-5xl mb-6">{service.icon}</div>

              <h2 className="text-2xl font-bold mb-4">
                {service.title}
              </h2>

              <p className="text-gray-400 leading-7">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}