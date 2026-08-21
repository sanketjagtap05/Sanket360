"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Point = [number, number];

type GPXMapClientProps = {
  url: string;
};

function FitMapBounds({
  points,
}: {
  points: Point[];
}) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [30, 30],
    });
  }, [map, points]);

  return null;
}

const startIcon = L.divIcon({
  className: "gpxStartMarker",
  html: `<div class="gpxMarker">🚩</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const endIcon = L.divIcon({
  className: "gpxEndMarker",
  html: `<div class="gpxMarker">🏁</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export default function GPXMapClient({
  url,
}: GPXMapClientProps) {
  const [points, setPoints] = useState<Point[]>([]);
  const [error, setError] = useState("");

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

        const xml = new DOMParser().parseFromString(
          text,
          "application/xml"
        );

        const trackPoints =
          Array.from(
            xml.querySelectorAll("trkpt")
          );

        const routePoints =
          Array.from(
            xml.querySelectorAll("rtept")
          );

        const selectedPoints =
          trackPoints.length > 0
            ? trackPoints
            : routePoints;

        const parsed: Point[] =
          selectedPoints
            .map((point) => {
              const lat = Number(
                point.getAttribute("lat")
              );

              const lon = Number(
                point.getAttribute("lon")
              );

              return [lat, lon] as Point;
            })
            .filter(
              ([lat, lon]) =>
                Number.isFinite(lat) &&
                Number.isFinite(lon)
            );

        if (parsed.length === 0) {
          throw new Error(
            "GPX मध्ये route points सापडले नाहीत."
          );
        }

        setPoints(parsed);

      } catch (err) {
        console.error(
          "GPX LOAD ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "GPX route load करताना error आला."
        );
      }
    }

    loadGPX();
  }, [url]);

  if (error) {
    return (
      <div className="gpxError">
        🗺️ {error}
      </div>
    );
  }

  if (points.length === 0) {
    return (
      <div className="gpxLoading">
        🗺️ Loading Trek Route...
      </div>
    );
  }

  const start = points[0];
  const end = points[points.length - 1];

  return (
    <div className="gpxWrapper">

      <MapContainer
        center={start}
        zoom={13}
        scrollWheelZoom={true}
        className="gpxMap"
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={points}
          pathOptions={{
            color: "#e7a93b",
            weight: 5,
            opacity: 0.9,
          }}
        />

        <FitMapBounds
          points={points}
        />

        <Marker
          position={start}
          icon={startIcon}
        >
          <Popup>
            <strong>
              🚩 Trek Start
            </strong>
          </Popup>
        </Marker>

        <Marker
          position={end}
          icon={endIcon}
        >
          <Popup>
            <strong>
              🏁 Trek End
            </strong>
          </Popup>
        </Marker>

      </MapContainer>

      <style jsx global>{`

        .gpxWrapper {
          width: 100%;
          height: 550px;
          position: relative;
          overflow: hidden;
          border: 1px solid #303832;
          background: #101511;
        }

        .gpxMap {
          width: 100%;
          height: 100%;
        }

        .gpxStartMarker,
        .gpxEndMarker {
          background: transparent;
          border: none;
        }

        .gpxMarker {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 23px;

          background: #101511;

          border: 2px solid #e7a93b;

          border-radius: 50%;

          box-shadow:
            0 4px 15px
            rgba(0,0,0,0.45);
        }

        .gpxLoading,
        .gpxError {
          width: 100%;
          min-height: 300px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 30px;

          background: #101511;

          border: 1px solid #303832;

          color: #e7a93b;

          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        .gpxError {
          color: #ff9d9d;
        }

        .leaflet-popup-content-wrapper {
          background: #101511;
          color: white;

          border: 1px solid #303832;

          border-radius: 0;
        }

        .leaflet-popup-tip {
          background: #101511;
        }

        @media (max-width: 600px) {

          .gpxWrapper {
            height: 430px;
          }

        }

      `}</style>

    </div>
  );
}