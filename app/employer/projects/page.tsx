"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Project = {
  id: number;
  title: string;
  description: string;
  skills: string | null;
  budget: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
};

export default function EmployerProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/Login";
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("employer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  }

  function statusStyle(status: string) {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500/10 text-green-400 border-green-500/30";

      case "in progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";

      case "completed":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";

      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-xl">
          Loading projects...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <p className="text-green-400 font-semibold">
              AIPath Africa
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              My Projects
            </h1>

            <p className="text-gray-400 mt-3">
              Manage projects submitted to AIPath Africa.
            </p>
          </div>

          <Link
            href="/employer/projects/submit"
            className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold text-center"
          >
            + Submit New Project
          </Link>

        </div>

        {projects.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">

            <div className="text-5xl mb-4">
              🚀
            </div>

            <h2 className="text-2xl font-bold">
              No projects yet
            </h2>

            <p className="text-gray-400 mt-2 mb-6">
              Submit your first AI project to get started.
            </p>

            <Link
              href="/employer/projects/submit"
              className="inline-block bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
            >
              Submit Project
            </Link>

          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">

            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 hover:border-green-500/40 transition"
              >

                <div className="flex items-start justify-between gap-4">

                  <h2 className="text-2xl font-bold">
                    {project.title}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full border text-xs font-semibold capitalize whitespace-nowrap ${statusStyle(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>

                </div>

                <p className="text-gray-400 mt-4 leading-relaxed">
                  {project.description}
                </p>

                {project.skills && (
                  <div className="mt-5">
                    <p className="text-sm text-gray-500">
                      Skills Required
                    </p>

                    <p className="text-gray-300 mt-1">
                      {project.skills}
                    </p>
                  </div>
                )}

                {project.budget && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Budget
                    </p>

                    <p className="text-green-400 font-semibold mt-1">
                      {project.budget}
                    </p>
                  </div>
                )}

                {project.deadline && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Deadline
                    </p>

                    <p className="text-gray-300 mt-1">
                      {project.deadline}
                    </p>
                  </div>
                )}

                <div className="mt-6 pt-5 border-t border-zinc-800">
                  <p className="text-sm text-gray-500">
                    Submitted
                  </p>

                  <p className="text-gray-400 mt-1">
                    {new Date(
                      project.created_at
                    ).toLocaleDateString("en-KE")}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

        <div className="mt-10">
          <Link
            href="/employer/dashboard"
            className="text-gray-400 hover:text-white"
          >
            ← Back to Employer Dashboard
          </Link>
        </div>

      </div>
    </main>
  );
}