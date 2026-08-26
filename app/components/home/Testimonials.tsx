import { Star } from "lucide-react";

import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    name: "Sarah N.",
    role: "AI Data Annotator",
    company: "Outlier",
    text: "AIPath Africa helped me understand AI assessments and prepare for remote opportunities with confidence.",
  },
  {
    name: "David M.",
    role: "AI Trainer",
    company: "TELUS Digital",
    text: "The learning resources and career guidance made my transition into AI much easier.",
  },
  {
    name: "Grace K.",
    role: "Prompt Engineer",
    company: "Freelancer",
    text: "A clean platform with practical learning paths. It's exactly what African AI professionals need.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#09090B] py-28">
      <Container>

        <SectionTitle
          eyebrow="SUCCESS STORIES"
          title="What Our Community Says"
          description="Hear from professionals building careers in Artificial Intelligence."
        />

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((person) => (
            <Card key={person.name}>

              <div className="mb-6 flex text-green-500">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="leading-8 text-zinc-400">
                "{person.text}"
              </p>

              <div className="mt-8 border-t border-zinc-800 pt-6">

                <h4 className="font-bold">
                  {person.name}
                </h4>

                <p className="text-sm text-green-400">
                  {person.role}
                </p>

                <p className="text-sm text-zinc-500">
                  {person.company}
                </p>

              </div>

            </Card>
          ))}

        </div>

      </Container>
    </section>
  );
}