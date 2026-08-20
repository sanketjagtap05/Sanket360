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

export default function EditFortPage() {
  const [forts, setForts] = useState<Fort[]>([]);
  const [selectedFortId, setSelectedFortId] = useState("1");

  const [history, setHistory] = useState("");
  const [location, setLocation] = useState("");
  const [thingsToSee, setThingsToSee] = useState("");

  const [photoLink, setPhotoLink] = useState("");
  const [photo360Link, setPhoto360Link] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [gpxLink, setGpxLink] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load all forts
  useEffect(() => {
    loadForts();
  }, []);

  async function loadForts() {
    const { data, error } = await supabase
      .from("forts")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("Forts load झाले नाहीत.");
      setLoading(false);
      return;
    }

    setForts(data || []);

    if (data && data.length > 0) {
      loadFortData(data[0]);
    }

    setLoading(false);
  }

  // Load selected fort data into form
  function loadFortData(fort: Fort) {
    setHistory(fort.history || "");
    setLocation(fort.location || "");
    setThingsToSee(fort.what_to_see || "");

    setPhotoLink(fort.photos_url || "");
    setPhoto360Link(fort.photos_360_url || "");
    setVideoLink(fort.video_url || "");
    setGpxLink(fort.gpx_url || "");
  }

  // When fort changes
  async function handleFortChange(id: string) {
    setSelectedFortId(id);

    const { data, error } = await supabase
      .from("forts")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      console.error(error);
      alert("Fort information load झाली नाही.");
      return;
    }

    loadFortData(data);
  }

  // Save selected fort
  async function handleSave() {
    setSaving(true);

    const { error } = await supabase
      .from("forts")
      .update({
        history,
        location,
        what_to_see: thingsToSee,
        photos_url: photoLink,
        photos_360_url: photo360Link,
        video_url: videoLink,
        gpx_url: gpxLink,
      })
      .eq("id", Number(selectedFortId));

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Save करताना error आला.");
      return;
    }

    alert("Fort information saved! ✅");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold">
          Loading forts...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold">
          Edit Fort
        </h1>

        <p className="mb-6 text-gray-500">
          Admin मधून Fort ची माहिती बदला
        </p>

        {/* SELECT FORT */}
        <div className="mb-7">
          <label className="mb-2 block font-semibold">
            🏰 Select Fort
          </label>

          <select
            value={selectedFortId}
            onChange={(e) => handleFortChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-black"
          >
            {forts.map((fort) => (
              <option key={fort.id} value={fort.id}>
                {fort.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="my-6" />

        {/* HISTORY */}
        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            History
          </label>

          <textarea
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            placeholder="Fort ची History लिहा..."
            className="min-h-40 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black"
          />
        </div>

        {/* LOCATION */}
        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            Location
          </label>

          <textarea
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Fort चे Location / Google Maps link..."
            className="min-h-28 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black"
          />
        </div>

        {/* WHAT TO SEE */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            काय पाहायचं?
          </label>

          <textarea
            value={thingsToSee}
            onChange={(e) => setThingsToSee(e.target.value)}
            placeholder="उदा. बालेकिल्ला, पद्मावती माची..."
            className="min-h-32 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black"
          />
        </div>

        <hr className="my-8" />

        <h2 className="mb-5 text-2xl font-bold">
          Media & Links
        </h2>

        {/* PHOTO */}
        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            📸 Photo Link
          </label>

          <input
            type="url"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black"
          />
        </div>

        {/* 360 PHOTO */}
        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            🌐 360° Photo Link
          </label>

          <input
            type="url"
            value={photo360Link}
            onChange={(e) => setPhoto360Link(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black"
          />
        </div>

        {/* VIDEO */}
        <div className="mb-5">
          <label className="mb-2 block font-semibold">
            🎥 Video Link
          </label>

          <input
            type="url"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="YouTube / Video link..."
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black"
          />
        </div>

        {/* GPX */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            🗺️ GPX Link
          </label>

          <input
            type="url"
            value={gpxLink}
            onChange={(e) => setGpxLink(e.target.value)}
            placeholder="GPX file / Google Drive link..."
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-black"
          />
        </div>

        {/* SAVE */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>

      </div>
    </main>
  );
}