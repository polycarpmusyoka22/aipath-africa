"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function SubmitProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitProject(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      setLoading(false);
      router.push("/Login");
      return;
    }

    const { error } = await supabase.from("projects").insert({
      employer_id: user.id,
      title,
      description,
      skills,
      budget,
      deadline: deadline || null,
      status: "submitted",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("🎉 Project submitted successfully!");

    router.push("/employer/projects");
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <p className="text-green-400 font-semibold">
            AIPath Africa
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Submit an AI Project
          </h1>

          <p className="text-gray-400 mt-3">
            Tell us about your project and the African AI talent you need.
          </p>
        </div>

        <form
          onSubmit={submitProject}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6"
        >

          <div>
            <label className="block mb-2 font-semibold">
              Project Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI Data Annotation Project"
              className="w-full bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Project Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the project, tasks and expected deliverables..."
              className="w-full bg-zinc-800 p-4 rounded-xl h-44 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Skills Required
            </label>

            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="AI annotation, QA, Swahili, computer vision..."
              className="w-full bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Project Budget
            </label>

            <input
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. $2,000 - $5,000"
              className="w-full bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Expected Deadline
            </label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-zinc-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-xl font-bold text-lg disabled:opacity-50"
          >
            {loading ? "Submitting Project..." : "Submit Project →"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/employer/dashboard")}
            className="w-full text-gray-400 hover:text-white py-3"
          >
            ← Back to Employer Dashboard
          </button>

        </form>
      </div>
    </main>
  );
}