"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Fort = {
  id: number;
  name: string;
  location?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  photos_url?: string | null;
};

type Props = {
  forts: Fort[];
};

function FitMap({ forts }: { forts: Fort[] }) {
  const map = useMap();

  useEffect(() => {
    const validForts = forts.filter(
      (fort) =>
        typeof fort.latitude === "number" &&
        typeof fort.longitude === "number"
    );

    if (!validForts.length) return;

    const bounds = L.latLngBounds(
      validForts.map((fort) => [
        fort.latitude as number,
        fort.longitude as number,
      ])
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
    });
  }, [map, forts]);

  return null;
}

const fortIcon = L.divIcon({
  className: "fortMarker",
  html: `
    <div class="fortMarkerInner">
      🏰
    </div>
  `,
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  popupAnchor: [0, -42],
});

export default function SahyadriMapClient({
  forts,
}: Props) {
  const validForts = forts.filter(
    (fort) =>
      typeof fort.latitude === "number" &&
      typeof fort.longitude === "number"
  );

  const rajgad = validForts.find(
    (fort) =>
      fort.name.toLowerCase().includes("rajgad") ||
      fort.name.includes("राजगड")
  );

  const defaultCenter: [number, number] =
    rajgad &&
    typeof rajgad.latitude === "number" &&
    typeof rajgad.longitude === "number"
      ? [rajgad.latitude, rajgad.longitude]
      : [18.2315, 73.6825];

  return (
    <div className="mapWrapper">

      <MapContainer
        center={defaultCenter}
        zoom={9}
        scrollWheelZoom={true}
        style={{
          width: "100%",
          height: "600px",
        }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMap forts={validForts} />

        {validForts.map((fort) => {

          if (
            typeof fort.latitude !== "number" ||
            typeof fort.longitude !== "number"
          ) {
            return null;
          }

          return (
            <Marker
              key={fort.id}
              position={[
                fort.latitude,
                fort.longitude,
              ]}
              icon={fortIcon}
            >
              <Popup>

                <div className="popup">

                  <strong>
                    {fort.name}
                  </strong>

                  {fort.location && (
                    <p>
                      📍 {fort.location}
                    </p>
                  )}

                  <a
                    href={`/Forts/${fort.id}`}
                  >
                    EXPLORE FORT →
                  </a>

                </div>

              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

      <style jsx global>{`

        .mapWrapper {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .fortMarker {
          background: transparent;
          border: none;
        }

        .fortMarkerInner {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #101511;

          border: 2px solid #e7a93b;

          border-radius: 50%;

          font-size: 22px;

          box-shadow:
            0 5px 20px rgba(0,0,0,.55);

          transition: .2s;
        }

        .fortMarkerInner:hover {
          transform: scale(1.12);
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

        .popup {
          min-width: 160px;
        }

        .popup strong {
          display: block;

          color: #e7a93b;

          font-size: 16px;

          margin-bottom: 8px;
        }

        .popup p {
          margin: 5px 0 12px;

          color: #aeb6b0;

          font-size: 12px;
        }

        .popup a {
          color: #e7a93b;

          text-decoration: none;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 1px;
        }

        .leaflet-control-zoom a {
          background: #101511 !important;
          color: #e7a93b !important;

          border-color: #303832 !important;
        }

      `}</style>

    </div>
  );
}