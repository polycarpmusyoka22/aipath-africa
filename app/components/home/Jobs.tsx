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

              {/* Verification Badge */}
              {"verified" in job && job.verified === true && (
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
                  ✓ Verified Opportunity
                </div>
              )}

              {/* Job title */}
              <h3 className="mt-6 text-xl font-bold text-white transition group-hover:text-cyan-400">
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

        {/* Job Verification */}
        <div className="mt-20 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 md:p-10">
          <div className="mx-auto max-w-4xl">

            <div className="text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
                ✓ Opportunity Verification
              </div>

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                How We Verify Opportunities
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                We review job opportunities before presenting them to our
                community so professionals can better understand the source
                and application details.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">

              {/* Check 1 */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-lg text-cyan-400">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-semibold text-white">
                      Company or source identified
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      We identify the company or original source of the
                      opportunity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 2 */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-lg text-cyan-400">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-semibold text-white">
                      Original job source checked
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      We check the original listing or source where
                      available.
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 3 */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-lg text-cyan-400">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-semibold text-white">
                      Application link verified
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      We check that the application route is available and
                      relevant.
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 4 */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-lg text-cyan-400">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-semibold text-white">
                      Location and eligibility checked
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      We review location and eligibility information where
                      it is provided.
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 5 */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-lg text-cyan-400">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-semibold text-white">
                      Compensation checked where available
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Pay information is reviewed where the original source
                      provides it.
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 6 */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-lg text-cyan-400">
                    ✓
                  </span>

                  <div>
                    <h3 className="font-semibold text-white">
                      No upfront payment required from applicants
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      AIPath Africa does not require candidates to pay upfront
                      just to apply for an opportunity.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Verification note */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <p className="text-sm leading-6 text-gray-400">
                A Verified Opportunity means the opportunity and its source
                have been reviewed against the information available to us.
                Verification does not guarantee hiring, selection, or
                continued availability.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}