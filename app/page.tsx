import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  ClipboardCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

import WhyChoose from "./components/home/WhyChoose";
import Pricing from "./components/home/Pricing";
import FAQ from "./components/home/FAQ";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import LogoCloud from "./components/home/LogoCloud";
import About from "./components/home/About";
import Services from "./components/home/Services";
import AIDataOperations from "./components/home/AIDataOperations";
import EmployerHowItWorks from "./components/home/EmployerHowItWorks";
import EmployerModels from "./components/home/EmployerModels";
import Jobs from "./components/home/Jobs";
import Testimonials from "./components/home/Testimonials";
import Contact from "./components/home/Contact";
import CTA from "./components/home/CTA";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#09090B] pt-20 text-white">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Existing sections */}
      <LogoCloud />
      <About />
      <Services />

      {/* AI Data Operations */}
      <AIDataOperations />

      {/* Employer How It Works */}
      <EmployerHowItWorks />

      {/* Employer Business Models */}
      <EmployerModels />

      {/* Employer Section */}
      <section className="border-y border-white/10 bg-gradient-to-b from-slate-900/80 to-[#09090B]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left side */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                <BriefcaseBusiness size={16} />
                For Employers
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Need an AI Workforce?
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Tell us what you&apos;re building and AIPath Africa can help
                you access relevant African talent for AI data, evaluation,
                collection, language and technical projects.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/employer/projects/submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Submit a Project
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/hire"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Hire Talent
                </Link>
              </div>
            </div>

            {/* Right side */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Card 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <Users size={22} />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  Access African Talent
                </h3>

                <p className="mt-2 leading-7 text-slate-400">
                  Connect with professionals across Africa for AI and
                  technology projects.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <ClipboardCheck size={22} />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  Project-Based Teams
                </h3>

                <p className="mt-2 leading-7 text-slate-400">
                  Request individuals or coordinated teams for defined
                  projects.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <ShieldCheck size={22} />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  Quality-Focused
                </h3>

                <p className="mt-2 leading-7 text-slate-400">
                  Structure projects around requirements, workflow
                  coordination and quality checks.
                </p>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                  <BriefcaseBusiness size={22} />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  Flexible Delivery
                </h3>

                <p className="mt-2 leading-7 text-slate-400">
                  Start with a defined requirement and scale project capacity
                  as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing sections */}
      <WhyChoose />
      <Jobs />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}