"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setJobs(data || []);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-4">
          AI Jobs
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Browse the latest AI opportunities across Africa and beyond.
        </p>

        {loading ? (
          <p className="text-center text-gray-400">
            Loading jobs...
          </p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-400">
            No jobs available yet.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-green-500 transition"
              >

                <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm mb-4">
                  {job.type}
                </span>

                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p className="text-green-400 mt-2">
                  {job.company}
                </p>

                <p className="text-gray-400 mt-2">
                  📍 {job.location}
                </p>

                <p className="text-blue-400 font-semibold mt-2">
                  {job.salary}
                </p>

                <p className="text-gray-300 mt-4 line-clamp-4">
                  {job.description}
                </p>

                <Link
                  href={`/apply/${job.id}`}
                  className="block w-full mt-6 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold text-center transition"
                >
                  Apply Now
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}