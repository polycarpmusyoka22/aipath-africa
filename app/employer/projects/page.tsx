"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Project = {
  id: number;
  title: string;
  description: string | null;
  skills: string | null;
  budget: string | null;
  deadline: string | null;
  status: string;
  created_at: string;

  // New structured fields
  company_name: string | null;
  contact_name: string | null;
  business_email: string | null;
  company_website: string | null;
  talent_type: string | null;
  workers_needed: number | null;
  project_duration: string | null;
  expected_start_date: string | null;
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
      .select(
        `
          id,
          title,
          description,
          skills,
          budget,
          deadline,
          status,
          created_at,
          company_name,
          contact_name,
          business_email,
          company_website,
          talent_type,
          workers_needed,
          project_duration,
          expected_start_date
        `
      )
      .eq("employer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Projects error:", error);
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

      case "quality check":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";

      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

      case "quoted":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";

      case "under review":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30";

      case "submitted":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";

      default:
        return "bg-zinc-500/10 text-zinc-300 border-zinc-500/30";
    }
  }

  function formatDate(date: string | null) {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatStatus(status: string) {
    if (!status) return "Submitted";

    return status
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-xl text-gray-400">Loading projects...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-cyan-400">AIPath Africa</p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              My Projects
            </h1>

            <p className="mt-3 text-gray-400">
              View and track projects submitted to AIPath Africa.
            </p>
          </div>

          <Link
            href="/employer/projects/submit"
            className="rounded-xl bg-cyan-500 px-6 py-3 text-center font-bold text-black transition hover:bg-cyan-400"
          >
            + Submit New Project
          </Link>
        </div>

        {/* Project count */}
        {projects.length > 0 && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-zinc-900 p-5">
            <p className="text-sm text-gray-500">Total Projects</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {projects.length}
            </p>
          </div>
        )}

        {/* Empty state */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <div className="mb-4 text-5xl">🚀</div>

            <h2 className="text-2xl font-bold">No projects yet</h2>

            <p className="mb-6 mt-2 text-gray-400">
              Submit your first AI project to get started.
            </p>

            <Link
              href="/employer/projects/submit"
              className="inline-block rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black transition hover:bg-cyan-400"
            >
              Submit Project
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-cyan-500/30"
              >
                {/* Project header */}
                <div className="border-b border-zinc-800 p-7">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-cyan-400">
                        Project #{project.id}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                        {project.title}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Submitted{" "}
                        {new Date(project.created_at).toLocaleDateString(
                          "en-KE",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle(
                        project.status
                      )}`}
                    >
                      {formatStatus(project.status)}
                    </span>
                  </div>
                </div>

                {/* Employer information */}
                <div className="grid gap-8 border-b border-zinc-800 p-7 lg:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Employer Information
                    </h3>

                    <div className="mt-5 space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="mt-1 text-gray-200">
                          {project.company_name || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Contact Person
                        </p>
                        <p className="mt-1 text-gray-200">
                          {project.contact_name || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Business Email
                        </p>
                        <p className="mt-1 break-all text-cyan-400">
                          {project.business_email || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Company Website
                        </p>

                        {project.company_website ? (
                          <a
                            href={project.company_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block break-all text-cyan-400 hover:text-cyan-300"
                          >
                            {project.company_website}
                          </a>
                        ) : (
                          <p className="mt-1 text-gray-300">
                            Not provided
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project requirements */}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Project Requirements
                    </h3>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-sm text-gray-500">
                          Project Type
                        </p>
                        <p className="mt-1 text-gray-200">
                          {project.talent_type || "Not specified"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-sm text-gray-500">
                          Workers Needed
                        </p>
                        <p className="mt-1 text-gray-200">
                          {project.workers_needed ?? "Not specified"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-sm text-gray-500">
                          Project Duration
                        </p>
                        <p className="mt-1 text-gray-200">
                          {project.project_duration || "Not specified"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-sm text-gray-500">
                          Expected Start
                        </p>
                        <p className="mt-1 text-gray-200">
                          {formatDate(project.expected_start_date)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-sm text-gray-500">
                          Deadline
                        </p>
                        <p className="mt-1 text-gray-200">
                          {formatDate(project.deadline)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="mt-1 font-semibold text-cyan-400">
                          {project.budget || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="border-b border-zinc-800 p-7">
                  <h3 className="text-lg font-bold text-white">
                    Skills Required
                  </h3>

                  <p className="mt-3 leading-7 text-gray-300">
                    {project.skills || "No specific skills provided."}
                  </p>
                </div>

                {/* Description */}
                <div className="border-b border-zinc-800 p-7">
                  <h3 className="text-lg font-bold text-white">
                    Project Description
                  </h3>

                  <div className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-5 leading-7 text-gray-300">
                    {project.description ||
                      "No project description provided."}
                  </div>
                </div>

                {/* Status information */}
                <div className="p-7">
                  <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5">
                    <p className="text-sm font-semibold text-cyan-400">
                      Project Status
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {formatStatus(project.status)}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      AIPath Africa will review the project and communicate
                      next steps as the project progresses.
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Back */}
        <div className="mt-10">
          <Link
            href="/employer/dashboard"
            className="text-gray-400 transition hover:text-white"
          >
            ← Back to Employer Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}