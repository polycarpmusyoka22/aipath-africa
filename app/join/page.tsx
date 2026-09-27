import Link from "next/link";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600">
            <span className="text-2xl font-bold">AI</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Join AIPath Africa
          </h1>

          <p className="text-lg text-gray-400">
            Choose how you want to use AIPath Africa.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Candidate */}
          <Link
            href="/register"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-green-500"
          >
            <div className="mb-6 text-4xl">👤</div>

            <h2 className="mb-3 text-2xl font-bold">
              I&apos;m a Candidate
            </h2>

            <p className="mb-6 text-gray-400">
              Find AI jobs, apply for opportunities, upload your CV, and track
              your applications.
            </p>

            <span className="font-semibold text-green-400 group-hover:text-green-300">
              Register as Candidate →
            </span>
          </Link>

          {/* Employer */}
          <Link
            href="/register/employer"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-cyan-500"
          >
            <div className="mb-6 text-4xl">🏢</div>

            <h2 className="mb-3 text-2xl font-bold">
              I&apos;m an Employer
            </h2>

            <p className="mb-6 text-gray-400">
              Hire African AI talent, post jobs, or submit AI and data
              projects.
            </p>

            <span className="font-semibold text-cyan-400 group-hover:text-cyan-300">
              Register as Employer →
            </span>
          </Link>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-400 hover:text-green-300"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-white"
          >
            ← Back to AIPath Africa
          </Link>
        </div>
      </div>
    </main>
  );
}