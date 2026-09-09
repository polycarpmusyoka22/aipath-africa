"use client";

import Link from "next/link";
import { jobs } from "../lib/jobs";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-green-400 font-semibold uppercase tracking-widest text-sm">
            AIPath Africa
          </p>

          <h1 className="text-5xl font-bold mt-3">
            AI Jobs
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Browse AI, data, technology, and remote opportunities
            from companies hiring around the world.
          </p>
        </div>

        {/* Job count */}
        <div className="mb-8">
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-white font-semibold">
              {jobs.length}
            </span>{" "}
            opportunities
          </p>
        </div>

        {/* Jobs */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {jobs.map((job) => (

            <div
              key={job.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-green-500 transition duration-300"
            >

              {/* Type */}
              <span className="inline-block bg-green-600/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm mb-5">
                {job.type}
              </span>

              {/* Title */}
              <h2 className="text-2xl font-bold">
                {job.title}
              </h2>

              {/* Company */}
              <p className="text-green-400 mt-2 font-semibold">
                {job.company}
              </p>

              {/* Location */}
              <p className="text-gray-400 mt-4">
                📍 {job.location}
              </p>

              {/* Category */}
              <p className="text-gray-400 mt-2">
                💼 {job.category}
              </p>

              {/* Salary */}
              <p className="text-blue-400 font-semibold mt-3">
                {job.salary}
              </p>

              {/* Description */}
              <p className="text-gray-400 mt-5 text-sm leading-relaxed">
                AIPath Africa opportunity in the{" "}
                {job.category.toLowerCase()} field.
                Review the official opportunity requirements
                before applying.
              </p>

              {/* Apply */}
              <Link
                href={`/apply/${job.id}`}
                className="block w-full mt-6 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold text-center transition"
              >
                Apply Now →
              </Link>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}