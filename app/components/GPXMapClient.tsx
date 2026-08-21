"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const FitRoute = dynamic(
  () => import("react-leaflet").then((mod) => mod.FitBounds),
  { ssr: false }
);

type GPXPoint = {
  lat: number;
  lon: number;
  ele: number | null;
};

type Point = [number, number];

function calculateDistance(points: GPXPoint[]) {
  let distance = 0;
  const R = 6371;

  for (let i = 1; i < points.length; i++) {
    const lat1 = (points[i - 1].lat * Math.PI) / 180;
    const lat2 = (points[i].lat * Math.PI) / 180;

    const dLat =
      ((points[i].lat - points[i - 1].lat) * Math.PI) / 180;

    const dLon =
      ((points[i].lon - points[i - 1].lon) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    const c =
      2 *
      Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    distance += R * c;
  }

  return distance;
}

function calculateElevationGain(points: GPXPoint[]) {
  let gain = 0;

  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1].ele;
    const current = points[i].ele;

    if (
      previous !== null &&
      current !== null &&
      current > previous
    ) {
      gain += current - previous;
    }
  }

  return gain;
}

export default function GPXMapClient({
  url,
}: {
  url: string;
}) {
  const [points, setPoints] = useState<GPXPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [satellite, setSatellite] = useState(false);

  useEffect(() => {
    async function loadGPX() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("GPX file load झाली नाही.");
        }

        const text = await response.text();

        const xml = new DOMParser().parseFromString(
          text,
          "application/xml"
        );

        let elements = Array.from(
          xml.querySelectorAll("trkpt")
        );

        if (elements.length === 0) {
          elements = Array.from(
            xml.querySelectorAll("rtept")
          );
        }

        if (elements.length === 0) {
          elements = Array.from(
            xml.querySelectorAll("wpt")
          );
        }

        const route: GPXPoint[] = elements
          .map((point) => {
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
              return null;
            }

            const eleElement =
              point.querySelector("ele");

            const elevation = eleElement
              ? Number(eleElement.textContent)
              : null;

            return {
              lat,
              lon,
              ele:
                elevation !== null &&
                Number.isFinite(elevation)
                  ? elevation
                  : null,
            };
          })
          .filter(
            (point): point is GPXPoint =>
              point !== null
          );

        if (route.length === 0) {
          throw new Error(
            "GPX मध्ये GPS points सापडले नाहीत."
          );
        }

        setPoints(route);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "GPX route load करता आली नाही."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGPX();
  }, [url]);

  if (loading) {
    return (
      <div className="status">
        🗺️ Loading trekking route...
      </div>
    );
  }

  if (error) {
    return (
      <div className="status">
        ⚠️ {error}
      </div>
    );
  }

  if (points.length === 0) {
    return (
      <div className="status">
        ⚠️ Trekking route सापडला नाही.
      </div>
    );
  }

  const mapPoints: Point[] = points.map((point) => [
    point.lat,
    point.lon,
  ]);

  const start = mapPoints[0];
  const end = mapPoints[mapPoints.length - 1];

  const distance = calculateDistance(points);

  const elevationGain =
    calculateElevationGain(points);

  const hasElevation = points.some(
    (point) => point.ele !== null
  );

  const elevations = points
    .filter((point) => point.ele !== null)
    .map((point) => point.ele as number);

  const minElevation =
    elevations.length > 0
      ? Math.min(...elevations)
      : 0;

  const maxElevation =
    elevations.length > 0
      ? Math.max(...elevations)
      : 0;

  return (
    <div className="container">

      {/* MAP */}

      <div className="mapWrapper">

        <MapContainer
          center={start}
          zoom={14}
          scrollWheelZoom={true}
          className="map"
          style={{
            width: "100%",
            height: "500px",
          }}
        >

          {satellite ? (
            <TileLayer
              attribution="Tiles © Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          ) : (
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}

          <Polyline
            positions={mapPoints}
            pathOptions={{
              color: "#e7a93b",
              weight: 5,
            }}
          />

          <Marker position={start}>
            <Popup>
              🥾 Trek Start
            </Popup>
          </Marker>

          <Marker position={end}>
            <Popup>
              🏰 Trek End
            </Popup>
          </Marker>

        </MapContainer>

        <div className="mapTitle">
          🥾 TREKKING ROUTE
        </div>

        <div className="toggle">

          <button
            className={!satellite ? "active" : ""}
            onClick={() => setSatellite(false)}
          >
            🗺️ Street
          </button>

          <button
            className={satellite ? "active" : ""}
            onClick={() => setSatellite(true)}
          >
            🛰️ Satellite
          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="stats">

        <div className="stat">
          <span>🥾</span>

          <div>
            <small>TREK DISTANCE</small>

            <strong>
              {distance.toFixed(2)} km
            </strong>
          </div>
        </div>

        <div className="stat">
          <span>⛰️</span>

          <div>
            <small>ELEVATION GAIN</small>

            <strong>
              {hasElevation
                ? `${Math.round(elevationGain)} m`
                : "N/A"}
            </strong>
          </div>
        </div>

        <div className="stat">
          <span>📍</span>

          <div>
            <small>GPS POINTS</small>

            <strong>
              {points.length.toLocaleString()}
            </strong>
          </div>
        </div>

      </div>

      {/* ELEVATION */}

      {hasElevation && (
        <div className="elevation">

          <div className="elevationHeader">

            <div>
              <small>04 • ELEVATION</small>

              <h3>
                Trek Elevation Profile
              </h3>
            </div>

            <div className="range">
              LOW {Math.round(minElevation)} m
              {" • "}
              HIGH {Math.round(maxElevation)} m
            </div>

          </div>

          <div className="chart">

            {elevations.map(
              (elevation, index) => {

                const left =
                  (index /
                    Math.max(
                      elevations.length - 1,
                      1
                    )) *
                  100;

                const top =
                  100 -
                  ((elevation -
                    minElevation) /
                    Math.max(
                      maxElevation -
                        minElevation,
                      1
                    )) *
                    80;

                return (
                  <div
                    key={index}
                    className="point"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                    }}
                  />
                );
              }
            )}

          </div>

          <div className="axis">
            <span>START</span>
            <span>
              {elevations.length.toLocaleString()} elevation points
            </span>
            <span>FORT / END</span>
          </div>

        </div>
      )}

      <style jsx>{`

        .container {
          width: 100%;
        }

        .mapWrapper {
          position: relative;
          width: 100%;
          height: 500px;
          border: 1px solid #303832;
          overflow: hidden;
          background: #101511;
        }

        .map {
          width: 100%;
          height: 500px;
        }

        .mapTitle {
          position: absolute;
          z-index: 1000;
          top: 20px;
          left: 20px;
          padding: 10px 15px;
          background: rgba(8,11,9,.92);
          color: #e7a93b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .toggle {
          position: absolute;
          z-index: 1000;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 5px;
          padding: 5px;
          background: rgba(8,11,9,.92);
        }

        .toggle button {
          border: none;
          padding: 9px 12px;
          background: transparent;
          color: #ccc;
          cursor: pointer;
          font-weight: 700;
        }

        .toggle .active {
          background: #e7a93b;
          color: #080b09;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 15px;
        }

        .stat {
          padding: 22px;
          border: 1px solid #303832;
          background: #101511;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .stat > span {
          font-size: 28px;
        }

        .stat small {
          display: block;
          color: #89918b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .stat strong {
          color: white;
          font-size: 20px;
        }

        .elevation {
          margin-top: 30px;
          padding: 30px;
          border: 1px solid #303832;
          background: #101511;
        }

        .elevationHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 25px;
        }

        .elevationHeader small {
          color: #e7a93b;
          letter-spacing: 3px;
          font-weight: 800;
        }

        .elevationHeader h3 {
          margin: 8px 0 0;
          color: white;
          font-size: 28px;
        }

        .range {
          color: #89918b;
          font-size: 11px;
          font-weight: 700;
        }

        .chart {
          position: relative;
          height: 220px;
          background: #0b0f0c;
          border: 1px solid #252c27;
          overflow: hidden;
        }

        .point {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #e7a93b;
          transform: translate(-50%, -50%);
        }

        .axis {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          color: #777f79;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .status {
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #101511;
          color: #aab1ac;
          border: 1px solid #303832;
        }

        @media (max-width: 750px) {

          .mapWrapper,
          .map {
            height: 450px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .toggle {
            top: auto;
            bottom: 15px;
          }

          .elevationHeader {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .elevation {
            padding: 20px;
          }

        }

      `}</style>

    </div>
  );
}