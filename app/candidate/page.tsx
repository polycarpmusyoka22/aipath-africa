"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Application = {
  id: number;
  job_id: number;
  name: string;
  email: string;
  phone: string;
  cv_url: string;
  created_at: string;
  status: string;
};

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
};

export default function CandidateDashboard() {
  const router = useRouter();

  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { data: sessionData } =
      await supabase.auth.getSession();

    if (!sessionData.session) {
      router.push("/Login");
      return;
    }

    const user = sessionData.session.user;

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("email", user.email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setApplications(data || []);

    const jobIds = (data || []).map(
      (application) => application.job_id
    );

    if (jobIds.length > 0) {
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("*")
        .in("id", jobIds);

      setJobs(jobsData || []);
    }

    setLoading(false);
  }

  function getJob(jobId: number) {
    return jobs.find((job) => job.id === jobId);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/Login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Loading dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Candidate Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Track your AI job applications.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                router.push("/candidate/profile")
              }
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold"
            >
              My Profile
            </button>

            <button
              onClick={() => router.push("/jobs")}
              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-bold"
            >
              Browse Jobs
            </button>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold"
            >
              Logout
            </button>

          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Applications
            </p>

            <p className="text-4xl font-bold mt-2">
              {applications.length}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Shortlisted
            </p>

            <p className="text-4xl font-bold mt-2 text-green-400">
              {
                applications.filter(
                  (application) =>
                    application.status === "shortlisted"
                ).length
              }
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Pending
            </p>

            <p className="text-4xl font-bold mt-2 text-yellow-400">
              {
                applications.filter(
                  (application) =>
                    application.status === "pending"
                ).length
              }
            </p>
          </div>

        </div>

        <h2 className="text-2xl font-bold mb-6">
          My Applications
        </h2>

        {applications.length === 0 ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">

            <h3 className="text-xl font-bold">
              No applications yet
            </h3>

            <p className="text-gray-400 mt-2">
              Browse jobs and start applying.
            </p>

            <button
              onClick={() => router.push("/jobs")}
              className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
            >
              Browse Jobs
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {applications.map((application) => {

              const job = getJob(application.job_id);

              return (
                <div
                  key={application.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >

                  <h3 className="text-2xl font-bold">
                    {job?.title || "Job"}
                  </h3>

                  <p className="text-green-400 mt-2">
                    {job?.company || "Company"}
                  </p>

                  <p className="text-gray-400 mt-2">
                    {job?.location}
                  </p>

                  <p className="text-blue-400 mt-2">
                    {job?.salary}
                  </p>

                  <div className="mt-5">

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        application.status === "shortlisted"
                          ? "bg-green-500/20 text-green-400"
                          : application.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {application.status === "shortlisted"
                        ? "✓ Shortlisted"
                        : application.status === "rejected"
                        ? "✕ Rejected"
                        : "Pending Review"}
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>
    </main>
  );
}