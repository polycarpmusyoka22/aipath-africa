"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
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
        },
      },
    });

    console.log("Signup data:", data);
    console.log("Signup error:", error);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Account created successfully!");

    setLoading(false);

    // Go to Login after successful registration
    router.push("/Login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#09090B] text-white px-6">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 border border-zinc-800">

        <h1 className="text-3xl font-bold mb-2 text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Join AIPath Africa and discover global AI opportunities.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none border border-zinc-700 focus:border-cyan-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none border border-zinc-700 focus:border-cyan-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none border border-zinc-700 focus:border-cyan-500"
            required
            minLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-500 py-3 font-semibold text-black hover:bg-green-400 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/Login")}
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Login
          </button>
        </p>

      </div>
    </main>
  );
}