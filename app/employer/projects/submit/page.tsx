"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function SubmitProjectPage() {
  const router = useRouter();

  // Project information
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  // Employer information
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  // Project requirements
  const [talentType, setTalentType] = useState("");
  const [workersNeeded, setWorkersNeeded] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [expectedStartDate, setExpectedStartDate] = useState("");

  const [loading, setLoading] = useState(false);

  async function submitProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        router.push("/Login");
        return;
      }

      const { error } = await supabase.from("projects").insert({
        employer_id: user.id,

        // Existing project fields
        title: title.trim(),
        description: description.trim(),
        skills: skills.trim(),
        budget: budget.trim(),
        deadline: deadline || null,
        status: "submitted",

        // New structured employer fields
        company_name: companyName.trim(),
        contact_name: contactName.trim(),
        business_email: businessEmail.trim(),
        company_website: companyWebsite.trim() || null,

        // New structured project fields
        talent_type: talentType,
        workers_needed: workersNeeded
          ? Number(workersNeeded)
          : null,
        project_duration: projectDuration.trim() || null,
        expected_start_date: expectedStartDate || null,
      });

      if (error) {
        console.error("Project submission error:", error);
        alert(error.message);
        return;
      }

      alert("🎉 Project submitted successfully!");

      router.push("/employer/projects");
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong while submitting the project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10">
          <p className="font-semibold text-cyan-400">
            AIPath Africa
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Submit an AI Project
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Tell us what you&apos;re building, the talent you need, and the
            project requirements. AIPath Africa will review your request and
            respond.
          </p>
        </div>

        <form
          onSubmit={submitProject}
          className="space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
        >

          {/* Employer Information */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Employer Information
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Tell us who is submitting the project.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Company Name */}
              <div>
                <label className="mb-2 block font-semibold">
                  Company Name
                </label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Example AI Ltd"
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* Contact Name */}
              <div>
                <label className="mb-2 block font-semibold">
                  Contact Name
                </label>

                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* Business Email */}
              <div>
                <label className="mb-2 block font-semibold">
                  Business Email
                </label>

                <input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* Company Website */}
              <div>
                <label className="mb-2 block font-semibold">
                  Company Website
                </label>

                <input
                  type="url"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </section>

          {/* Project Information */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Project Information
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Give us enough information to understand what you need.
              </p>
            </div>

            <div className="space-y-6">

              {/* Project Title */}
              <div>
                <label className="mb-2 block font-semibold">
                  Project Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Swahili AI Data Collection Project"
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* Project Description */}
              <div>
                <label className="mb-2 block font-semibold">
                  Project Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the project, tasks, expected deliverables, data requirements, quality requirements, and anything else we should know..."
                  className="h-48 w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* Talent Type */}
              <div>
                <label className="mb-2 block font-semibold">
                  What Type of Talent / Project Support Do You Need?
                </label>

                <select
                  value={talentType}
                  onChange={(e) => setTalentType(e.target.value)}
                  className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                >
                  <option value="">
                    Select a project type
                  </option>

                  <option value="AI Data Annotation">
                    AI Data Annotation
                  </option>

                  <option value="AI Evaluation">
                    AI Evaluation
                  </option>

                  <option value="LLM Training">
                    LLM Training
                  </option>

                  <option value="LiDAR / 3D Annotation">
                    LiDAR / 3D Annotation
                  </option>

                  <option value="Video Annotation">
                    Video Annotation
                  </option>

                  <option value="Data Collection">
                    Data Collection
                  </option>

                  <option value="Transcription">
                    Transcription
                  </option>

                  <option value="Translation">
                    Translation
                  </option>

                  <option value="Software Engineering">
                    Software Engineering
                  </option>

                  <option value="Data Science / Machine Learning">
                    Data Science / Machine Learning
                  </option>

                  <option value="African Language / Multilingual Data">
                    African Language / Multilingual Data
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="mb-2 block font-semibold">
                  Skills Required
                </label>

                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. Swahili, CVAT, computer vision, QA..."
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Workers + Duration */}
              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-semibold">
                    Number of Workers Needed
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={workersNeeded}
                    onChange={(e) => setWorkersNeeded(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Project Duration
                  </label>

                  <input
                    type="text"
                    value={projectDuration}
                    onChange={(e) => setProjectDuration(e.target.value)}
                    placeholder="e.g. 4 weeks"
                    className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Start Date + Deadline */}
              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-semibold">
                    Expected Start Date
                  </label>

                  <input
                    type="date"
                    value={expectedStartDate}
                    onChange={(e) => setExpectedStartDate(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Expected Deadline
                  </label>

                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="mb-2 block font-semibold">
                  Project Budget
                </label>

                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. $2,000 - $5,000"
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="border-t border-zinc-800 pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 py-4 text-lg font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Submitting Project..." : "Submit Project →"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/employer/dashboard")}
              className="w-full py-3 text-gray-400 transition hover:text-white"
            >
              ← Back to Employer Dashboard
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}