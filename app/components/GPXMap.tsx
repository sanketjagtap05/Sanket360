"use client";

import dynamic from "next/dynamic";

const GPXMapClient = dynamic(
  () => import("./GPXMapClient"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "550px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101511",
          color: "#e7a93b",
        }}
      >
        🗺️ Loading Trek Map...
      </div>
    ),
  }
);

type GPXMapProps = {
  url: string;
};

export default function GPXMap({
  url,
}: GPXMapProps) {
  return <GPXMapClient url={url} />;
}