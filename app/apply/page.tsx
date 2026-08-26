"use client";

import {
  Suspense,
  useEffect,
  useState,
} from "react";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import { supabase } from "@/lib/supabase";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
};

function ApplyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const jobId = searchParams.get("jobId");

  const [job, setJob] = useState<Job | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadApplication();
  }, [jobId]);

  async function loadApplication() {
    if (!jobId) {
      alert("No job selected.");
      router.push("/jobs");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login before applying.");
      router.push("/Login");
      return;
    }

    setEmail(user.email || "");

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setCvUrl(profile.cv_url || "");
    }

    const { data: jobData, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", Number(jobId))
      .single();

    if (error) {
      alert(error.message);
      router.push("/jobs");
      return;
    }

    setJob(jobData);
    setLoading(false);
  }

  async function submitApplication(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please complete your profile first.");
      return;
    }

    if (!cvUrl) {
      alert("Please upload your CV before applying.");
      return;
    }

    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSubmitting(false);
      alert("Please login again.");
      router.push("/Login");
      return;
    }

    const { error } = await supabase
      .from("applications")
      .insert({
        job_id: Number(jobId),
        full_name: name,
        email,
        phone,
        cv_url: cvUrl,
        status: "pending",
      });

    setSubmitting(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("🎉 Application submitted successfully!");

    router.push("/candidate");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Loading application...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => router.push("/jobs")}
          className="text-gray-400 hover:text-white mb-8"
        >
          ← Back to Jobs
        </button>

        {job && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">

            <span className="inline-block bg-green-600 px-3 py-1 rounded-full text-sm">
              {job.type}
            </span>

            <h1 className="text-4xl font-bold mt-4">
              {job.title}
            </h1>

            <p className="text-green-400 text-xl mt-2">
              {job.company}
            </p>

            <p className="text-gray-400 mt-2">
              📍 {job.location}
            </p>

            <p className="text-blue-400 font-semibold mt-2">
              {job.salary}
            </p>

          </div>
        )}

        <form
          onSubmit={submitApplication}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6"
        >

          <h2 className="text-2xl font-bold">
            Submit Your Application
          </h2>

          <div>
            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              value={email}
              disabled
              className="w-full p-4 rounded-xl bg-zinc-800 text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Phone Number
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-4 rounded-xl bg-zinc-800 text-white"
              required
            />
          </div>

          <div className="bg-zinc-800 rounded-xl p-5">

            <p className="font-semibold">
              CV
            </p>

            {cvUrl ? (
              <p className="text-green-400 mt-2">
                ✓ CV attached
              </p>
            ) : (
              <div>
                <p className="text-yellow-400 mt-2">
                  No CV uploaded
                </p>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/candidate/profile")
                  }
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold"
                >
                  Upload CV
                </button>
              </div>
            )}

          </div>

          <button
            type="submit"
            disabled={submitting || !cvUrl}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-lg disabled:opacity-50"
          >
            {submitting
              ? "Submitting..."
              : "Submit Application"}
          </button>

        </form>

      </div>
    </main>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <p className="text-gray-400">
            Loading application...
          </p>
        </main>
      }
    >
      <ApplyPageContent />
    </Suspense>
  );
}