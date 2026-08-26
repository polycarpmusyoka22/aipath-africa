export default function WhyChoose() {
  const features = [
    {
      title: "Verified AI Jobs",
      description: "Access high-quality AI, data annotation, ML, and remote tech opportunities from trusted global companies.",
    },
    {
      title: "AI Career Growth",
      description: "Improve your CV, prepare for interviews, and grow your AI career with intelligent tools.",
    },
    {
      title: "Global Community",
      description: "Connect with AI professionals, mentors, recruiters, and employers across Africa and beyond.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">
          Why Choose AIPath Africa?
        </h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          Empowering African talent with world-class AI opportunities,
          training, and career support.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 hover:border-cyan-500 transition"
            >
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}