"use client";

import Link from "next/link";
import { jobs } from "../../lib/jobs";

export default function Jobs() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Latest Opportunities
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Featured AI Jobs
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Discover remote AI, data, and technology opportunities
            from companies hiring talent around the world.
          </p>
        </div>

        {/* Jobs */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-2xl border border-white/10 bg-zinc-900/80 p-7 transition duration-300 hover:-translate-y-2 hover:border-cyan-500/60"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-xl">
                  🤖
                </div>

                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                  {job.type}
                </span>
              </div>

              {/* Job title */}
              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-cyan-400 transition">
                {job.title}
              </h3>

              {/* Company */}
              <p className="mt-2 font-medium text-gray-300">
                {job.company}
              </p>

              {/* Details */}
              <div className="mt-5 space-y-2 text-sm text-gray-400">
                <p>📍 {job.location}</p>
                <p>💼 {job.category}</p>
              </div>

              {/* Salary */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm text-gray-500">
                  Estimated pay
                </p>

                <p className="mt-1 text-xl font-bold text-cyan-400">
                  {job.salary}
                </p>
              </div>

              {/* Apply */}
              <Link
                href={`/apply?jobId=${job.id}`}
                className="mt-6 block w-full rounded-xl bg-cyan-500 py-3 text-center font-semibold text-black transition hover:bg-cyan-400"
              >
                Apply Now →
              </Link>

            </div>
          ))}
        </div>

        {/* View All Jobs */}
        <div className="mt-14 text-center">
          <Link
            href="/jobs"
            className="inline-block rounded-xl border border-cyan-500 px-8 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
          >
            View All Jobs →
          </Link>
        </div>

      </div>
    </section>
  );
}