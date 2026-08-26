import {
  Brain,
  Bot,
  Database,
  MessageSquareCode,
  ArrowRight,
} from "lucide-react";

import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const courses = [
  {
    icon: Brain,
    title: "AI Data Annotation",
    level: "Beginner",
    duration: "4 Weeks",
    description:
      "Learn image, video, text and LiDAR annotation for modern AI systems.",
  },
  {
    icon: Bot,
    title: "AI Evaluation",
    level: "Intermediate",
    duration: "6 Weeks",
    description:
      "Evaluate large language models and improve AI quality through structured reviews.",
  },
  {
    icon: MessageSquareCode,
    title: "Prompt Engineering",
    level: "Beginner",
    duration: "3 Weeks",
    description:
      "Master prompting techniques for ChatGPT, Claude, Gemini and other AI tools.",
  },
  {
    icon: Database,
    title: "Machine Learning Foundations",
    level: "Intermediate",
    duration: "8 Weeks",
    description:
      "Understand datasets, model training and the fundamentals behind modern AI.",
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      <section className="border-b border-zinc-800 py-24">

        <Container>

          <h1 className="text-center text-6xl font-black">
            Learn Artificial Intelligence
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-zinc-400">
            Learn practical AI skills that prepare you for remote work,
            freelancing and careers in Artificial Intelligence.
          </p>

        </Container>

      </section>

      <section className="py-20">

        <Container>

          <div className="grid gap-8 md:grid-cols-2">

            {courses.map((course) => {
              const Icon = course.icon;

              return (
                <Card key={course.title}>

                  <div className="flex items-center justify-between">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10">
                      <Icon className="text-green-500" size={32} />
                    </div>

                    <span className="rounded-full bg-zinc-800 px-4 py-2 text-sm text-green-400">
                      {course.level}
                    </span>

                  </div>

                  <h2 className="mt-8 text-2xl font-bold">
                    {course.title}
                  </h2>

                  <p className="mt-4 leading-8 text-zinc-400">
                    {course.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-zinc-500">
                      {course.duration}
                    </span>

                    <Button>
                      Start Learning
                      <ArrowRight className="ml-2" size={18} />
                    </Button>

                  </div>

                </Card>
              );
            })}

          </div>

        </Container>

      </section>

    </main>
  );
}