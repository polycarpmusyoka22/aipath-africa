import Link from "next/link";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 mb-6">
            <span className="text-2xl font-bold">AI</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join AIPath Africa
          </h1>

          <p className="text-gray-400 text-lg">
            Choose how you want to use AIPath Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            href="/Register"
            className="group bg-zinc-900 border border-zinc-800 hover:border-green-500 rounded-2xl p-8 transition"
          >
            <div className="text-4xl mb-6">👤</div>

            <h2 className="text-2xl font-bold mb-3">
              I&apos;m a Candidate
            </h2>

            <p className="text-gray-400 mb-6">
              Find AI jobs, apply for opportunities, upload your CV, and track
              your applications.
            </p>

            <span className="text-green-400 font-semibold">
              Register as Candidate →
            </span>
          </Link>

          <Link
            href="/Register/employer"
            className="group bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded-2xl p-8 transition"
          >
            <div className="text-4xl mb-6">🏢</div>

            <h2 className="text-2xl font-bold mb-3">
              I&apos;m an Employer
            </h2>

            <p className="text-gray-400 mb-6">
              Hire African AI talent, post jobs, or submit AI and data
              projects.
            </p>

            <span className="text-blue-400 font-semibold">
              Register as Employer →
            </span>
          </Link>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="text-green-400 hover:text-green-300 font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}