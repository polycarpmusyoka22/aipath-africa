"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CandidateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUrl, setCvUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: sessionData } =
      await supabase.auth.getSession();

    if (!sessionData.session) {
      window.location.href = "/Login";
      return;
    }

    const user = sessionData.session.user;

    setEmail(user.email || "");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error(error);
    }

    if (data) {
      setName(data.name || "");
      setPhone(data.phone || "");
      setLocation(data.location || "");
      setSkills(data.skills || "");
      setBio(data.bio || "");
      setCvUrl(data.cv_url || "");
    }

    setLoading(false);
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const { data: sessionData } =
      await supabase.auth.getSession();

    if (!sessionData.session) {
      alert("Please login first.");
      setSaving(false);
      return;
    }

    const user = sessionData.session.user;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        name,
        email,
        phone,
        location,
        skills,
        bio,
        cv_url: cvUrl,
      });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile saved successfully!");
  }

  async function uploadCV() {
    if (!cvFile) {
      alert("Please select your CV first.");
      return;
    }

    if (cvFile.type !== "application/pdf") {
      alert("Please upload a PDF CV.");
      return;
    }

    const { data: sessionData } =
      await supabase.auth.getSession();

    if (!sessionData.session) {
      alert("Please login first.");
      return;
    }

    const user = sessionData.session.user;

    setUploading(true);

    const filePath = `${user.id}/${Date.now()}-${cvFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("cvs")
      .upload(filePath, cvFile);

    if (uploadError) {
      setUploading(false);
      alert(uploadError.message);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        cv_url: filePath,
      })
      .eq("id", user.id);

    if (profileError) {
      setUploading(false);
      alert(profileError.message);
      return;
    }

    setCvUrl(filePath);
    setCvFile(null);
    setUploading(false);

    alert("CV uploaded successfully!");
  }

  async function viewCV() {
    if (!cvUrl) {
      alert("No CV uploaded yet.");
      return;
    }

    const { data, error } = await supabase.storage
      .from("cvs")
      .createSignedUrl(cvUrl, 3600);

    if (error) {
      alert(error.message);
      return;
    }

    window.open(data.signedUrl, "_blank");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-xl">
          Loading profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            My Candidate Profile
          </h1>

          <p className="text-gray-400 mt-2">
            Build your professional profile for employers.
          </p>
        </div>

        <form
          onSubmit={saveProfile}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6"
        >

          <div>
            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              value={email}
              disabled
              className="w-full p-4 rounded-xl bg-zinc-800 text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Phone Number
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 7..."
              className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Location
            </label>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Nairobi, Kenya"
              className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Skills
            </label>

            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="AI Annotation, LiDAR, QA, VLA..."
              className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Professional Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell employers about your experience..."
              className="w-full p-4 rounded-xl bg-zinc-800 text-white h-40 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* CV UPLOAD */}

          <div className="border-t border-zinc-800 pt-6">

            <h2 className="text-2xl font-bold mb-2">
              Upload Your CV
            </h2>

            <p className="text-gray-400 mb-4">
              Upload your CV as a PDF. Maximum size: 10 MB.
            </p>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setCvFile(e.target.files?.[0] || null)
              }
              className="w-full p-4 rounded-xl bg-zinc-800 text-white"
            />

            <button
              type="button"
              onClick={uploadCV}
              disabled={uploading || !cvFile}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold disabled:opacity-50"
            >
              {uploading ? "Uploading CV..." : "Upload CV"}
            </button>

            {cvUrl && (
              <button
                type="button"
                onClick={viewCV}
                className="w-full mt-4 bg-zinc-700 hover:bg-zinc-600 py-4 rounded-xl font-bold"
              >
                📄 View My CV
              </button>
            )}

          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-lg disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

        </form>

      </div>
    </main>
  );
}