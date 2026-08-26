"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan-500 flex items-center justify-center font-bold text-black">
            AI
          </div>

          <div>
            <h1 className="font-bold text-xl">AIPath Africa</h1>
            <p className="text-xs text-gray-400">
              Global AI Careers
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/">Home</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-5 py-2 rounded-lg border border-zinc-700 hover:border-cyan-500 transition">
            Login
          </button>

          <button className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition">
            Register
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-6 space-y-5">
          <Link href="/">Home</Link><br />
          <Link href="/jobs">Jobs</Link><br />
          <Link href="/services">Services</Link><br />
          <Link href="/about">About</Link><br />
          <Link href="/contact">Contact</Link>

          <div className="pt-5 space-y-3">
            <button className="w-full py-3 rounded-lg border border-zinc-700">
              Login
            </button>

            <button className="w-full py-3 rounded-lg bg-cyan-500 text-black font-bold">
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}