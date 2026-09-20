import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Database,
  Languages,
  ScanSearch,
  ShieldCheck,
  Users,
} from "lucide-react";

const services = [
  {
    title: "AI Data Annotation",
    description:
      "Image, video, text, 2D/3D and other structured annotation workflows.",
    icon: ScanSearch,
  },
  {
    title: "AI & LLM Evaluation",
    description:
      "Evaluate model responses, prompts, relevance, safety and quality.",
    icon: Brain,
  },
  {
    title: "Data Collection",
    description:
      "Support image, video, audio, speech and field data collection projects.",
    icon: Database,
  },
  {
    title: "Language & Speech",
    description:
      "Support transcription, translation, speech collection and multilingual AI work.",
    icon: Languages,
  },
  {
    title: "Human-in-the-Loop QA",
    description:
      "Human review, validation, quality assurance and structured evaluation.",
    icon: ShieldCheck,
  },
  {
    title: "AI Project Delivery",
    description:
      "Build and coordinate African teams for defined AI and data projects.",
    icon: Bot,
  },
];

const benefits = [
  {
    title: "Access African Talent",
    description:
      "Connect with professionals across Africa for AI and data-focused work.",
    icon: Users,
  },
  {
    title: "Project-Based Teams",
    description:
      "Request individual specialists or coordinated teams for defined projects.",
    icon: Brain,
  },
  {
    title: "Quality-Focused Delivery",
    description:
      "Structure projects around requirements, workflow coordination and quality checks.",
    icon: ShieldCheck,
  },
  {
    title: "Remote-Ready",
    description:
      "Work with professionals remotely across supported locations.",
    icon: CheckCircle2,
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description: "Submit your project requirements and tell us what you're building.",
  },
  {
    number: "02",
    title: "We identify suitable talent",
    description: "We look for professionals whose skills match your requirements.",
  },
  {
    number: "03",
    title: "Screen and coordinate",
    description: "We organize the appropriate talent and project workflow.",
  },
  {
    number: "04",
    title: "Start the project",
    description: "Begin working with the selected talent or delivery team.",
  },
  {
    number: "05",
    title: "Scale when needed",
    description: "Increase or adjust your project capacity as your needs change.",
  },
];

export default function HirePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              <Bot size={16} />
              African AI Talent & Project Delivery
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Hire Skilled African AI Talent for Your Next Project
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Access African professionals for AI data annotation, model
              evaluation, data collection, language projects, technical work,
              and managed AI project delivery.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/employer/projects/submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Submit an AI Project
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore AI Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            What We Provide
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            AI Talent for Every Stage of Your Workflow
          </h2>

          <p className="mt-4 text-lg text-slate-400">
            Tell us what your project requires and we can help identify,
            coordinate and manage suitable African talent.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Why AIPath Africa
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              More Than a Talent Directory
            </h2>

            <p className="mt-4 text-lg text-slate-400">
              For defined projects, AIPath Africa can support talent sourcing,
              coordination and delivery rather than simply listing candidates.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            How It Works
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            From Project Request to Delivery
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="text-sm font-bold text-cyan-300">
                {step.number}
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 p-8 sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Have an AI Project?
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Tell us what you&apos;re building.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              Submit your requirements and AIPath Africa can review the
              project and identify relevant African talent or delivery
              capacity.
            </p>

            <div className="mt-7">
              <Link
                href="/employer/projects/submit"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Request Talent / Submit Project
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}