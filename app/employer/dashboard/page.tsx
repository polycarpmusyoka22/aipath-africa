"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CandidateProfile() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: sessionData } =
      await supabase.auth.getSession();

    if (!sessionData.session) {
      router.push("/Login");
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
      alert(error.message);
    }

    if (data) {
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
      setLocation(data.location || "");
      setSkills(data.skills || "");
      setBio(data.bio || "");
      setLinkedin(data.linkedin || "");
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
      router.push("/Login");
      return;
    }

    const user = sessionData.session.user;

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName,
        email: email,
        phone: phone,
        location: location,
        skills: skills,
        bio: bio,
        linkedin: linkedin,
        cv_url: cvUrl,
        updated_at: new Date().toISOString(),
      });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile saved successfully!");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Loading profile...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              My Profile
            </h1>

            <p className="text-gray-400 mt-2">
              Build your professional AI career profile.
            </p>
          </div>

          <button
            onClick={() => router.push("/candidate")}
            className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl"
          >
            Dashboard
          </button>
        </div>

        <form
          onSubmit={saveProfile}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5"
        >

          <div>
            <label className="block text-gray-400 mb-2">
              Full Name
            </label>

            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Email
            </label>

            <input
              value={email}
              disabled
              className="w-full bg-zinc-800/60 text-gray-500 rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Phone
            </label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254..."
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Location
            </label>

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Nairobi, Kenya"
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Skills
            </label>

            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="AI Data Annotation, LiDAR, VLA, QA..."
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Professional Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell employers about your experience..."
              className="w-full bg-zinc-800 rounded-xl p-4 h-32 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              LinkedIn
            </label>

            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/..."
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              CV Link
            </label>

            <input
              value={cvUrl}
              onChange={(e) => setCvUrl(e.target.value)}
              placeholder="CV URL"
              className="w-full bg-zinc-800 rounded-xl p-4 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 py-4 rounded-xl font-bold text-lg"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

        </form>

      </div>

    </main>
  );
}