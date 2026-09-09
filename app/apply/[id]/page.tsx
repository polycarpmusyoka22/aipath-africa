"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();

  const jobId = Number(params.id);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitApplication(e: React.FormEvent) {
    e.preventDefault();

    if (!fullName || !email || !phone || !cvFile) {
      alert("Please complete all fields and upload your CV.");
      return;
    }

    if (!jobId) {
      alert("Invalid job.");
      return;
    }

    setLoading(true);

    try {
      // Get logged-in candidate
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Please log in before submitting an application.");
        router.push("/login");
        return;
      }

      // Make sure email belongs to logged-in account
      const userEmail = user.email || email;

      // Check CV type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(cvFile.type)) {
        alert("Please upload a PDF or DOCX CV.");
        return;
      }

      // Check CV size
      if (cvFile.size > 5 * 1024 * 1024) {
        alert("Your CV must be smaller than 5 MB.");
        return;
      }

      // Create unique CV filename
      const fileExtension =
        cvFile.name.split(".").pop()?.toLowerCase() || "pdf";

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;

      const filePath = `${user.id}/${fileName}`;

      // Upload CV
      const { error: uploadError } = await supabase.storage
        .from("cvs")
        .upload(filePath, cvFile);

      if (uploadError) {
        alert("CV upload failed: " + uploadError.message);
        return;
      }

      // Save application
      const { error: applicationError } = await supabase
        .from("applications")
        .insert([
          {
            job_id: jobId,
            full_name: fullName,
            email: userEmail,
            phone: phone,
            cv_url: filePath,
            user_id: user.id,
            status: "pending",
          },
        ]);

      if (applicationError) {
        // Remove CV if database insert fails
        await supabase.storage
          .from("cvs")
          .remove([filePath]);

        alert("Application failed: " + applicationError.message);
        return;
      }

      alert("🎉 Application submitted successfully!");

      // Clear form
      setFullName("");
      setEmail("");
      setPhone("");
      setCvFile(null);

      // Go directly to candidate dashboard
      router.push("/candidate");

    } catch (error) {
      console.error("APPLICATION ERROR:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-2xl mx-auto">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <h1 className="text-4xl font-bold text-center mb-3">
            Apply for this Job
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Submit your details and CV to apply.
          </p>

          <form
            onSubmit={submitApplication}
            className="space-y-5"
          >

            {/* Full Name */}
            <div>
              <label className="block mb-2 font-semibold">
                Full Name
              </label>

              <input
                type="text"
                required
                placeholder="Your full name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full p-4 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold">
                Email
              </label>

              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full p-4 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-semibold">
                Phone Number
              </label>

              <input
                type="tel"
                required
                placeholder="+254..."
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="w-full p-4 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* CV */}
            <div>
              <label className="block mb-2 font-semibold">
                Upload CV
              </label>

              <input
                type="file"
                required
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  setCvFile(
                    e.target.files?.[0] || null
                  );
                }}
                className="w-full p-4 rounded-lg bg-zinc-800 text-white"
              />

              <p className="text-sm text-gray-500 mt-2">
                PDF or DOCX only. Maximum size: 5 MB.
              </p>

              {cvFile && (
                <p className="text-green-400 text-sm mt-2">
                  Selected: {cvFile.name}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-lg disabled:opacity-50"
            >
              {loading
                ? "Uploading & Submitting..."
                : "Submit Application"}
            </button>

          </form>

        </div>

      </div>
    </main>
  );
}