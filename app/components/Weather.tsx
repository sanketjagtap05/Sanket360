"use client";

import dynamic from "next/dynamic";

const WeatherClient = dynamic(
  () => import("./WeatherClient"),
  {
    ssr: false,
    loading: () => (
      <div className="weatherLoading">
        🌤️ Loading Rajgad Weather...
      </div>
    ),
  }
);

export default function Weather({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  return (
    <WeatherClient
      latitude={latitude}
      longitude={longitude}
    />
  );
}