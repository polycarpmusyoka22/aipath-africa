"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

type Application = {
  id: string | number;
  job_id: string | number;
  email: string;
  status: string | null;
  created_at: string;
};

type Job = {
  id: string | number;
  title: string;
  company: string;
};

export default function CandidatePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidateDashboard();
  }, []);

  async function loadCandidateDashboard() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/Login";
      return;
    }

    const userEmail = user.email || "";

    setEmail(userEmail);

    // Load profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.name) {
      setName(profile.name);
    }

    // Load applications belonging to this candidate
    const { data: applicationData, error: applicationError } =
      await supabase
        .from("applications")
        .select(
          "id, job_id, email, status, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

    if (applicationError) {
      console.error(
        "Applications error:",
        applicationError
      );

      setApplications([]);
      setLoading(false);
      return;
    }

    setApplications(applicationData || []);

    // Find jobs connected to applications
    const jobIds = [
      ...new Set(
        (applicationData || []).map(
          (application) => application.job_id
        )
      ),
    ];

    if (jobIds.length > 0) {
      const { data: jobData, error: jobError } =
        await supabase
          .from("jobs")
          .select("id, title, company")
          .in("id", jobIds);

      if (jobError) {
        console.error(
          "Jobs error:",
          jobError
        );
      } else {
        setJobs(jobData || []);
      }
    } else {
      setJobs([]);
    }

    setLoading(false);
  }

  function getJob(jobId: string | number) {
    return jobs.find(
      (job) =>
        String(job.id) === String(jobId)
    );
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
      "en-KE",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  }

  function statusStyle(status: string | null) {
    switch (
      (status || "pending").toLowerCase()
    ) {
      case "accepted":
        return "bg-green-500/10 text-green-400 border-green-500/30";

      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/30";

      case "reviewing":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";

      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-gray-400">
          Loading your dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-cyan-400 font-semibold">
            AIPath Africa
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Candidate Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            Welcome back
            {name ? `, ${name}` : ""}.
            Manage your profile and track your
            applications.
          </p>

          <p className="text-gray-500 mt-1">
            {email}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <Link
            href="/candidate/profile"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition"
          >
            <div className="text-3xl mb-3">
              👤
            </div>

            <h2 className="text-xl font-bold">
              My Profile
            </h2>

            <p className="text-gray-400 mt-2">
              Update your profile and CV.
            </p>
          </Link>

          <Link
            href="/jobs"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition"
          >
            <div className="text-3xl mb-3">
              💼
            </div>

            <h2 className="text-xl font-bold">
              Find Jobs
            </h2>

            <p className="text-gray-400 mt-2">
              Browse available AI opportunities.
            </p>
          </Link>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="text-3xl mb-3">
              📋
            </div>

            <h2 className="text-xl font-bold">
              Applications
            </h2>

            <p className="text-gray-400 mt-2">
              {applications.length} submitted
              application
              {applications.length === 1
                ? ""
                : "s"}
              .
            </p>
          </div>

        </div>

        {/* Applications */}
        <section>

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-3xl font-bold">
                My Applications
              </h2>

              <p className="text-gray-400 mt-1">
                Track the jobs you have applied for.
              </p>
            </div>

            <Link
              href="/jobs"
              className="hidden md:block bg-cyan-500 text-black px-5 py-3 rounded-xl font-bold hover:bg-cyan-400 transition"
            >
              Find More Jobs →
            </Link>

          </div>

          {applications.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">

              <div className="text-5xl mb-4">
                📭
              </div>

              <h3 className="text-2xl font-bold">
                No applications yet
              </h3>

              <p className="text-gray-400 mt-2 mb-6">
                You haven't submitted any job
                applications yet.
              </p>

              <Link
                href="/jobs"
                className="inline-block bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-400 transition"
              >
                Browse AI Jobs
              </Link>

            </div>
          ) : (
            <div className="space-y-5">

              {applications.map(
                (application) => {
                  const job = getJob(
                    application.job_id
                  );

                  return (
                    <div
                      key={application.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/40 transition"
                    >

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>

                          <h3 className="text-2xl font-bold">
                            {job?.title ||
                              `Job #${application.job_id}`}
                          </h3>

                          <p className="text-gray-300 mt-1">
                            {job?.company ||
                              "AIPath Africa opportunity"}
                          </p>

                          <p className="text-gray-500 text-sm mt-3">
                            Applied on{" "}
                            {formatDate(
                              application.created_at
                            )}
                          </p>

                        </div>

                        <span
                          className={`px-4 py-2 rounded-full border font-semibold capitalize ${statusStyle(
                            application.status
                          )}`}
                        >
                          {application.status ||
                            "Pending"}
                        </span>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </section>

        {/* Mobile button */}
        <div className="mt-8 md:hidden">

          <Link
            href="/jobs"
            className="block text-center bg-cyan-500 text-black px-6 py-4 rounded-xl font-bold"
          >
            Find More Jobs →
          </Link>

        </div>

      </div>
    </main>
  );
}