"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

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
      return;
    }

    alert("Account created successfully!");

    console.log("User:", data.user);
    console.log("Session:", data.session);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#09090B] text-white">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 border border-zinc-800">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-green-500 py-3 font-semibold text-black hover:bg-green-400"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}