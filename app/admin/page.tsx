"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [fortCount, setFortCount] = useState(0);

  useEffect(() => {
    loadFortCount();
  }, []);

  async function loadFortCount() {
    const { count, error } = await supabase
      .from("forts")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(error);
      return;
    }

    setFortCount(count || 0);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-8 rounded-2xl bg-black p-8 text-white shadow-lg">

          <p className="mb-2 text-sm font-semibold tracking-widest text-yellow-400">
            SANKET360
          </p>

          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-300">
            Fort information manage करा.
          </p>

        </div>

        {/* STAT */}

        <div className="mb-8 rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Total Forts
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            🏰 {fortCount}
          </h2>

        </div>

        {/* MANAGEMENT */}

        <h2 className="mb-4 text-2xl font-bold">
          Fort Management
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">

          {/* ADD */}

          <a
            href="/admin/add-fort"
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              ➕
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Add Fort
            </h3>

            <p className="mt-2 text-gray-500">
              नवीन Fort add करा.
            </p>
          </a>

          {/* EDIT */}

          <a
            href="/admin/edit-fort"
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              ✏️
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Edit Fort
            </h3>

            <p className="mt-2 text-gray-500">
              Fort ची माहिती बदला.
            </p>
          </a>

          {/* SEARCH */}

          <a
            href="/admin/search-fort"
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              🔎
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Search Fort
            </h3>

            <p className="mt-2 text-gray-500">
              Fort शोधा आणि View करा.
            </p>
          </a>

          {/* DELETE */}

          <a
            href="/admin/delete-fort"
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl">
              🗑️
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Delete Fort
            </h3>

            <p className="mt-2 text-gray-500">
              Fort delete करा.
            </p>
          </a>

        </div>

      </div>

    </main>
  );
}