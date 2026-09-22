"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EmployerRegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: company,
          role: "employer",
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.user) {
      alert("Registration could not be completed.");
      return;
    }

    alert("🎉 Employer account created successfully!");

    router.push("/employer/dashboard");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <p className="text-green-400 font-semibold">
            AIPath Africa
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Employer Registration
          </h1>

          <p className="text-gray-400 mt-3">
            Create an account and start connecting with African AI talent.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div>
              <label className="block mb-2 font-semibold">
                Your Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Company Name
              </label>

              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company"
                className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="company@example.com"
                className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                minLength={6}
                className="w-full bg-zinc-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-xl font-bold disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Employer Account"}
            </button>

          </form>

          <button
            type="button"
            onClick={() => router.push("/join")}
            className="w-full mt-5 text-gray-400 hover:text-white"
          >
            ← Back to account type
          </button>

        </div>

      </div>
    </main>
  );
}