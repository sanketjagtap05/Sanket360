"use client";

import dynamic from "next/dynamic";

const SahyadriMapClient = dynamic(
  () => import("./SahyadriMapClient"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080b09",
          color: "#e7a93b",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        🗺️ Loading Sahyadri Map...
      </div>
    ),
  }
);

export default SahyadriMapClient;