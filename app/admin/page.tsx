"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type Project = {
  id: number;
  title: string | null;
  description: string | null;
  skills: string | null;
  budget: string | null;
  deadline: string | null;
  status: string | null;
  created_at: string;

  company_name: string | null;
  contact_name: string | null;
  business_email: string | null;
  company_website: string | null;
  talent_type: string | null;
  workers_needed: number | null;
  project_duration: string | null;
  expected_start_date: string | null;
};

const statuses = [
  "submitted",
  "under review",
  "quoted",
  "approved",
  "in progress",
  "quality check",
  "completed",
];

export default function AdminPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    checkAdminAndLoadProjects();
  }, []);

  async function checkAdminAndLoadProjects() {
    setLoading(true);

    try {
      // Get currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User error:", userError);

        alert(
          `Authentication error:\n\n${userError.message}`
        );

        router.push("/Login");
        return;
      }

      if (!user) {
        router.push("/Login");
        return;
      }

      console.log("Currently logged-in user:", user.id);
      console.log("Currently logged-in email:", user.email);

      // Check admin status
      const { data: isAdmin, error: adminError } =
        await supabase.rpc("is_admin");

      if (adminError) {
        console.error("Admin check error:", adminError);

        alert(
          `Admin check failed:\n\n${adminError.message}\n\nUser ID:\n${user.id}\n\nEmail:\n${user.email || "Not available"}`
        );

        return;
      }

      if (!isAdmin) {
        alert(
          `This account is not marked as an administrator.\n\nUser ID:\n${user.id}\n\nEmail:\n${user.email || "Not available"}`
        );

        return;
      }

      // Load all projects
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Projects error:", error);

        alert(
          `Projects could not be loaded:\n\n${error.message}`
        );

        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error("Unexpected error:", error);

      if (error instanceof Error) {
        alert(
          `Unexpected error:\n\n${error.message}`
        );
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProjectStatus(
    projectId: number,
    newStatus: string
  ) {
    setUpdatingId(projectId);

    try {
      const { error } = await supabase
        .from("projects")
        .update({
          status: newStatus,
        })
        .eq("id", projectId);

      if (error) {
        console.error("Status update error:", error);

        alert(
          `Unable to update project status:\n\n${error.message}`
        );

        return;
      }

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                status: newStatus,
              }
            : project
        )
      );
    } catch (error) {
      console.error(
        "Unexpected update error:",
        error
      );

      if (error instanceof Error) {
        alert(
          `Unexpected error:\n\n${error.message}`
        );
      } else {
        alert(
          "Unable to update project status."
        );
      }
    } finally {
      setUpdatingId(null);
    }
  }

  function statusStyle(status: string | null) {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "border-green-500/30 bg-green-500/10 text-green-400";

      case "in progress":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";

      case "quality check":
        return "border-purple-500/30 bg-purple-500/10 text-purple-400";

      case "completed":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";

      case "quoted":
        return "border-cyan-500/30 bg-cyan-500/10 text-cyan-400";

      case "under review":
        return "border-orange-500/30 bg-orange-500/10 text-orange-400";

      case "submitted":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";

      default:
        return "border-zinc-700 bg-zinc-800 text-zinc-300";
    }
  }

  function formatStatus(status: string | null) {
    if (!status) {
      return "Submitted";
    }

    return status
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "Not specified";
    }

    return new Date(date).toLocaleDateString(
      "en-KE",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  }

  const submittedCount = projects.filter(
    (project) =>
      project.status === "submitted"
  ).length;

  const reviewCount = projects.filter(
    (project) =>
      project.status === "under review"
  ).length;

  const activeCount = projects.filter(
    (project) =>
      project.status === "approved" ||
      project.status === "in progress" ||
      project.status === "quality check"
  ).length;

  const completedCount = projects.filter(
    (project) =>
      project.status === "completed"
  ).length;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-4 text-4xl">
            🔐
          </div>

          <p className="text-xl text-gray-400">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-cyan-400">
              AIPath Africa
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-gray-400">
              Review incoming employer projects and manage delivery status.
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-gray-200 transition hover:bg-white/10"
          >
            Back to Website
          </button>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
            <p className="text-sm text-gray-500">
              Total Projects
            </p>

            <p className="mt-2 text-3xl font-bold">
              {projects.length}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <p className="text-sm text-gray-500">
              New Submissions
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {submittedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <p className="text-sm text-gray-500">
              Active Projects
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-400">
              {activeCount}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {completedCount}
            </p>
          </div>

        </div>

        {/* Review count */}
        {reviewCount > 0 && (
          <div className="mb-8 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
            <p className="text-orange-300">
              {reviewCount} project
              {reviewCount !== 1
                ? "s are"
                : " is"}{" "}
              currently under review.
            </p>
          </div>
        )}

        {/* Projects */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">

            <div className="mb-4 text-5xl">
              📋
            </div>

            <h2 className="text-2xl font-bold">
              No projects yet
            </h2>

            <p className="mt-2 text-gray-400">
              New employer project submissions will appear here.
            </p>

          </div>
        ) : (
          <div className="space-y-6">

            {projects.map((project) => {
              const expanded =
                expandedId === project.id;

              return (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
                >

                  {/* Summary */}
                  <div className="p-6 md:p-7">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                      <div>
                        <p className="text-sm font-medium text-cyan-400">
                          Project #{project.id}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                          {project.title ||
                            "Untitled Project"}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                          Submitted{" "}
                          {formatDate(
                            project.created_at
                          )}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                        <span
                          className={`rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle(
                            project.status
                          )}`}
                        >
                          {formatStatus(
                            project.status
                          )}
                        </span>

                        <select
                          value={
                            project.status ||
                            "submitted"
                          }
                          disabled={
                            updatingId ===
                            project.id
                          }
                          onChange={(e) =>
                            updateProjectStatus(
                              project.id,
                              e.target.value
                            )
                          }
                          className="rounded-xl border border-zinc-700 bg-black px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500 disabled:opacity-50"
                        >
                          {statuses.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {formatStatus(
                                  status
                                )}
                              </option>
                            )
                          )}
                        </select>

                      </div>
                    </div>

                    {/* Quick information */}
                    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs text-gray-500">
                          Company
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-200">
                          {project.company_name ||
                            "Not provided"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs text-gray-500">
                          Project Type
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-200">
                          {project.talent_type ||
                            "Not specified"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs text-gray-500">
                          Workers
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-200">
                          {project.workers_needed ??
                            "Not specified"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="text-xs text-gray-500">
                          Budget
                        </p>

                        <p className="mt-1 text-sm font-semibold text-cyan-400">
                          {project.budget ||
                            "Not specified"}
                        </p>
                      </div>

                    </div>

                    {/* Expand */}
                    <button
                      onClick={() =>
                        setExpandedId(
                          expanded
                            ? null
                            : project.id
                        )
                      }
                      className="mt-6 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                    >
                      {expanded
                        ? "Hide Full Project ↑"
                        : "View Full Project →"}
                    </button>

                  </div>

                  {/* Expanded project */}
                  {expanded && (
                    <div className="border-t border-zinc-800 bg-black/20 p-6 md:p-7">

                      {/* Employer Information */}
                      <section>
                        <h3 className="text-xl font-bold">
                          Employer Information
                        </h3>

                        <div className="mt-5 grid gap-5 md:grid-cols-2">

                          <div>
                            <p className="text-sm text-gray-500">
                              Company
                            </p>

                            <p className="mt-1 text-gray-200">
                              {project.company_name ||
                                "Not provided"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Contact Person
                            </p>

                            <p className="mt-1 text-gray-200">
                              {project.contact_name ||
                                "Not provided"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Business Email
                            </p>

                            {project.business_email ? (
                              <a
                                href={`mailto:${project.business_email}`}
                                className="mt-1 block break-all text-cyan-400 hover:text-cyan-300"
                              >
                                {project.business_email}
                              </a>
                            ) : (
                              <p className="mt-1 text-gray-300">
                                Not provided
                              </p>
                            )}
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Company Website
                            </p>

                            {project.company_website ? (
                              <a
                                href={
                                  project.company_website
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 block break-all text-cyan-400 hover:text-cyan-300"
                              >
                                {
                                  project.company_website
                                }
                              </a>
                            ) : (
                              <p className="mt-1 text-gray-300">
                                Not provided
                              </p>
                            )}
                          </div>

                        </div>
                      </section>

                      {/* Requirements */}
                      <section className="mt-10">
                        <h3 className="text-xl font-bold">
                          Project Requirements
                        </h3>

                        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                          <div>
                            <p className="text-sm text-gray-500">
                              Project Type
                            </p>

                            <p className="mt-1 text-gray-200">
                              {project.talent_type ||
                                "Not specified"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Workers Needed
                            </p>

                            <p className="mt-1 text-gray-200">
                              {project.workers_needed ??
                                "Not specified"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Project Duration
                            </p>

                            <p className="mt-1 text-gray-200">
                              {project.project_duration ||
                                "Not specified"}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Expected Start
                            </p>

                            <p className="mt-1 text-gray-200">
                              {formatDate(
                                project.expected_start_date
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Deadline
                            </p>

                            <p className="mt-1 text-gray-200">
                              {formatDate(
                                project.deadline
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Budget
                            </p>

                            <p className="mt-1 font-semibold text-cyan-400">
                              {project.budget ||
                                "Not specified"}
                            </p>
                          </div>

                        </div>
                      </section>

                      {/* Skills */}
                      <section className="mt-10">
                        <h3 className="text-xl font-bold">
                          Skills Required
                        </h3>

                        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-5 text-gray-300">
                          {project.skills ||
                            "No specific skills provided."}
                        </div>
                      </section>

                      {/* Description */}
                      <section className="mt-10">
                        <h3 className="text-xl font-bold">
                          Project Description
                        </h3>

                        <div className="mt-4 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-5 leading-7 text-gray-300">
                          {project.description ||
                            "No project description provided."}
                        </div>
                      </section>

                      {/* Current Status */}
                      <section className="mt-10">
                        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

                          <p className="text-sm font-semibold text-cyan-400">
                            Current Status
                          </p>

                          <p className="mt-2 text-xl font-bold">
                            {formatStatus(
                              project.status
                            )}
                          </p>

                          <p className="mt-2 text-sm leading-6 text-gray-400">
                            Use the status selector above to
                            move the project through the AIPath
                            Africa delivery process.
                          </p>

                        </div>
                      </section>

                    </div>
                  )}

                </article>
              );
            })}

          </div>
        )}

        {/* Footer actions */}
        <div className="mt-10 flex flex-wrap gap-5">

          <button
            onClick={
              checkAdminAndLoadProjects
            }
            className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            ↻ Refresh Projects
          </button>

          <button
            onClick={() =>
              router.push(
                "/employer/projects"
              )
            }
            className="text-sm font-semibold text-gray-400 transition hover:text-white"
          >
            View Employer Project Page
          </button>

        </div>
      </div>
    </main>
  );
}