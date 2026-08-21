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
    if (points.length > 0) {
      const bounds = L.latLngBounds(points);

      map.fitBounds(bounds, {
        padding: [50, 50],
      });

      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }
  }, [points, map]);

  return null;
}

function calculateDistance(points: GPXPoint[]) {
  let distance = 0;

  for (let i = 1; i < points.length; i++) {
    const R = 6371;

    const lat1 =
      (points[i - 1].lat * Math.PI) / 180;

    const lat2 =
      (points[i].lat * Math.PI) / 180;

    const dLat =
      ((points[i].lat - points[i - 1].lat) *
        Math.PI) /
      180;

    const dLon =
      ((points[i].lon - points[i - 1].lon) *
        Math.PI) /
      180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    distance += R * c;
  }

  return distance;
}

function calculateElevationGain(
  points: GPXPoint[]
) {
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

function ElevationProfile({
  points,
}: {
  points: GPXPoint[];
}) {
  const elevationPoints = points.filter(
    (point) => point.ele !== null
  );

  if (elevationPoints.length < 2) {
    return (
      <div className="elevationEmpty">
        ⛰️ Elevation data उपलब्ध नाही.
      </div>
    );
  }

  const elevations = elevationPoints.map(
    (point) => point.ele as number
  );

  const minElevation =
    Math.min(...elevations);

  const maxElevation =
    Math.max(...elevations);

  const range =
    maxElevation - minElevation || 1;

  const width = 1000;
  const height = 300;

  const step =
    width / (elevations.length - 1);

  const path = elevations
    .map((elevation, index) => {
      const x = index * step;

      const y =
        height -
        ((elevation - minElevation) /
          range) *
          (height - 30) -
        15;

      if (index === 0) {
        return `M ${x.toFixed(2)} ${y.toFixed(
          2
        )}`;
      }

      return `L ${x.toFixed(2)} ${y.toFixed(
        2
      )}`;
    })
    .join(" ");

  const areaPath =
    path +
    ` L ${width} ${height} L 0 ${height} Z`;

  return (
    <section className="elevationSection">

      <div className="elevationHeader">

        <div>
          <p className="elevationLabel">
            04 • ELEVATION
          </p>

          <h3>
            Trek Elevation Profile
          </h3>
        </div>

        <div className="elevationRange">

          <span>
            LOW {Math.round(minElevation)} m
          </span>

          <span>
            HIGH {Math.round(maxElevation)} m
          </span>

        </div>

      </div>

      <div className="elevationChart">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >

          <path
            d={areaPath}
            className="elevationArea"
          />

          <path
            d={path}
            className="elevationLine"
          />

        </svg>

      </div>

      <div className="elevationAxis">

        <span>
          START
        </span>

        <span>
          {elevationPoints.length.toLocaleString()} GPS elevation points
        </span>

        <span>
          FORT / END
        </span>

      </div>

    </section>
  );
}

export default function GPXMap({
  url,
}: {
  url: string;
}) {
  const [points, setPoints] =
    useState<GPXPoint[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [satellite, setSatellite] =
    useState(false);

  useEffect(() => {
    async function loadGPX() {
      try {
        const response =
          await fetch(url);

        if (!response.ok) {
          throw new Error(
            "GPX file load झाली नाही."
          );
        }

        const text =
          await response.text();

        const xml =
          new DOMParser().parseFromString(
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

        const route: GPXPoint[] =
          elements
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

              const ele = eleElement
                ? Number(
                    eleElement.textContent
                  )
                : null;

              return {
                lat,
                lon,
                ele:
                  ele !== null &&
                  Number.isFinite(ele)
                    ? ele
                    : null,
              };
            })
            .filter(
              (
                point
              ): point is GPXPoint =>
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
      <div className="gpxStatus">
        🗺️ Loading trekking route...
      </div>
    );
  }

  if (error) {
    return (
      <div className="gpxStatus">
        ⚠️ {error}
      </div>
    );
  }

  if (points.length === 0) {
    return (
      <div className="gpxStatus">
        ⚠️ Trekking route सापडला नाही.
      </div>
    );
  }

  const mapPoints: Point[] =
    points.map((point) => [
      point.lat,
      point.lon,
    ]);

  const start = mapPoints[0];

  const end =
    mapPoints[mapPoints.length - 1];

  const distance =
    calculateDistance(points);

  const elevationGain =
    calculateElevationGain(points);

  const hasElevation =
    points.some(
      (point) => point.ele !== null
    );

  return (
    <div className="gpxContainer">

      {/* MAP */}

      <div className="gpxMapWrapper">

        <MapContainer
          center={start}
          zoom={14}
          scrollWheelZoom={true}
          className="gpxMap"
          style={{
            width: "100%",
            height: "550px",
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
            positions={mapPoints}
            pathOptions={{
              color: "#e7a93b",
              weight: 5,
              opacity: 1,
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

          <FitRoute
            points={mapPoints}
          />

        </MapContainer>

        <div className="mapLabel">
          🥾 TREKKING ROUTE
        </div>

        <div className="mapToggle">

          <button
            className={
              !satellite
                ? "active"
                : ""
            }
            onClick={() =>
              setSatellite(false)
            }
          >
            🗺️ Street
          </button>

          <button
            className={
              satellite
                ? "active"
                : ""
            }
            onClick={() =>
              setSatellite(true)
            }
          >
            🛰️ Satellite
          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="routeStats">

        <div className="statCard">

          <span>🥾</span>

          <div>

            <small>
              TREK DISTANCE
            </small>

            <strong>
              {distance.toFixed(2)} km
            </strong>

          </div>

        </div>

        <div className="statCard">

          <span>⛰️</span>

          <div>

            <small>
              ELEVATION GAIN
            </small>

            <strong>
              {hasElevation
                ? `${Math.round(
                    elevationGain
                  )} m`
                : "N/A"}
            </strong>

          </div>

        </div>

        <div className="statCard">

          <span>📍</span>

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

      {/* START / END */}

      <div className="routeEndpoints">

        <div className="endpoint">

          <span>🥾</span>

          <div>

            <small>
              START POINT
            </small>

            <strong>
              Trek Starting Point
            </strong>

          </div>

        </div>

        <div className="routeArrow">
          ↓
        </div>

        <div className="endpoint">

          <span>🏰</span>

          <div>

            <small>
              END POINT
            </small>

            <strong>
              Fort / Trek Destination
            </strong>

          </div>

        </div>

      </div>

      {/* ELEVATION PROFILE */}

      <ElevationProfile
        points={points}
      />

      <style jsx>{`

        .gpxContainer {
          width: 100%;
        }

        .gpxMapWrapper {
          position: relative;
          width: 100%;
          height: 550px;
          min-height: 550px;
          border: 1px solid #303832;
          background: #101511;
          overflow: hidden;
        }

        .gpxMap {
          width: 100%;
          height: 550px;
        }

        .mapLabel {
          position: absolute;
          z-index: 1000;
          top: 20px;
          left: 20px;
          padding: 10px 15px;
          background: rgba(
            8,
            11,
            9,
            0.92
          );
          border: 1px solid #303832;
          color: #e7a93b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .mapToggle {
          position: absolute;
          z-index: 1000;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 5px;
          padding: 5px;
          background: rgba(
            8,
            11,
            9,
            0.92
          );
          border: 1px solid #303832;
        }

        .mapToggle button {
          border: none;
          padding: 9px 12px;
          background: transparent;
          color: #c4cbc6;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
        }

        .mapToggle button.active {
          background: #e7a93b;
          color: #080b09;
        }

        .routeStats {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 15px;
          margin-top: 15px;
        }

        .statCard {
          padding: 22px;
          border: 1px solid #303832;
          background: #101511;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .statCard > span {
          font-size: 28px;
        }

        .statCard small {
          display: block;
          color: #89918b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .statCard strong {
          color: #f4f4f1;
          font-size: 20px;
        }

        .routeEndpoints {
          margin-top: 15px;
          display: grid;
          grid-template-columns:
            1fr auto 1fr;
          align-items: center;
          gap: 15px;
        }

        .endpoint {
          padding: 22px;
          border: 1px solid #303832;
          background: #101511;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .endpoint > span {
          font-size: 28px;
        }

        .endpoint small {
          display: block;
          color: #89918b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        .endpoint strong {
          color: #f4f4f1;
          font-size: 16px;
        }

        .routeArrow {
          color: #e7a93b;
          font-size: 28px;
          font-weight: bold;
        }

        .elevationSection {
          margin-top: 40px;
          padding: 30px;
          border: 1px solid #303832;
          background: #101511;
        }

        .elevationHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 25px;
        }

        .elevationLabel {
          margin: 0 0 8px;
          color: #e7a93b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .elevationHeader h3 {
          margin: 0;
          color: #f4f4f1;
          font-size: 28px;
        }

        .elevationRange {
          display: flex;
          gap: 20px;
          color: #929b95;
          font-size: 11px;
          font-weight: 700;
        }

        .elevationChart {
          width: 100%;
          height: 300px;
          overflow: hidden;
          background: #0b0f0c;
          border: 1px solid #252c27;
        }

        .elevationChart svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .elevationArea {
          fill: rgba(
            231,
            169,
            59,
            0.15
          );
        }

        .elevationLine {
          fill: none;
          stroke: #e7a93b;
          stroke-width: 4;
          vector-effect: non-scaling-stroke;
        }

        .elevationAxis {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          color: #777f79;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .elevationEmpty {
          margin-top: 40px;
          padding: 30px;
          text-align: center;
          border: 1px solid #303832;
          background: #101511;
          color: #89918b;
        }

        .gpxStatus {
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #101511;
          color: #aab1ac;
          border: 1px solid #303832;
        }

        @media (max-width: 750px) {

          .gpxMapWrapper {
            height: 450px;
            min-height: 450px;
          }

          .gpxMap {
            height: 450px;
          }

          .routeStats {
            grid-template-columns: 1fr;
          }

          .routeEndpoints {
            grid-template-columns: 1fr;
          }

          .routeArrow {
            text-align: center;
          }

          .mapToggle {
            top: auto;
            right: 10px;
            bottom: 15px;
          }

          .mapLabel {
            top: 15px;
            left: 10px;
          }

          .elevationSection {
            padding: 20px;
          }

          .elevationHeader {
            flex-direction: column;
            align-items: flex-start;
          }

          .elevationRange {
            flex-direction: column;
            gap: 5px;
          }

          .elevationChart {
            height: 220px;
          }
        }

      `}</style>

    </div>
  );
}