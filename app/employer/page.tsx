"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EmployerPage() {
  const router = useRouter();

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [pending, setPending] = useState(0);
  const [accepted, setAccepted] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/Login");
      return;
    }

    const { data: jobs, error: jobsError } = await supabase
      .from("jobs")
      .select("id")
      .eq("user_id", user.id);

    if (jobsError) {
      alert(jobsError.message);
      setLoading(false);
      return;
    }

    const jobIds = (jobs || []).map((job) => job.id);

    setTotalJobs(jobIds.length);

    if (jobIds.length === 0) {
      setLoading(false);
      return;
    }

    const { data: applications, error } = await supabase
      .from("applications")
      .select("id, status")
      .in("job_id", jobIds);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const apps = applications || [];

    setTotalApplications(apps.length);

    setPending(
      apps.filter((app) => app.status === "pending").length
    );

    setAccepted(
      apps.filter((app) => app.status === "accepted").length
    );

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">
          Loading dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Employer Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your jobs and candidates.
            </p>
          </div>

          <button
            onClick={() => router.push("/employer/applications")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold"
          >
            View Applications
          </button>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-5 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Total Jobs
            </p>

            <p className="text-4xl font-bold mt-2">
              {totalJobs}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Applications
            </p>

            <p className="text-4xl font-bold mt-2">
              {totalApplications}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Pending
            </p>

            <p className="text-4xl font-bold text-yellow-400 mt-2">
              {pending}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Accepted
            </p>

            <p className="text-4xl font-bold text-green-400 mt-2">
              {accepted}
            </p>
          </div>

        </div>

        {/* Actions */}

        <div className="grid md:grid-cols-2 gap-6">

          <button
            onClick={() => router.push("/employer")}
            className="text-left bg-zinc-900 border border-zinc-800 hover:border-green-500 rounded-2xl p-8 transition"
          >
            <div className="text-4xl mb-4">
              ➕
            </div>

            <h2 className="text-2xl font-bold">
              Post a New Job
            </h2>

            <p className="text-gray-400 mt-2">
              Create a new opportunity and reach
              qualified African AI talent.
            </p>
          </button>

          <button
            onClick={() =>
              router.push("/employer/applications")
            }
            className="text-left bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded-2xl p-8 transition"
          >
            <div className="text-4xl mb-4">
              👥
            </div>

            <h2 className="text-2xl font-bold">
              Manage Applications
            </h2>

            <p className="text-gray-400 mt-2">
              Review candidates, view CVs and
              manage application statuses.
            </p>
          </button>

        </div>

      </div>
    </main>
  );
}