"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/aipath-logo.png"
            alt="AIPath Africa Logo"
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-cover"
            priority
          />

          <div>
            <h1 className="font-bold text-xl">AIPath Africa</h1>
            <p className="text-xs text-gray-400">
              Global AI Careers
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="hover:text-cyan-400 transition"
          >
            Home
          </Link>

          <Link
            href="/jobs"
            className="hover:text-cyan-400 transition"
          >
            Jobs
          </Link>

          <Link
            href="/services"
            className="hover:text-cyan-400 transition"
          >
            Services
          </Link>

          <Link
            href="/about"
            className="hover:text-cyan-400 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="hover:text-cyan-400 transition"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {/* Login */}
          <Link
            href="/Login"
            className="px-5 py-2 rounded-lg border border-zinc-700 hover:border-cyan-500 hover:text-cyan-400 transition"
          >
            Login
          </Link>

          {/* Register */}
          <Link
            href="/Register"
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
          >
            Register
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-6">

          <div className="flex flex-col gap-5">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400"
            >
              Home
            </Link>

            <Link
              href="/jobs"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400"
            >
              Jobs
            </Link>

            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400"
            >
              Services
            </Link>

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="hover:text-cyan-400"
            >
              Contact
            </Link>

            {/* Mobile Buttons */}
            <div className="pt-4 flex flex-col gap-3">

              <Link
                href="/Login"
                onClick={() => setOpen(false)}
                className="w-full py-3 text-center rounded-lg border border-zinc-700 hover:border-cyan-500"
              >
                Login
              </Link>

              <Link
                href="/Register"
                onClick={() => setOpen(false)}
                className="w-full py-3 text-center rounded-lg bg-cyan-500 text-black font-bold"
              >
                Register
              </Link>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}