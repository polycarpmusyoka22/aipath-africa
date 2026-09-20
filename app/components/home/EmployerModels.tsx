import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Layers3,
  Users,
} from "lucide-react";

const models = [
  {
    title: "Recruitment",
    description:
      "Find qualified African professionals for your AI, data, technology, and remote roles.",
    icon: Users,
  },
  {
    title: "Project Staffing",
    description:
      "Build a dedicated team of African professionals for a specific AI or data project.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Talent Marketplace",
    description:
      "Access professionals on a flexible project basis depending on your requirements.",
    icon: Layers3,
  },
  {
    title: "Enterprise Workforce",
    description:
      "Build and coordinate larger AI data teams through AIPath Africa as your needs grow.",
    icon: Building2,
  },
];

export default function EmployerModels() {
  return (
    <section className="border-y border-white/10 bg-[#0D0D10]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            Employer Partnerships
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Flexible Ways to Work With AIPath Africa
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Whether you need one specialist, a project team, or larger delivery
            capacity, we can start by understanding your requirements.
          </p>
        </div>

        {/* Models */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {models.map((model) => {
            const Icon = model.icon;

            return (
              <div
                key={model.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {model.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {model.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/employer/projects/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Talk to AIPath Africa
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}