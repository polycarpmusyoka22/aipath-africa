"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Jobs", href: "/jobs" },
  { name: "Services", href: "/services" },
  { name: "Learning", href: "/learning" },
  { name: "For Employers", href: "/hire" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/aipath-logo.png"
            alt="AIPath Africa"
            width={180}
            height={50}
            priority
            className="h-auto w-[150px] sm:w-[170px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                link.href === "/hire"
                  ? "text-cyan-300 hover:text-cyan-200"
                  : "text-slate-200 hover:text-cyan-300"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/login"
            className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`border-b border-white/10 py-4 text-base font-medium transition ${
                  link.href === "/hire"
                    ? "text-cyan-300 hover:text-cyan-200"
                    : "text-slate-200 hover:text-cyan-300"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/10 py-4 text-base font-medium text-slate-200 transition hover:text-cyan-300"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}