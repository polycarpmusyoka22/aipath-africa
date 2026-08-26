import { Building2, Globe, ArrowRight } from "lucide-react";

import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const companies = [
  {
    name: "Outlier",
    description:
      "AI training and evaluation opportunities for remote professionals.",
    hiring: "Hiring",
    website: "#",
  },
  {
    name: "TELUS Digital",
    description:
      "Global AI data annotation and language evaluation projects.",
    hiring: "Hiring",
    website: "#",
  },
  {
    name: "Scale AI",
    description:
      "Machine learning data labeling and AI research support.",
    hiring: "Hiring",
    website: "#",
  },
  {
    name: "Invisible Technologies",
    description:
      "AI operations, automation and model evaluation services.",
    hiring: "Open Roles",
    website: "#",
  },
  {
    name: "Sama",
    description:
      "Ethical AI data annotation with opportunities across Africa.",
    hiring: "Hiring",
    website: "#",
  },
  {
    name: "CloudFactory",
    description:
      "Remote digital workforce supporting AI and business operations.",
    hiring: "Recruiting",
    website: "#",
  },
];

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      <section className="border-b border-zinc-800 py-24">

        <Container>

          <h1 className="text-center text-6xl font-black">
            AI Companies
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-zinc-400">
            Discover companies offering Artificial Intelligence,
            machine learning and data annotation opportunities.
          </p>

        </Container>

      </section>

      <section className="py-20">

        <Container>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {companies.map((company) => (
              <Card key={company.name}>

                <div className="flex items-center justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10">
                    <Building2
                      className="text-green-500"
                      size={30}
                    />
                  </div>

                  <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
                    {company.hiring}
                  </span>

                </div>

                <h2 className="mt-8 text-2xl font-bold">
                  {company.name}
                </h2>

                <p className="mt-4 leading-8 text-zinc-400">
                  {company.description}
                </p>

                <div className="mt-8 flex items-center justify-between">

                  <div className="flex items-center gap-2 text-zinc-500">
                    <Globe size={18} />
                    Global
                  </div>

                  <Button>
                    View Company
                    <ArrowRight className="ml-2" size={18} />
                  </Button>

                </div>

              </Card>
            ))}

          </div>

        </Container>

      </section>

    </main>
  );
}