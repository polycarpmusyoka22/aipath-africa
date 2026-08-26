import {
  BrainCircuit,
  Briefcase,
  FileText,
  Users,
  ArrowRight,
} from "lucide-react";

import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Container from "../ui/Container";

const services = [
  {
    icon: Briefcase,
    title: "Verified AI Jobs",
    description:
      "Discover remote AI jobs from trusted companies hiring African talent.",
  },
  {
    icon: BrainCircuit,
    title: "AI Learning Paths",
    description:
      "Master Data Annotation, Prompt Engineering, AI Evaluation and more.",
  },
  {
    icon: FileText,
    title: "Resume & Interview Prep",
    description:
      "Create professional resumes and prepare for AI assessments and interviews.",
  },
  {
    icon: Users,
    title: "Community & Mentorship",
    description:
      "Connect with professionals, mentors and fellow learners across Africa.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-[#09090B]">
      <Container>

        <SectionTitle
          eyebrow="OUR SERVICES"
          title="Everything You Need To Build an AI Career"
          description="AIPath Africa provides the tools, knowledge and opportunities needed to help African professionals succeed in Artificial Intelligence."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card key={service.title}>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10">

                  <Icon
                    className="text-green-500"
                    size={34}
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-4 text-zinc-400 leading-8">
                  {service.description}
                </p>

                <button className="mt-8 flex items-center gap-2 font-semibold text-green-500 hover:gap-4 transition-all">
                  Learn More

                  <ArrowRight size={18} />

                </button>

              </Card>
            );
          })}

        </div>

      </Container>
    </section>
  );
}