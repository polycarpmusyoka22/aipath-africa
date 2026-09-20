import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Code2, Database, Sparkles } from "lucide-react";

const learningAreas = [
  {
    title: "AI & Machine Learning",
    description:
      "Build practical knowledge in artificial intelligence, machine learning, and modern AI workflows.",
    icon: Brain,
  },
  {
    title: "Data Annotation",
    description:
      "Learn the fundamentals of image, video, text, and structured AI data annotation.",
    icon: Database,
  },
  {
    title: "AI Tools & Workflows",
    description:
      "Develop practical skills for working with AI platforms, evaluation tasks, and digital workflows.",
    icon: Sparkles,
  },
  {
    title: "Programming",
    description:
      "Strengthen your technical foundation with Python, software development, and automation skills.",
    icon: Code2,
  },
];

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-[#09090B] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            <BookOpen size={16} />
            AIPath Africa Learning
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Build Your AI Skills
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Learn the practical skills needed to participate in the growing
            AI economy and prepare for remote AI opportunities.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {learningAreas.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Icon size={24} />
                </div>

                <h2 className="mt-5 text-xl font-semibold">{area.title}</h2>

                <p className="mt-3 leading-7 text-slate-400">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-8">
          <h2 className="text-2xl font-bold">Ready to put your skills to work?</h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Explore current AI opportunities on AIPath Africa and start
            building your experience.
          </p>

          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Explore AI Jobs
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}