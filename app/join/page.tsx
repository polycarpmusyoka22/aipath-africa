"use client";

import { useRouter } from "next/navigation";

export default function JoinPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">

        <div className="text-center mb-10">
          <p className="text-cyan-400 font-semibold">
            AIPath Africa
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Join AIPath Africa
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            How would you like to use AIPath Africa?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <button
            onClick={() => router.push("/Register")}
            className="text-left bg-zinc-900 border border-zinc-800 hover:border-cyan-500 rounded-2xl p-8 transition duration-300 hover:-translate-y-1"
          >
            <div className="text-5xl mb-6">👤</div>

            <h2 className="text-2xl font-bold">
              I'm a Candidate
            </h2>

            <p className="text-gray-400 mt-3">
              Find AI opportunities, build your profile,
              upload your CV and apply for jobs.
            </p>

            <div className="mt-6 text-cyan-400 font-semibold">
              Continue as Candidate →
            </div>
          </button>

          <button
            onClick={() => router.push("/Register/employer")}
            className="text-left bg-zinc-900 border border-zinc-800 hover:border-green-500 rounded-2xl p-8 transition duration-300 hover:-translate-y-1"
          >
            <div className="text-5xl mb-6">🏢</div>

            <h2 className="text-2xl font-bold">
              I'm an Employer
            </h2>

            <p className="text-gray-400 mt-3">
              Post AI jobs, discover talented candidates
              and manage applications.
            </p>

            <div className="mt-6 text-green-400 font-semibold">
              Continue as Employer →
            </div>
          </button>

        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-white"
          >
            ← Back to AIPath Africa
          </button>
        </div>

      </div>
    </main>
  );
}