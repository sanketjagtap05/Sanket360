"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Fort = {
  id: number;
  name: string;
  location: string | null;
};

export default function SearchFortPage() {
  const [forts, setForts] = useState<Fort[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadForts();
  }, []);

  async function loadForts() {
    const { data, error } = await supabase
      .from("forts")
      .select("id, name, location")
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

  const filteredForts = forts.filter((fort) =>
    fort.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-6 rounded-2xl bg-white p-6 shadow">

          <h1 className="mb-2 text-3xl font-bold">
            Search Fort
          </h1>

          <p className="mb-5 text-gray-500">
            Fort शोधा
          </p>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rajgad search करा..."
            className="w-full rounded-xl border border-gray-300 p-3 outline-none"
          />

        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-6 shadow">
            Loading forts...
          </div>
        ) : (
          <div className="space-y-4">

            {filteredForts.map((fort) => (
              <div
                key={fort.id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                <h2 className="text-2xl font-bold">
                  🏰 {fort.name}
                </h2>

                <p className="mt-2 text-gray-500">
                  📍 {fort.location || "Location उपलब्ध नाही"}
                </p>

                <div className="mt-5 flex gap-3">

                  <a
                    href="/admin/edit-fort"
                    className="rounded-xl bg-black px-5 py-2 font-semibold text-white"
                  >
                    Edit
                  </a>

                  <a
                    href="/Forts/Rajgad"
                    className="rounded-xl border border-gray-300 px-5 py-2 font-semibold"
                  >
                    View
                  </a>

                </div>

              </div>
            ))}

            {filteredForts.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-center shadow">
                Fort सापडला नाही.
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}