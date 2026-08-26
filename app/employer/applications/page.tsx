"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Application = {
  id: number;
  created_at: string;
  job_id: number;
  full_name: string;
  email: string;
  phone: string;
  cv_url: string;
  status: string;
  job_title?: string;
  company?: string;
};

export default function EmployerApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/Login";
      return;
    }

    const { data: jobs, error: jobsError } = await supabase
      .from("jobs")
      .select("id, title, company")
      .eq("user_id", user.id);

    if (jobsError) {
      alert(jobsError.message);
      setLoading(false);
      return;
    }

    if (!jobs || jobs.length === 0) {
      setApplications([]);
      setLoading(false);
      return;
    }

    const jobIds = jobs.map((job) => job.id);

    const { data: apps, error: appsError } = await supabase
      .from("applications")
      .select("*")
      .in("job_id", jobIds)
      .order("created_at", { ascending: false });

    if (appsError) {
      alert(appsError.message);
      setLoading(false);
      return;
    }

    const formatted = (apps || []).map((app) => {
      const job = jobs.find((j) => j.id === app.job_id);

      return {
        ...app,
        job_title: job?.title || "Unknown Job",
        company: job?.company || "",
      };
    });

    setApplications(formatted);
    setLoading(false);
  }

  async function updateStatus(
    applicationId: number,
    status: string
  ) {
    setUpdating(applicationId);

    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", applicationId);

    if (error) {
      alert(error.message);
      setUpdating(null);
      return;
    }

    setApplications((current) =>
      current.map((app) =>
        app.id === applicationId
          ? { ...app, status }
          : app
      )
    );

    setUpdating(null);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Loading applications...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Candidate Applications
            </h1>

            <p className="text-gray-400 mt-2">
              Review and manage candidates.
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href = "/employer")
            }
            className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl"
          >
            ← Dashboard
          </button>
        </div>

        {applications.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold">
              No applications yet
            </h2>

            <p className="text-gray-400 mt-2">
              Applications from candidates will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-5">

                  <div>
                    <h2 className="text-2xl font-bold">
                      {application.full_name}
                    </h2>

                    <p className="text-green-400 mt-1 font-semibold">
                      {application.job_title}
                    </p>

                    <p className="text-gray-500">
                      {application.company}
                    </p>
                  </div>

                  <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full h-fit">
                    {application.status}
                  </span>

                </div>

                <div className="grid md:grid-cols-3 gap-5 mt-6 pt-6 border-t border-zinc-800">

                  <div>
                    <p className="text-gray-500 text-sm">
                      Email
                    </p>
                    <p>{application.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Phone
                    </p>
                    <p>{application.phone}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Applied
                    </p>
                    <p>
                      {new Date(
                        application.created_at
                      ).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                <div className="flex flex-wrap gap-3 mt-7">

                  {application.cv_url && (
                    <a
                      href={application.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold"
                    >
                      📄 View CV
                    </a>
                  )}

                  <button
                    disabled={updating === application.id}
                    onClick={() =>
                      updateStatus(
                        application.id,
                        "accepted"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-bold disabled:opacity-50"
                  >
                    ✓ Accept
                  </button>

                  <button
                    disabled={updating === application.id}
                    onClick={() =>
                      updateStatus(
                        application.id,
                        "rejected"
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold disabled:opacity-50"
                  >
                    ✕ Reject
                  </button>

                  <button
                    disabled={updating === application.id}
                    onClick={() =>
                      updateStatus(
                        application.id,
                        "reviewing"
                      )
                    }
                    className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-bold disabled:opacity-50"
                  >
                    Review
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}