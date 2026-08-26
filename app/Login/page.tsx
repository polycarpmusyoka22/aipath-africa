"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful!");

    router.push("/employer/dashboard");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={login}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-white mb-3 text-center">
          Login
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Login to your AIPath Africa account
        </p>

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-lg bg-zinc-800 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-6 rounded-lg bg-zinc-800 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 rounded-lg p-4 font-bold text-white disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <a
            href="/Register"
            className="text-green-400 hover:text-green-300"
          >
            Register
          </a>
        </p>
      </form>
    </main>
  );
}