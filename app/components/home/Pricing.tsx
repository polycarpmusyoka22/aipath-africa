export default function FAQ() {
  const faqs = [
    {
      q: "Is AIPath Africa free?",
      a: "Yes. Anyone can join and browse opportunities for free.",
    },
    {
      q: "Do you only support Africa?",
      a: "Our mission is to empower African talent while connecting them with employers worldwide.",
    },
    {
      q: "What types of jobs are available?",
      a: "AI training, data annotation, machine learning, software engineering, prompt engineering, and more.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-zinc-800 rounded-xl p-6 bg-zinc-900"
            >
              <h3 className="text-xl font-semibold">{faq.q}</h3>
              <p className="text-gray-400 mt-3">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}