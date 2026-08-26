import { MapPin, Briefcase, DollarSign } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

type Job = {
  id: number;
  company: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  category: string;
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>
          <span className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
            {job.category}
          </span>

          <h2 className="mt-4 text-2xl font-bold">
            {job.title}
          </h2>

          <p className="mt-2 text-green-400 font-medium">
            {job.company}
          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-zinc-400">

            <span className="flex items-center gap-2">
              <MapPin size={18} />
              {job.location}
            </span>

            <span className="flex items-center gap-2">
              <Briefcase size={18} />
              {job.type}
            </span>

            <span className="flex items-center gap-2">
              <DollarSign size={18} />
              {job.salary}
            </span>

          </div>
        </div>

        <Button>
          Apply Now
        </Button>

      </div>
    </Card>
  );
}