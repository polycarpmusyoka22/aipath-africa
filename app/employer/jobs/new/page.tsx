"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewEmployerJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("Remote");
  const [type, setType] = useState("Full-Time");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/Login");
      return;
    }

    setLoading(false);
  }

  async function postJob(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !company || !salary || !description) {
      alert("Please complete all required fields.");
      return;
    }

    setPosting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      setPosting(false);
      router.push("/Login");
      return;
    }

    const { error } = await supabase
      .from("jobs")
      .insert({
        user_id: user.id,
        title,
        company,
        location,
        type,
        salary,
        description,
      });

    setPosting(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("🎉 Job posted successfully!");

    router.push("/employer/dashboard");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-xl">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">

          <div>
            <p className="text-cyan-400 font-semibold">
              AIPath Africa
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Post a Job
            </h1>

            <p className="text-gray-400 mt-2">
              Connect your opportunity with African AI talent.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push("/employer/dashboard")
            }
            className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl"
          >
            ← Dashboard
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={postJob}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6"
        >

          {/* JOB TITLE */}

          <div>
            <label className="block mb-2 font-semibold">
              Job Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI Data Annotator"
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* COMPANY */}

          <div>
            <label className="block mb-2 font-semibold">
              Company
            </label>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* LOCATION */}

          <div>
            <label className="block mb-2 font-semibold">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Remote / Nairobi, Kenya"
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* JOB TYPE */}

          <div>
            <label className="block mb-2 font-semibold">
              Job Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none"
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Freelance</option>
              <option>Internship</option>
            </select>
          </div>

          {/* SALARY */}

          <div>
            <label className="block mb-2 font-semibold">
              Salary
            </label>

            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. KSH 35,000 or $15–25/hr"
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="block mb-2 font-semibold">
              Job Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe the role, responsibilities, requirements and experience needed..."
              className="w-full bg-zinc-800 rounded-xl p-4 h-48 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* POST BUTTON */}

          <button
            type="submit"
            disabled={posting}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-xl font-bold text-lg disabled:opacity-50"
          >
            {posting
              ? "Posting Job..."
              : "🚀 Post Job"}
          </button>

        </form>

      </div>
    </main>
  );
}