"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Fort = {
  id: number;
  name: string;
  location: string | null;
  history: string | null;
  what_to_see: string | null;
  photos_url: string | null;
  photos_360_url: string | null;
  video_url: string | null;
  gpx_url: string | null;
};

export default function AdminPage() {
  const [forts, setForts] = useState<Fort[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    history: "",
    what_to_see: "",
    photos_url: "",
    photos_360_url: "",
    video_url: "",
    gpx_url: "",
  });

  useEffect(() => {
    loadForts();
  }, []);

  async function loadForts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("forts")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      setMessage("Forts load करताना error आला.");
    } else {
      setForts(data || []);
    }

    setLoading(false);
  }

  function selectFort(fort: Fort) {
    setSelectedId(fort.id);

    setForm({
      name: fort.name || "",
      location: fort.location || "",
      history: fort.history || "",
      what_to_see: fort.what_to_see || "",
      photos_url: fort.photos_url || "",
      photos_360_url: fort.photos_360_url || "",
      video_url: fort.video_url || "",
      gpx_url: fort.gpx_url || "",
    });

    setMessage("");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function saveFort(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedId) {
      setMessage("आधी किल्ला select करा.");
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("forts")
      .update({
        name: form.name,
        location: form.location,
        history: form.history,
        what_to_see: form.what_to_see,
        photos_url: form.photos_url,
        photos_360_url: form.photos_360_url,
        video_url: form.video_url,
        gpx_url: form.gpx_url,
      })
      .eq("id", selectedId);

    if (error) {
      setMessage("❌ Save करताना error आला.");
    } else {
      setMessage("✅ Fort information successfully saved.");
      await loadForts();
    }

    setSaving(false);
  }

  return (
    <main className="page">
      <nav className="navbar">
        <a href="/" className="logo">
          SANKET<span>360</span>
        </a>

        <div className="navLinks">
          <a href="/">Home</a>
          <a href="/Forts">Forts</a>
          <a href="/admin">Admin</a>
        </div>
      </nav>

      <section className="adminHeader">
        <p className="label">SANKET360 • ADMIN</p>
        <h1>Fort Manager</h1>
        <p>
          किल्ला select करून त्याची माहिती आणि photo/video links update करा.
        </p>
      </section>

      <section className="adminLayout">
        {/* FORT LIST */}

        <div className="fortList">
          <h2>Forts</h2>

          {loading ? (
            <p className="muted">Loading...</p>
          ) : forts.length === 0 ? (
            <p className="muted">No forts found.</p>
          ) : (
            forts.map((fort) => (
              <button
                key={fort.id}
                className={
                  selectedId === fort.id
                    ? "fortButton active"
                    : "fortButton"
                }
                onClick={() => selectFort(fort)}
              >
                <span>
                  FORT {String(fort.id).padStart(2, "0")}
                </span>

                <strong>{fort.name}</strong>

                <small>{fort.location || "Maharashtra"}</small>
              </button>
            ))
          )}
        </div>

        {/* EDIT FORM */}

        <div className="editor">
          {!selectedId ? (
            <div className="empty">
              <div>🏰</div>
              <h2>Select a Fort</h2>
              <p>
                डावीकडून Rajgad, Harishchandgad किंवा Ghangad select करा.
              </p>
            </div>
          ) : (
            <form onSubmit={saveFort}>
              <p className="label">EDIT FORT</p>

              <h2>{form.name}</h2>

              <label>Fort Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <label>Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
              />

              <label>History</label>
              <textarea
                name="history"
                value={form.history}
                onChange={handleChange}
                rows={7}
              />

              <label>What to See</label>
              <textarea
                name="what_to_see"
                value={form.what_to_see}
                onChange={handleChange}
                rows={5}
              />

              <div className="divider">
                <span>MEDIA LINKS</span>
              </div>

              <label>📷 Photo Gallery URL</label>
              <input
                name="photos_url"
                value={form.photos_url}
                onChange={handleChange}
                placeholder="https://..."
              />

              <label>🌐 360° Experience URL</label>
              <input
                name="photos_360_url"
                value={form.photos_360_url}
                onChange={handleChange}
                placeholder="https://..."
              />

              <label>🎥 Video URL</label>
              <input
                name="video_url"
                value={form.video_url}
                onChange={handleChange}
                placeholder="https://..."
              />

              <label>🗺️ GPX URL</label>
              <input
                name="gpx_url"
                value={form.gpx_url}
                onChange={handleChange}
                placeholder="https://..."
              />

              <button
                type="submit"
                className="saveButton"
                disabled={saving}
              >
                {saving ? "SAVING..." : "SAVE FORT →"}
              </button>

              {message && <div className="message">{message}</div>}
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="footerLogo">
          SANKET<span>360</span>
        </div>

        <p>EXPLORE • EXPERIENCE • PRESERVE</p>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #080b09;
          color: #f5f5f5;
          font-family: Arial, Helvetica, sans-serif;
        }

        .navbar {
          min-height: 72px;
          padding: 18px 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #29312c;
        }

        .logo,
        .footerLogo {
          color: white;
          text-decoration: none;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .logo span,
        .footerLogo span {
          color: #e7a93b;
        }

        .navLinks {
          display: flex;
          gap: 25px;
        }

        .navLinks a {
          color: #ccc;
          text-decoration: none;
        }

        .navLinks a:hover {
          color: #e7a93b;
        }

        .adminHeader {
          padding: 90px 7% 60px;
          background:
            radial-gradient(
              circle at 75% 35%,
              rgba(231, 169, 59, 0.15),
              transparent 35%
            ),
            #111713;
        }

        .label {
          color: #e7a93b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .adminHeader h1 {
          font-size: clamp(50px, 8vw, 90px);
          margin: 15px 0;
          letter-spacing: -3px;
        }

        .adminHeader > p:last-child {
          color: #aeb6b0;
          font-size: 17px;
        }

        .adminLayout {
          max-width: 1200px;
          margin: auto;
          padding: 70px 7%;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 30px;
        }

        .fortList {
          background: #101511;
          border: 1px solid #303832;
          padding: 22px;
          height: fit-content;
        }

        .fortList h2 {
          margin-top: 0;
        }

        .fortButton {
          width: 100%;
          padding: 18px;
          margin-top: 12px;
          text-align: left;
          cursor: pointer;
          color: white;
          background: #151b17;
          border: 1px solid #303832;
        }

        .fortButton:hover,
        .fortButton.active {
          border-color: #e7a93b;
        }

        .fortButton span,
        .fortButton small {
          display: block;
          color: #858d87;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .fortButton strong {
          display: block;
          margin: 7px 0;
          font-size: 18px;
        }

        .fortButton.active strong {
          color: #e7a93b;
        }

        .editor {
          background: #101511;
          border: 1px solid #303832;
          padding: 35px;
        }

        .editor h2 {
          font-size: 42px;
          margin: 10px 0 30px;
        }

        label {
          display: block;
          margin: 22px 0 8px;
          color: #d5dad6;
          font-size: 13px;
          font-weight: bold;
        }

        input,
        textarea {
          width: 100%;
          padding: 14px;
          border: 1px solid #38413b;
          background: #080b09;
          color: white;
          font-size: 15px;
          outline: none;
          border-radius: 4px;
        }

        input:focus,
        textarea:focus {
          border-color: #e7a93b;
        }

        textarea {
          resize: vertical;
          line-height: 1.6;
        }

        .divider {
          margin: 40px 0 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid #303832;
        }

        .divider span {
          color: #e7a93b;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 3px;
        }

        .saveButton {
          margin-top: 30px;
          padding: 15px 25px;
          border: none;
          background: #e7a93b;
          color: #111;
          font-weight: 800;
          cursor: pointer;
          border-radius: 5px;
        }

        .saveButton:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .message {
          margin-top: 20px;
          padding: 15px;
          border: 1px solid #38413b;
          color: #e7a93b;
        }

        .empty {
          min-height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .empty div {
          font-size: 60px;
        }

        .empty h2 {
          margin: 20px 0 10px;
        }

        .empty p,
        .muted {
          color: #858d87;
        }

        footer {
          padding: 60px;
          text-align: center;
          border-top: 1px solid #29312c;
        }

        footer p {
          color: #777f79;
          font-size: 11px;
          letter-spacing: 2px;
        }

        @media (max-width: 800px) {
          .adminLayout {
            grid-template-columns: 1fr;
          }

          .editor {
            padding: 25px;
          }
        }

        @media (max-width: 600px) {
          .navbar {
            flex-direction: column;
            gap: 15px;
          }

          .adminHeader {
            padding: 60px 6% 40px;
          }

          .adminLayout {
            padding: 50px 6%;
          }
        }
      `}</style>
    </main>
  );
}