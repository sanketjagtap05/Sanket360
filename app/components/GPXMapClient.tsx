"use client";

import dynamic from "next/dynamic";

const GPXMapPremium = dynamic(
  () => import("@/app/components/GPXMapPremium"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101511",
          color: "#aab1ac",
          border: "1px solid #303832",
        }}
      >
        🗺️ Loading Trek Route...
      </div>
    ),
  }
);

export default function GPXMapClient({
  url,
}: {
  url: string;
}) {
  return <GPXMapPremium url={url} />;
}