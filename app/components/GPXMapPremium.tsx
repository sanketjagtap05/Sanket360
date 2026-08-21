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

type GPXPoint = {
  lat: number;
  lon: number;
  ele: number | null;
};

type Point = [number, number];

function FitRoute({ points }: { points: Point[] }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    map.fitBounds(L.latLngBounds(points), {
      padding: [60, 60],
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [points, map]);

  return null;
}

function distanceKm(points: GPXPoint[]) {
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
      2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    distance += R * c;
  }

  return distance;
}

function elevationGain(points: GPXPoint[]) {
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

function createMarker(
  emoji: string,
  label: string
) {
  return L.divIcon({
    className: "premiumMarker",
    html: `
      <div class="markerBubble">
        <div class="markerEmoji">${emoji}</div>
        <div class="markerLabel">${label}</div>
      </div>
    `,
    iconSize: [90, 45],
    iconAnchor: [45, 22],
  });
}

export default function GPXMapPremium({
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
            const lat = Number(point.getAttribute("lat"));
            const lon = Number(point.getAttribute("lon"));

            if (
              !Number.isFinite(lat) ||
              !Number.isFinite(lon)
            ) {
              return null;
            }

            const eleElement = point.querySelector("ele");

            const ele = eleElement
              ? Number(eleElement.textContent)
              : null;

            return {
              lat,
              lon,
              ele:
                ele !== null && Number.isFinite(ele)
                  ? ele
                  : null,
            };
          })
          .filter(
            (point): point is GPXPoint => point !== null
          );

        if (!route.length) {
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
      <div className="statusBox">
        🗺️ Loading Sanket360 Trek Route...
      </div>
    );
  }

  if (error) {
    return (
      <div className="statusBox">
        ⚠️ {error}
      </div>
    );
  }

  if (!points.length) {
    return (
      <div className="statusBox">
        ⚠️ Trek route सापडला नाही.
      </div>
    );
  }

  const route: Point[] = points.map((point) => [
    point.lat,
    point.lon,
  ]);

  const start = route[0];
  const end = route[route.length - 1];

  const distance = distanceKm(points);
  const gain = elevationGain(points);

  const startIcon = createMarker("🥾", "START");
  const endIcon = createMarker("🏰", "FORT");

  return (
    <div className="premiumContainer">

      {/* HEADER */}

      <div className="premiumHeader">

        <div>
          <p className="eyebrow">
            SANKET360 • TREK ROUTE
          </p>

          <h2>
            Explore the Trek
          </h2>

          <p className="headerText">
            Follow the recorded GPS route and explore
            the complete trekking journey.
          </p>
        </div>

        <div className="headerBadge">
          GPX
          <span>LIVE ROUTE</span>
        </div>

      </div>

      {/* MAP */}

      <div className="mapWrapper">

        <MapContainer
          center={start}
          zoom={14}
          scrollWheelZoom={true}
          className="premiumMap"
          style={{
            width: "100%",
            height: "560px",
          }}
        >

          {satellite ? (
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          ) : (
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}

          <Polyline
            positions={route}
            pathOptions={{
              color: "#e7a93b",
              weight: 6,
              opacity: 0.95,
            }}
          />

          <Marker
            position={start}
            icon={startIcon}
          >
            <Popup>
              <strong>🥾 Trek Start</strong>
            </Popup>
          </Marker>

          <Marker
            position={end}
            icon={endIcon}
          >
            <Popup>
              <strong>🏰 Fort / Trek End</strong>
            </Popup>
          </Marker>

          <FitRoute points={route} />

        </MapContainer>

        {/* MAP CONTROLS */}

        <div className="mapTitle">
          🥾 TREKKING ROUTE
        </div>

        <div className="mapControls">

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
          <div className="statIcon">
            🥾
          </div>

          <div>
            <small>
              TREK DISTANCE
            </small>

            <strong>
              {distance.toFixed(2)} km
            </strong>
          </div>
        </div>

        <div className="stat">
          <div className="statIcon">
            ⛰️
          </div>

          <div>
            <small>
              ELEVATION GAIN
            </small>

            <strong>
              {Math.round(gain)} m
            </strong>
          </div>
        </div>

        <div className="stat">
          <div className="statIcon">
            📍
          </div>

          <div>
            <small>
              GPS POINTS
            </small>

            <strong>
              {points.length.toLocaleString()}
            </strong>
          </div>
        </div>

      </div>

      {/* JOURNEY */}

      <div className="journey">

        <div className="journeyPoint">

          <div className="journeyIcon">
            🥾
          </div>

          <div>
            <small>
              START
            </small>

            <strong>
              Trek Starting Point
            </strong>
          </div>

        </div>

        <div className="journeyLine">
          <span />
          <span />
          <span />
        </div>

        <div className="journeyPoint">

          <div className="journeyIcon">
            🏰
          </div>

          <div>
            <small>
              DESTINATION
            </small>

            <strong>
              Fort / Trek End
            </strong>
          </div>

        </div>

      </div>

      <style jsx global>{`

        .premiumContainer {
          width: 100%;
          color: #f4f4f1;
        }

        .premiumHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 25px;
          padding: 30px;
          border: 1px solid #303832;
          background: #101511;
        }

        .eyebrow {
          margin: 0 0 10px;
          color: #e7a93b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .premiumHeader h2 {
          margin: 0;
          font-size: clamp(32px, 5vw, 52px);
          line-height: 1;
        }

        .headerText {
          max-width: 650px;
          margin: 15px 0 0;
          color: #9da59f;
          line-height: 1.6;
        }

        .headerBadge {
          min-width: 110px;
          padding: 18px;
          border: 1px solid #e7a93b;
          color: #e7a93b;
          text-align: center;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .headerBadge span {
          display: block;
          margin-top: 5px;
          color: #89918b;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .mapWrapper {
          position: relative;
          width: 100%;
          height: 560px;
          overflow: hidden;
          border: 1px solid #303832;
          background: #101511;
        }

        .premiumMap {
          width: 100%;
          height: 560px;
        }

        .mapTitle {
          position: absolute;
          z-index: 1000;
          top: 18px;
          left: 18px;
          padding: 11px 15px;
          background: rgba(8, 11, 9, 0.94);
          border: 1px solid #303832;
          color: #e7a93b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .mapControls {
          position: absolute;
          z-index: 1000;
          right: 18px;
          top: 18px;
          display: flex;
          gap: 4px;
          padding: 5px;
          background: rgba(8, 11, 9, 0.94);
          border: 1px solid #303832;
        }

        .mapControls button {
          padding: 9px 12px;
          border: 0;
          background: transparent;
          color: #c4cbc6;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
        }

        .mapControls button.active {
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
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 24px;
          border: 1px solid #303832;
          background: #101511;
        }

        .statIcon {
          font-size: 28px;
        }

        .stat small {
          display: block;
          margin-bottom: 6px;
          color: #89918b;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .stat strong {
          font-size: 21px;
        }

        .journey {
          display: grid;
          grid-template-columns: 1fr 180px 1fr;
          align-items: center;
          gap: 20px;
          margin-top: 15px;
          padding: 25px;
          border: 1px solid #303832;
          background: #101511;
        }

        .journeyPoint {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .journeyIcon {
          font-size: 28px;
        }

        .journeyPoint small {
          display: block;
          margin-bottom: 5px;
          color: #e7a93b;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .journeyPoint strong {
          font-size: 15px;
        }

        .journeyLine {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
        }

        .journeyLine span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e7a93b;
        }

        .journeyLine span:nth-child(2) {
          width: 100%;
          height: 2px;
          border-radius: 0;
        }

        .statusBox {
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #303832;
          background: #101511;
          color: #aab1ac;
        }

        .premiumMarker {
          background: transparent !important;
          border: none !important;
        }

        .markerBubble {
          display: flex;
          align-items: center;
          gap: 5px;
          transform: translateX(-25px);
        }

        .markerEmoji {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #e7a93b;
          border-radius: 50%;
          background: #080b09;
          font-size: 17px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.5);
        }

        .markerLabel {
          padding: 5px 8px;
          background: #080b09;
          border: 1px solid #303832;
          color: #f4f4f1;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        @media (max-width: 750px) {

          .premiumHeader {
            flex-direction: column;
            align-items: flex-start;
            padding: 22px;
          }

          .headerBadge {
            min-width: auto;
          }

          .mapWrapper {
            height: 450px;
          }

          .premiumMap {
            height: 450px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .journey {
            grid-template-columns: 1fr;
          }

          .journeyLine {
            width: 100%;
          }

          .mapControls {
            top: auto;
            bottom: 15px;
            right: 10px;
          }

        }

      `}</style>

    </div>
  );
}