"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Job = {
  id: string | number;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  employer_id?: string;
};

type Application = {
  id: string | number;
  job_id: string | number;
  email: string;
  status: string;
  created_at: string;
};

type Project = {
  id: string | number;
  employer_id?: string;
  title: string;
  description: string;
  skills?: string | null;
  budget?: string | null;
  deadline?: string | null;
  status?: string | null;
};

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    // ==========================================
    // GET LOGGED-IN USER
    // ==========================================

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("USER ERROR:", userError);
    }

    if (!user) {
      window.location.href = "/Login";
      return;
    }

    setEmail(user.email || "");

    // Get company name from registration metadata
    const metadata = user.user_metadata;

    setCompany(
      metadata?.company_name ||
        metadata?.company ||
        metadata?.full_name ||
        "Employer"
    );

    // ==========================================
    // LOAD JOBS
    // ==========================================

    const {
      data: jobData,
      error: jobError,
    } = await supabase
      .from("jobs")
      .select("*")
      .eq("employer_id", user.id);

    if (jobError) {
      console.error(
        "JOBS ERROR:",
        JSON.stringify(jobError, null, 2)
      );

      alert(
        "Jobs could not be loaded: " +
          jobError.message
      );

      setJobs([]);
    } else {
      setJobs((jobData || []) as Job[]);
    }

    // ==========================================
    // LOAD APPLICATIONS
    // ==========================================

    if (jobData && jobData.length > 0) {
      const jobIds = jobData.map((job) => job.id);

      const {
        data: applicationData,
        error: applicationError,
      } = await supabase
        .from("applications")
        .select("*")
        .in("job_id", jobIds)
        .order("created_at", {
          ascending: false,
        });

      if (applicationError) {
        console.error(
          "APPLICATIONS ERROR:",
          JSON.stringify(
            applicationError,
            null,
            2
          )
        );

        setApplications([]);
      } else {
        setApplications(
          (applicationData || []) as Application[]
        );
      }
    } else {
      setApplications([]);
    }

    // ==========================================
    // LOAD PROJECTS
    // ==========================================

    const {
      data: projectData,
      error: projectError,
    } = await supabase
      .from("projects")
      .select("*")
      .eq("employer_id", user.id);

    if (projectError) {
      console.error(
        "PROJECTS ERROR:",
        JSON.stringify(
          projectError,
          null,
          2
        )
      );

      setProjects([]);
    } else {
      setProjects(
        (projectData || []) as Project[]
      );
    }

    setLoading(false);
  }

  // ==========================================
  // LOGOUT
  // ==========================================

  async function logout() {
    await supabase.auth.signOut();

    window.location.href = "/Login";
  }

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-green-400 font-semibold mb-3">
            AIPath Africa
          </p>

          <p className="text-gray-400 text-xl">
            Loading employer dashboard...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>
            <p className="text-green-400 font-semibold">
              AIPath Africa
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              Employer Dashboard
            </h1>

            <p className="text-gray-400 mt-3">
              Welcome back, {company}.
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {email}
            </p>
          </div>

          <button
            onClick={logout}
            className="border border-zinc-700 hover:border-red-500 hover:text-red-400 px-6 py-3 rounded-xl transition"
          >
            Logout
          </button>

        </div>

        {/* ======================================
            QUICK ACTIONS
        ====================================== */}

        <section className="mb-10">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            {/* POST JOB */}

            <Link
              href="/employer"
              className="bg-zinc-900 border border-zinc-800 hover:border-cyan-500 rounded-2xl p-6 transition"
            >
              <div className="text-4xl mb-4">
                💼
              </div>

              <h3 className="text-xl font-bold">
                Post a Job
              </h3>

              <p className="text-gray-400 mt-2">
                Find qualified African AI talent.
              </p>

              <p className="text-cyan-400 font-semibold mt-4">
                Post Job →
              </p>
            </Link>

            {/* PROJECT */}

            <Link
              href="/employer/projects/submit"
              className="bg-zinc-900 border border-zinc-800 hover:border-green-500 rounded-2xl p-6 transition"
            >
              <div className="text-4xl mb-4">
                🚀
              </div>

              <h3 className="text-xl font-bold">
                Request an AI Project
              </h3>

              <p className="text-gray-400 mt-2">
                Let AIPath Africa manage your project.
              </p>

              <p className="text-green-400 font-semibold mt-4">
                Submit Project →
              </p>
            </Link>

            {/* APPLICATIONS */}

            <Link
              href="/employer/applications"
              className="bg-zinc-900 border border-zinc-800 hover:border-purple-500 rounded-2xl p-6 transition"
            >
              <div className="text-4xl mb-4">
                👥
              </div>

              <h3 className="text-xl font-bold">
                Applications
              </h3>

              <p className="text-gray-400 mt-2">
                Review candidates who applied to your jobs.
              </p>

              <p className="text-purple-400 font-semibold mt-4">
                View Applications →
              </p>
            </Link>

          </div>

        </section>

        {/* ======================================
            STATISTICS
        ====================================== */}

        <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Jobs Posted
            </p>

            <p className="text-3xl font-bold mt-2">
              {jobs.length}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Applications
            </p>

            <p className="text-3xl font-bold mt-2">
              {applications.length}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Project Requests
            </p>

            <p className="text-3xl font-bold mt-2">
              {projects.length}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-gray-400">
              Active Projects
            </p>

            <p className="text-3xl font-bold text-green-400 mt-2">
              {
                projects.filter(
                  (project) =>
                    project.status === "approved" ||
                    project.status === "in_progress" ||
                    project.status === "in progress"
                ).length
              }
            </p>
          </div>

        </section>

        {/* ======================================
            MY JOBS
        ====================================== */}

        <section className="mb-12">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>
              <h2 className="text-3xl font-bold">
                My Jobs
              </h2>

              <p className="text-gray-400 mt-1">
                Jobs you have posted on AIPath Africa.
              </p>
            </div>

            <Link
              href="/employer"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              + Post New Job
            </Link>

          </div>

          {jobs.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">

              <div className="text-5xl mb-4">
                💼
              </div>

              <h3 className="text-xl font-bold">
                No jobs posted yet
              </h3>

              <p className="text-gray-400 mt-2 mb-6">
                Create your first job opportunity.
              </p>

              <Link
                href="/employer"
                className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
              >
                Post a Job
              </Link>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-5">

              {jobs.map((job) => (

                <div
                  key={job.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h3 className="text-xl font-bold">
                        {job.title}
                      </h3>

                      <p className="text-gray-400 mt-1">
                        {job.company}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                      {job.type}
                    </span>

                  </div>

                  <div className="mt-5 space-y-2 text-sm text-gray-400">

                    <p>
                      📍 {job.location}
                    </p>

                    <p>
                      💼 {job.category}
                    </p>

                    <p>
                      💰 {job.salary}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* ======================================
            PROJECT REQUESTS
        ====================================== */}

        <section className="mb-12">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>
              <h2 className="text-3xl font-bold">
                My Project Requests
              </h2>

              <p className="text-gray-400 mt-1">
                AIPath Africa manages these projects for you.
              </p>
            </div>

            <Link
              href="/employer/projects/submit"
              className="text-green-400 hover:text-green-300 font-semibold"
            >
              + Request New Project
            </Link>

          </div>

          {projects.length === 0 ? (

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">

              <div className="text-5xl mb-4">
                🚀
              </div>

              <h3 className="text-xl font-bold">
                No project requests yet
              </h3>

              <p className="text-gray-400 mt-2 mb-6">
                Need AI talent to complete a project?
                Let AIPath Africa manage it for you.
              </p>

              <Link
                href="/employer/projects/submit"
                className="inline-block bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold"
              >
                Request an AI Project
              </Link>

            </div>

          ) : (

            <div className="space-y-5">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                    <div className="flex-1">

                      <h3 className="text-2xl font-bold">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 mt-3">
                        {project.description}
                      </p>

                      {project.skills && (
                        <p className="text-gray-300 mt-3">
                          <span className="text-gray-500">
                            Skills:
                          </span>{" "}
                          {project.skills}
                        </p>
                      )}

                      {project.budget && (
                        <p className="text-gray-300 mt-2">
                          <span className="text-gray-500">
                            Budget:
                          </span>{" "}
                          {project.budget}
                        </p>
                      )}

                      {project.deadline && (
                        <p className="text-gray-300 mt-2">
                          <span className="text-gray-500">
                            Deadline:
                          </span>{" "}
                          {project.deadline}
                        </p>
                      )}

                    </div>

                    <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-semibold capitalize whitespace-nowrap">
                      {project.status || "submitted"}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* ======================================
            FOOTER
        ====================================== */}

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between gap-4">

          <Link
            href="/"
            className="text-gray-400 hover:text-white"
          >
            ← Back to AIPath Africa
          </Link>

          <Link
            href="/employer/projects/submit"
            className="text-green-400 hover:text-green-300"
          >
            Request an AI Project →
          </Link>

        </div>

      </div>
    </main>
  );
}