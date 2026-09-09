"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Project = {
  id: number;
  employer_id: string;
  title: string;
  description: string;
  skills: string | null;
  budget: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
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

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);

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
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "PROJECTS ERROR:",
        JSON.stringify(error, null, 2)
      );

      alert(`Projects could not be loaded: ${error.message}`);
    } else {
      setProjects((data || []) as Project[]);
    }

    setLoading(false);
  }

  async function updateStatus(
    projectId: number,
    status: string
  ) {
    setUpdating(projectId);

    const { error } = await supabase
      .from("projects")
      .update({ status })
      .eq("id", projectId);

    if (error) {
      console.error(
        "STATUS UPDATE ERROR:",
        JSON.stringify(error, null, 2)
      );

      alert(`Status could not be updated: ${error.message}`);

      setUpdating(null);
      return;
    }

    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? { ...project, status }
          : project
      )
    );

    setUpdating(null);
  }

  function statusLabel(status: string) {
    switch (status) {
      case "submitted":
        return "Submitted";

      case "under review":
        return "Under Review";

      case "quoted":
        return "Quoted";

      case "approved":
        return "Approved";

      case "in progress":
        return "In Progress";

      case "quality check":
        return "Quality Check";

      case "completed":
        return "Completed";

      default:
        return status;
    }
  }

  function statusStyle(status: string) {
    switch (status) {
      case "submitted":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "under review":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";

      case "quoted":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "approved":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";

      case "in progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "quality check":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      default:
        return "bg-zinc-800 text-gray-300 border-zinc-700";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-green-400 font-semibold mb-3">
            AIPath Africa
          </p>

          <p className="text-gray-400 text-xl">
            Loading AIPath projects...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">
          <p className="text-green-400 font-semibold">
            AIPath Africa
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Project Management
          </h1>

          <p className="text-gray-400 mt-3 max-w-3xl">
            Manage AI projects submitted by employers.
            AIPath Africa handles talent sourcing, project
            coordination, quality control, and delivery.
          </p>
        </div>

        {/* WORKFLOW */}

        <div className="bg-zinc-900 border border-green-500/20 rounded-2xl p-6 mb-10">

          <h2 className="text-xl font-bold mb-5">
            AIPath Project Workflow
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">

            {statuses.map((status, index) => (
              <div
                key={status}
                className="text-center"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 font-bold">
                  {index + 1}
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  {statusLabel(status)}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Total Projects
            </p>

            <p className="text-3xl font-bold mt-2">
              {projects.length}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Awaiting Review
            </p>

            <p className="text-3xl font-bold text-yellow-400 mt-2">
              {
                projects.filter(
                  (p) =>
                    p.status === "submitted" ||
                    p.status === "under review"
                ).length
              }
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Active
            </p>

            <p className="text-3xl font-bold text-blue-400 mt-2">
              {
                projects.filter(
                  (p) =>
                    p.status === "approved" ||
                    p.status === "in progress" ||
                    p.status === "quality check"
                ).length
              }
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Completed
            </p>

            <p className="text-3xl font-bold text-green-400 mt-2">
              {
                projects.filter(
                  (p) => p.status === "completed"
                ).length
              }
            </p>
          </div>

        </div>

        {/* PROJECTS */}

        <section>

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-3xl font-bold">
                Employer Projects
              </h2>

              <p className="text-gray-400 mt-1">
                Projects requiring AIPath management.
              </p>
            </div>

          </div>

          {projects.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">

              <div className="text-5xl mb-4">
                📂
              </div>

              <h2 className="text-2xl font-bold">
                No projects submitted yet
              </h2>

              <p className="text-gray-400 mt-2">
                Employer project requests will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7"
                >

                  {/* PROJECT HEADER */}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                    <div className="flex-1">

                      <div className="flex items-center gap-3 flex-wrap">

                        <h2 className="text-2xl font-bold">
                          {project.title}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusStyle(
                            project.status
                          )}`}
                        >
                          {statusLabel(project.status)}
                        </span>

                      </div>

                      <p className="text-gray-400 mt-4 leading-relaxed">
                        {project.description}
                      </p>

                    </div>

                  </div>

                  {/* PROJECT DETAILS */}

                  <div className="grid md:grid-cols-3 gap-4 mt-6">

                    {project.skills && (
                      <div className="bg-black/40 rounded-xl p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Required Skills
                        </p>

                        <p className="text-gray-300 mt-2">
                          {project.skills}
                        </p>
                      </div>
                    )}

                    {project.budget && (
                      <div className="bg-black/40 rounded-xl p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Budget
                        </p>

                        <p className="text-gray-300 mt-2">
                          {project.budget}
                        </p>
                      </div>
                    )}

                    {project.deadline && (
                      <div className="bg-black/40 rounded-xl p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Deadline
                        </p>

                        <p className="text-gray-300 mt-2">
                          {project.deadline}
                        </p>
                      </div>
                    )}

                  </div>

                  {/* MANAGEMENT */}

                  <div className="mt-7 pt-6 border-t border-zinc-800">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                      <div>

                        <p className="text-sm font-semibold text-white">
                          AIPath Management
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Update the project as AIPath progresses
                          it through the delivery pipeline.
                        </p>

                      </div>

                      <div className="w-full md:w-64">

                        <label className="block text-sm text-gray-500 mb-2">
                          Project Status
                        </label>

                        <select
                          value={project.status}
                          disabled={updating === project.id}
                          onChange={(e) =>
                            updateStatus(
                              project.id,
                              e.target.value
                            )
                          }
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white outline-none focus:border-green-500 disabled:opacity-50"
                        >

                          {statuses.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {statusLabel(status)}
                            </option>
                          ))}

                        </select>

                        {updating === project.id && (
                          <p className="text-xs text-green-400 mt-2">
                            Updating project...
                          </p>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* DATE */}

                  <div className="mt-6 text-sm text-gray-500">
                    Submitted{" "}
                    {new Date(
                      project.created_at
                    ).toLocaleDateString("en-KE")}
                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>
    </main>
  );
}