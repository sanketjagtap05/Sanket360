"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddFortPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveFort(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    setMessage("Saving...");

    const form = new FormData(e.currentTarget);

    const fortData = {
      name: String(form.get("name") || "").trim(),
      location: String(form.get("location") || "").trim(),
      history: String(form.get("history") || "").trim(),
      what_to_see: String(form.get("what_to_see") || "").trim(),
      photos_url: String(form.get("photos_url") || "").trim(),
      photos_360_url: String(form.get("photos_360_url") || "").trim(),
      video_url: String(form.get("video_url") || "").trim(),
      gpx_url: String(form.get("gpx_url") || "").trim(),
    };

    if (!fortData.name) {
      setMessage("❌ Fort Name टाका.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("forts")
      .insert([fortData]);

    if (error) {
      console.error("Add Fort Error:", error);
      setMessage("❌ Fort save झाला नाही: " + error.message);
      setSaving(false);
      return;
    }

    setMessage("✅ Fort successfully saved!");

    setTimeout(() => {
      router.push("/Forts");
      router.refresh();
    }, 1000);
  }

  return (
    <main className="admin-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="/" className="logo">
          SANKET<span>360</span>
        </a>

        <div className="nav-links">
          <a href="/admin">Admin</a>
          <a href="/Forts">Forts</a>
        </div>
      </nav>

      {/* FORM */}
      <section className="form-section">

        <p className="label">
          SANKET360 • ADMIN
        </p>

        <h1>Add New Fort</h1>

        <p className="subtitle">
          नवीन किल्ल्याची माहिती Supabase मध्ये add करा.
        </p>

        <form onSubmit={saveFort}>

          {/* NAME */}
          <label>
            Fort Name *

            <input
              name="name"
              type="text"
              placeholder="उदा. Harishchandragad"
              required
            />
          </label>

          {/* LOCATION */}
          <label>
            Location

            <input
              name="location"
              type="text"
              placeholder="उदा. Ahmednagar, Maharashtra"
            />
          </label>

          {/* HISTORY */}
          <label>
            History

            <textarea
              name="history"
              rows={8}
              placeholder="किल्ल्याचा इतिहास..."
            />
          </label>

          {/* WHAT TO SEE */}
          <label>
            What to See

            <textarea
              name="what_to_see"
              rows={6}
              placeholder="उदा. केदारेश्वर गुहा, कोकणकडा, तारामती शिखर..."
            />
          </label>

          <h2>Media & Links</h2>

          {/* PHOTO */}
          <label>
            📸 Normal Photos URL

            <input
              name="photos_url"
              type="url"
              placeholder="https://..."
            />
          </label>

          {/* 360 */}
          <label>
            🌐 360° Photos URL

            <input
              name="photos_360_url"
              type="url"
              placeholder="https://..."
            />
          </label>

          {/* VIDEO */}
          <label>
            🎥 Video URL

            <input
              name="video_url"
              type="url"
              placeholder="https://youtube.com/..."
            />
          </label>

          {/* GPX */}
          <label>
            🗺️ GPX URL

            <input
              name="gpx_url"
              type="url"
              placeholder="https://..."
            />
          </label>

          {/* SAVE */}
          <button
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "💾 SAVE FORT"}
          </button>

        </form>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

      </section>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .admin-page {
          min-height: 100vh;
          background: #0b0f0d;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
        }

        .navbar {
          padding: 20px 7%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #29342e;
          background: #080b09;
        }

        .logo {
          color: white;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 2px;
          text-decoration: none;
        }

        .logo span {
          color: #e7a93b;
        }

        .nav-links {
          display: flex;
          gap: 25px;
        }

        .nav-links a {
          color: #ddd;
          text-decoration: none;
        }

        .nav-links a:hover {
          color: #e7a93b;
        }

        .form-section {
          max-width: 850px;
          margin: auto;
          padding: 70px 7%;
        }

        .label {
          color: #e7a93b;
          letter-spacing: 3px;
          font-size: 12px;
          font-weight: bold;
        }

        h1 {
          font-size: 50px;
          margin: 10px 0;
        }

        .subtitle {
          color: #999;
          line-height: 1.6;
        }

        form {
          display: grid;
          gap: 22px;
          margin-top: 40px;
        }

        label {
          display: grid;
          gap: 8px;
          color: #e7a93b;
          font-weight: bold;
        }

        input,
        textarea {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #35433a;
          background: #111713;
          color: white;
          font-size: 16px;
          font-family: inherit;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #e7a93b;
        }

        textarea {
          resize: vertical;
        }

        h2 {
          margin-top: 25px;
          margin-bottom: 0;
          font-size: 28px;
        }

        button {
          padding: 15px 25px;
          border: none;
          border-radius: 8px;
          background: #e7a93b;
          color: #111;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background: #f0b84f;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .message {
          margin-top: 25px;
          padding: 16px;
          border-radius: 8px;
          background: #17231b;
          border: 1px solid #35433a;
          color: white;
        }

        @media (max-width: 600px) {

          .navbar {
            flex-direction: column;
            gap: 15px;
          }

          .form-section {
            padding: 50px 6%;
          }

          h1 {
            font-size: 40px;
          }

        }

      `}</style>

    </main>
  );
}