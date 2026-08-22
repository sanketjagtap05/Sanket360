"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Point = [number, number];

function FitBounds({
  points,
}: {
  points: Point[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    map.fitBounds(
      L.latLngBounds(points),
      {
        padding: [45, 45],
      }
    );
  }, [map, points]);

  return null;
}

const startIcon = L.divIcon({
  className: "gpxStartMarker",
  html: `<div class="gpxMarker">🚩</div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

const endIcon = L.divIcon({
  className: "gpxEndMarker",
  html: `<div class="gpxMarker">🏁</div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

export default function GPXLeafletMap({
  points,
}: {
  points: Point[];
}) {
  const start = points[0];
  const end = points[points.length - 1];

  return (
    <MapContainer
      center={start}
      zoom={13}
      scrollWheelZoom
      style={{
        width: "100%",
        height: "100%",
      }}
    >

      <LayersControl position="topright">

        <LayersControl.BaseLayer
          checked
          name="🗺️ Street Map"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer
          name="🛰️ Satellite"
        >
          <TileLayer
            attribution="Tiles &copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

      </LayersControl>

      <Polyline
        positions={points}
        pathOptions={{
          color: "#e7a93b",
          weight: 5,
          opacity: 0.95,
        }}
      />

      <FitBounds points={points} />

      <Marker
        position={start}
        icon={startIcon}
      >
        <Popup>
          <strong>🚩 Trek Start</strong>
          <br />
          {start[0].toFixed(6)},{" "}
          {start[1].toFixed(6)}
        </Popup>
      </Marker>

      <Marker
        position={end}
        icon={endIcon}
      >
        <Popup>
          <strong>🏁 Trek End / Fort</strong>
          <br />
          {end[0].toFixed(6)},{" "}
          {end[1].toFixed(6)}
        </Popup>
      </Marker>

      <style jsx global>{`

        .gpxStartMarker,
        .gpxEndMarker {
          background: transparent;
          border: none;
        }

        .gpxMarker {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #101511;

          border: 2px solid #e7a93b;

          border-radius: 50%;

          font-size: 22px;

          box-shadow:
            0 4px 15px
            rgba(0,0,0,0.55);
        }

        .leaflet-control-layers {
          background: #101511 !important;
          color: white !important;
          border: 1px solid #303832 !important;
        }

        .leaflet-control-layers label {
          color: white !important;
          font-size: 12px;
        }

        .leaflet-control-layers-toggle {
          background-color: #101511 !important;
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

      `}</style>

    </MapContainer>
  );
}