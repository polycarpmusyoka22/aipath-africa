"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "Is AIPath Africa free?",
      a: "Yes. Anyone can join AIPath Africa and browse opportunities for free.",
    },
    {
      q: "Do you only support Africa?",
      a: "Our mission is to empower African talent while connecting them with employers and opportunities worldwide.",
    },
    {
      q: "What types of opportunities are available?",
      a: "AI training, data annotation, machine learning, software engineering, prompt engineering, data collection, and other AI-related opportunities.",
    },
    {
      q: "How can I apply for a job?",
      a: "Create an account, complete your candidate profile, browse available opportunities, and apply directly through AIPath Africa.",
    },
    {
      q: "Can companies hire talent through AIPath Africa?",
      a: "Yes. Employers can connect with skilled African AI professionals and use AIPath Africa to find talent for AI and technology projects.",
    },
    {
      q: "How do I know if an opportunity is legitimate?",
      a: "We focus on legitimate opportunities and aim to provide clear information about employers, roles, requirements, and application processes.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-cyan-400 font-semibold mb-3">
            NEED HELP?
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Find answers to common questions about AIPath Africa,
            opportunities, applications, and employers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className="border border-zinc-800 rounded-xl bg-zinc-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left p-6 hover:bg-zinc-800/60 transition"
                >
                  <span className="text-lg font-semibold pr-4">
                    {faq.q}
                  </span>

                  <span className="text-cyan-400 text-2xl">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}