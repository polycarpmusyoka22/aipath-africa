import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Submit your AI project requirements, including the skills, team size, timeline, and type of work.",
  },
  {
    number: "02",
    title: "We identify suitable talent",
    description:
      "We review your requirements and identify relevant African professionals or project teams.",
  },
  {
    number: "03",
    title: "Screen and coordinate",
    description:
      "We organize the appropriate talent and coordinate the project workflow around your requirements.",
  },
  {
    number: "04",
    title: "Start your project",
    description:
      "Begin the engagement with the selected professionals or delivery team.",
  },
  {
    number: "05",
    title: "Scale when needed",
    description:
      "Increase or adjust your project capacity as your requirements evolve.",
  },
];

export default function EmployerHowItWorks() {
  return (
    <section className="border-y border-white/10 bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            How It Works
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From Project Request to Delivery
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            A simple process for companies looking for African AI talent and
            project delivery support.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="text-sm font-bold tracking-wider text-cyan-300">
                {step.number}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                For Companies
              </p>

              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                Looking for African AI Talent?
              </h3>

              <p className="mt-4 text-lg leading-8 text-slate-300">
                Tell us what you&apos;re building. We&apos;ll review your
                requirements and help identify relevant talent or project
                delivery capacity.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/employer/projects/submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Request Talent
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}