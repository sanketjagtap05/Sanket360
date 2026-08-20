"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Fort = {
  id: number;
  name: string;
};

export default function DeleteFortPage() {
  const [forts, setForts] = useState<Fort[]>([]);
  const [selectedFortId, setSelectedFortId] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadForts();
  }, []);

  async function loadForts() {
    const { data, error } = await supabase
      .from("forts")
      .select("id, name")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("Forts load झाले नाहीत.");
      setLoading(false);
      return;
    }

    setForts(data || []);
    setLoading(false);
  }

  async function handleDelete() {
    if (!selectedFortId) {
      alert("पहिले Fort select करा.");
      return;
    }

    const selectedFort = forts.find(
      (fort) => fort.id === Number(selectedFortId)
    );

    if (!selectedFort) {
      return;
    }

    const message =
      selectedFort.name +
      " delete करायचा आहे का?\n\nही action undo करता येणार नाही.";

    const confirmed = window.confirm(message);

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    const { error } = await supabase
      .from("forts")
      .delete()
      .eq("id", Number(selectedFortId));

    setDeleting(false);

    if (error) {
      console.error(error);
      alert("Fort delete करताना error आला.");
      return;
    }

    alert("Fort successfully deleted!");

    setSelectedFortId("");

    loadForts();
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
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold">
          Delete Fort
        </h1>

        <p className="mb-8 text-gray-500">
          Admin मधून Fort delete करा
        </p>

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            🏰 Select Fort
          </label>

          <select
            value={selectedFortId}
            onChange={(e) => setSelectedFortId(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-black"
          >
            <option value="">
              -- Select Fort --
            </option>

            {forts.map((fort) => (
              <option key={fort.id} value={fort.id}>
                {fort.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-bold">
            ⚠️ Warning
          </p>

          <p className="mt-1 text-sm">
            Fort delete केल्यानंतर त्याची माहिती कायमची delete होईल.
          </p>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting || !selectedFortId}
          className="w-full rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "🗑️ Delete Fort"}
        </button>

      </div>
    </main>
  );
}