"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

type Point = [number, number];

type GPXStats = {
  distanceKm: number;
  minElevation: number | null;
  maxElevation: number | null;
  totalClimb: number;
};

const GPXLeafletMap = dynamic(
  () => import("./GPXLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="gpxLoading">
        🗺️ Loading Trek Map...
      </div>
    ),
  }
);

function calculateDistance(points: Point[]) {
  if (points.length < 2) return 0;

  const R = 6371000;
  let total = 0;

  for (let i = 1; i < points.length; i++) {
    const lat1 = points[i - 1][0] * Math.PI / 180;
    const lat2 = points[i][0] * Math.PI / 180;

    const dLat =
      (points[i][0] - points[i - 1][0]) * Math.PI / 180;

    const dLon =
      (points[i][1] - points[i - 1][1]) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    const c =
      2 *
      Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    total += R * c;
  }

  return total / 1000;
}

function getElevationStats(elevations: number[]) {
  if (!elevations.length) {
    return {
      min: null,
      max: null,
      climb: 0,
    };
  }

  let min = elevations[0];
  let max = elevations[0];
  let climb = 0;

  for (let i = 0; i < elevations.length; i++) {
    min = Math.min(min, elevations[i]);
    max = Math.max(max, elevations[i]);

    if (i > 0) {
      const diff =
        elevations[i] - elevations[i - 1];

      if (diff > 0) {
        climb += diff;
      }
    }
  }

  return {
    min,
    max,
    climb,
  };
}

function ElevationProfile({
  elevations,
}: {
  elevations: number[];
}) {
  if (elevations.length < 2) return null;

  const width = 1000;
  const height = 220;
  const padding = 30;

  const min = Math.min(...elevations);
  const max = Math.max(...elevations);

  const range = max - min || 1;

  const step =
    (width - padding * 2) /
    (elevations.length - 1);

  const points = elevations
    .map((elevation, index) => {
      const x = padding + index * step;

      const y =
        height -
        padding -
        ((elevation - min) / range) *
          (height - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints =
    `${padding},${height - padding} ` +
    points +
    ` ${width - padding},${height - padding}`;

  return (
    <div className="elevationSection">

      <div className="elevationHeader">
        <div>
          <span>
            ELEVATION PROFILE
          </span>

          <strong>
            Trek चढ-उतार
          </strong>
        </div>

        <div className="elevationNumbers">
          <span>
            {Math.round(min)} M
          </span>

          <span>
            {Math.round(max)} M
          </span>
        </div>
      </div>

      <div className="elevationChart">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <polygon
            points={areaPoints}
            fill="rgba(231,169,59,0.16)"
          />

          <polyline
            points={points}
            fill="none"
            stroke="#e7a93b"
            strokeWidth="5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        <div className="profileLabels">
          <span>
            START
          </span>

          <span>
            ELEVATION
          </span>

          <span>
            END
          </span>
        </div>

      </div>
    </div>
  );
}

export default function GPXMapClient({
  url,
}: {
  url: string;
}) {
  const [points, setPoints] =
    useState<Point[]>([]);

  const [elevations, setElevations] =
    useState<number[]>([]);

  const [stats, setStats] =
    useState<GPXStats | null>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!url) {
      setError("GPX URL उपलब्ध नाही.");
      return;
    }

    async function loadGPX() {
      try {
        setError("");

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `GPX file load झाली नाही (${response.status})`
          );
        }

        const text = await response.text();

        const xml =
          new DOMParser().parseFromString(
            text,
            "application/xml"
          );

        if (xml.querySelector("parsererror")) {
          throw new Error(
            "GPX file योग्य format मध्ये नाही."
          );
        }

        const trackPoints = Array.from(
          xml.querySelectorAll("trkpt")
        );

        const routePoints = Array.from(
          xml.querySelectorAll("rtept")
        );

        const selected =
          trackPoints.length > 0
            ? trackPoints
            : routePoints;

        const parsed: Point[] = [];
        const elevationData: number[] = [];

        selected.forEach((point) => {
          const lat = Number(
            point.getAttribute("lat")
          );

          const lon = Number(
            point.getAttribute("lon")
          );

          if (
            !Number.isFinite(lat) ||
            !Number.isFinite(lon)
          ) {
            return;
          }

          parsed.push([lat, lon]);

          const ele =
            point.querySelector("ele");

          if (ele) {
            const value = Number(
              ele.textContent
            );

            if (Number.isFinite(value)) {
              elevationData.push(value);
            }
          }
        });

        if (!parsed.length) {
          throw new Error(
            "GPX मध्ये route points सापडले नाहीत."
          );
        }

        const elevationStats =
          getElevationStats(elevationData);

        setPoints(parsed);
        setElevations(elevationData);

        setStats({
          distanceKm:
            calculateDistance(parsed),

          minElevation:
            elevationStats.min,

          maxElevation:
            elevationStats.max,

          totalClimb:
            elevationStats.climb,
        });

      } catch (err) {
        console.error("GPX ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "GPX load करताना error आला."
        );
      }
    }

    loadGPX();
  }, [url]);

  if (error) {
    return (
      <div className="gpxError">
        ⚠️ {error}
      </div>
    );
  }

  if (!points.length) {
    return (
      <div className="gpxLoading">
        🗺️ Loading Trek Route...
      </div>
    );
  }

  const start = points[0];
  const end =
    points[points.length - 1];

  return (
    <div className="gpxContainer">

      {/* MAP */}
      <div className="mapBox">

        <GPXLeafletMap
          points={points}
        />

        <div className="mapTitle">
          <span>
            SANKET360 • GPX TREK ROUTE
          </span>

          <strong>
            Trek Route
          </strong>
        </div>

      </div>

      {/* STATS BELOW MAP */}
      {stats && (
        <div className="statsPanel">

          <div className="stat">
            <div className="icon">
              📏
            </div>

            <div>
              <small>
                DISTANCE
              </small>

              <strong>
                {stats.distanceKm.toFixed(2)} KM
              </strong>
            </div>
          </div>

          <div className="stat">
            <div className="icon">
              ⛰️
            </div>

            <div>
              <small>
                ELEVATION
              </small>

              <strong>
                {stats.minElevation !== null &&
                stats.maxElevation !== null
                  ? `${Math.round(
                      stats.minElevation
                    )} – ${Math.round(
                      stats.maxElevation
                    )} M`
                  : "N/A"}
              </strong>
            </div>
          </div>

          <div className="stat">
            <div className="icon">
              ⬆️
            </div>

            <div>
              <small>
                TOTAL CLIMB
              </small>

              <strong>
                {Math.round(
                  stats.totalClimb
                )} M
              </strong>
            </div>
          </div>

        </div>
      )}

      {/* START / END */}
      <div className="routeInfo">

        <div>
          <span>🚩 START</span>

          <strong>
            {start[0].toFixed(5)},{" "}
            {start[1].toFixed(5)}
          </strong>
        </div>

        <div className="routeArrow">
          ↓
        </div>

        <div>
          <span>🏁 END / FORT</span>

          <strong>
            {end[0].toFixed(5)},{" "}
            {end[1].toFixed(5)}
          </strong>
        </div>

      </div>

      {/* ELEVATION GRAPH */}
      <ElevationProfile
        elevations={elevations}
      />

      <style jsx global>{`

        .gpxContainer {
          width: 100%;
          background: #101511;
          border: 1px solid #303832;
        }

        .mapBox {
          width: 100%;
          height: 550px;
          position: relative;
        }

        .mapTitle {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 1000;

          padding: 12px 16px;

          background: rgba(8,11,9,0.92);

          border-left: 3px solid #e7a93b;

          display: flex;
          flex-direction: column;
          gap: 4px;

          pointer-events: none;
        }

        .mapTitle span {
          color: #e7a93b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .mapTitle strong {
          color: white;
          font-size: 17px;
        }

        .statsPanel {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);

          border-top: 1px solid #303832;
          border-bottom: 1px solid #303832;

          background: #080b09;
        }

        .stat {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;

          padding: 18px 10px;

          border-right: 1px solid #303832;
        }

        .stat:last-child {
          border-right: none;
        }

        .stat .icon {
          font-size: 22px;
        }

        .stat small {
          display: block;

          color: #8f9891;

          font-size: 8px;
          font-weight: 900;

          letter-spacing: 1.5px;

          margin-bottom: 5px;
        }

        .stat strong {
          display: block;

          color: white;

          font-size: 14px;
        }

        .routeInfo {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 30px;

          padding: 15px;

          background: #101511;

          border-bottom: 1px solid #303832;
        }

        .routeInfo > div:not(.routeArrow) {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .routeInfo span {
          color: #e7a93b;

          font-size: 8px;
          font-weight: 900;

          letter-spacing: 1.5px;
        }

        .routeInfo strong {
          color: #c4cbc6;

          font-size: 10px;
        }

        .routeArrow {
          color: #e7a93b;
          font-size: 20px;
        }

        .elevationSection {
          padding: 22px 24px 25px;

          background: #0b0f0c;
        }

        .elevationHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 15px;
        }

        .elevationHeader span {
          display: block;

          color: #e7a93b;

          font-size: 8px;
          font-weight: 900;

          letter-spacing: 2px;

          margin-bottom: 5px;
        }

        .elevationHeader strong {
          color: white;
          font-size: 16px;
        }

        .elevationNumbers {
          display: flex;
          gap: 15px;
        }

        .elevationNumbers span {
          color: #c4cbc6;
          font-size: 11px;
          letter-spacing: 0;
        }

        .elevationChart {
          width: 100%;
          height: 190px;

          border-left: 1px solid #303832;
          border-bottom: 1px solid #303832;

          position: relative;
        }

        .elevationChart svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .profileLabels {
          position: absolute;

          left: 10px;
          right: 10px;
          bottom: -22px;

          display: flex;
          justify-content: space-between;

          color: #69736c;

          font-size: 8px;
          font-weight: 900;

          letter-spacing: 1px;
        }

        .gpxLoading,
        .gpxError {
          width: 100%;
          min-height: 300px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #101511;

          color: #e7a93b;

          text-align: center;
        }

        .gpxError {
          color: #ff9d9d;
        }

        @media (max-width: 600px) {

          .mapBox {
            height: 430px;
          }

          .statsPanel {
            grid-template-columns:
              repeat(3, 1fr);
          }

          .stat {
            padding: 12px 4px;
            gap: 4px;
          }

          .stat .icon {
            display: none;
          }

          .stat small {
            font-size: 7px;
          }

          .stat strong {
            font-size: 10px;
          }

          .routeInfo {
            gap: 12px;
            justify-content: space-around;
          }

          .routeInfo strong {
            font-size: 8px;
          }

          .elevationSection {
            padding: 18px 12px 25px;
          }

        }

      `}</style>

    </div>
  );
}