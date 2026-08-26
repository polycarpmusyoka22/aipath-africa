import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-5xl font-bold text-white">
          Ready to Launch Your AI Career?
        </h2>

        <p className="mt-6 text-xl text-blue-100">
          Join thousands of African professionals finding AI jobs, training,
          and opportunities with leading companies around the world.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/Register"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 hover:bg-gray-100 transition"
          >
            Join Free
          </Link>

          <Link
            href="/jobs"
            className="rounded-xl border border-white px-8 py-4 font-semibold text-white hover:bg-white/10 transition"
          >
            Browse Jobs
          </Link>
        </div>

      </div>
    </section>
  );
}