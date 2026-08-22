"use client";

import Link from "next/link";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

type Fort = {
  id: number;
  name: string;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  gpx_url?: string | null;
};

type RoutePoint = [number, number];

const fortIcon = L.divIcon({
  className: "customFortMarker",
  html: `
    <div class="markerPin">
      <span>🏰</span>
    </div>
  `,
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  popupAnchor: [0, -42],
});

export default function SahyadriMapClient({
  forts,
}: {
  forts: Fort[];
}) {
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [routeName, setRouteName] = useState("");

  const validForts = forts.filter(
    (fort) =>
      typeof fort.latitude === "number" &&
      typeof fort.longitude === "number" &&
      Number.isFinite(fort.latitude) &&
      Number.isFinite(fort.longitude)
  );

  useEffect(() => {
    const rajgad = forts.find(
      (fort) =>
        fort.id === 1 &&
        fort.gpx_url
    );

    if (!rajgad?.gpx_url) return;

    async function loadGPX() {
      try {
        const response = await fetch(
          rajgad!.gpx_url!
        );

        if (!response.ok) {
          throw new Error("GPX file could not be loaded");
        }

        const xmlText = await response.text();

        const parser = new DOMParser();

        const xml = parser.parseFromString(
          xmlText,
          "application/xml"
        );

        const trackPoints =
          Array.from(
            xml.querySelectorAll("trkpt")
          );

        const routePoints: RoutePoint[] =
          trackPoints
            .map((point) => {
              const lat = Number(
                point.getAttribute("lat")
              );

              const lon = Number(
                point.getAttribute("lon")
              );

              return [lat, lon] as RoutePoint;
            })
            .filter(
              ([lat, lon]) =>
                Number.isFinite(lat) &&
                Number.isFinite(lon)
            );

        if (routePoints.length > 0) {
          setRoute(routePoints);
          setRouteName(rajgad.name);
          console.log(
            "GPX ROUTE LOADED:",
            routePoints.length,
            "points"
          );
        }
      } catch (error) {
        console.error(
          "GPX LOAD ERROR:",
          error
        );
      }
    }

    loadGPX();
  }, [forts]);

  return (
    <section className="mapSection">

      <div className="mapHeader">

        <div>
          <p className="mapLabel">
            05 • SAHYADRI INTERACTIVE MAP
          </p>

          <h2>
            Explore Forts
            <br />
            <span>on Map</span>
          </h2>

          <p className="mapDescription">
            महाराष्ट्रातील ऐतिहासिक किल्ले,
            trekking routes आणि GPX tracks
            नकाशावर explore करा.
          </p>
        </div>

        <div className="fortCount">
          <strong>
            {validForts.length}
          </strong>

          <span>
            FORTS MAPPED
          </span>
        </div>

      </div>

      <div className="mapWrapper">

        <MapContainer
          center={[18.45, 73.55]}
          zoom={9}
          scrollWheelZoom={true}
          className="sahyadriMap"
        >

          <LayersControl position="topright">

            {/* STREET */}

            <LayersControl.BaseLayer
              checked
              name="🗺️ Street"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            {/* SATELLITE */}

            <LayersControl.BaseLayer
              name="🛰️ Satellite"
            >
              <TileLayer
                attribution="Tiles &copy; Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>

            {/* TERRAIN */}

            <LayersControl.BaseLayer
              name="🏔️ Terrain"
            >
              <TileLayer
                attribution="&copy; OpenTopoMap"
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

          </LayersControl>


          {/* FORT MARKERS */}

          {validForts.map((fort) => (

            <Marker
              key={fort.id}
              position={[
                fort.latitude as number,
                fort.longitude as number,
              ]}
              icon={fortIcon}
            >

              <Popup>

                <div className="popup">

                  <div className="popupIcon">
                    🏰
                  </div>

                  <p className="popupLabel">
                    SAHYADRI FORT
                  </p>

                  <h3>
                    {fort.name}
                  </h3>

                  {fort.location && (
                    <p className="popupLocation">
                      📍 {fort.location}
                    </p>
                  )}

                  {fort.gpx_url && (
                    <p className="gpxAvailable">
                      🗺️ GPX ROUTE AVAILABLE
                    </p>
                  )}

                  <Link
                    href={`/Forts/${fort.id}`}
                    className="popupButton"
                  >
                    VIEW FORT →
                  </Link>

                </div>

              </Popup>

            </Marker>

          ))}


          {/* GPX ROUTE */}

          {route.length > 1 && (
            <Polyline
              positions={route}
              pathOptions={{
                color: "#e7a93b",
                weight: 5,
                opacity: 0.9,
              }}
            />
          )}

        </MapContainer>


        {/* MAP INFO */}

        <div className="mapInfo">

          <span>🏰</span>

          <strong>
            {validForts.length} Forts
          </strong>

          <small>
            Click marker to explore
          </small>

        </div>


        {/* GPX STATUS */}

        {route.length > 1 && (
          <div className="gpxStatus">

            <span className="routeDot" />

            <div>
              <strong>
                {routeName} Trek Route
              </strong>

              <small>
                GPX • {route.length} route points
              </small>
            </div>

          </div>
        )}

      </div>


      <div className="mapBottom">

        <div>
          <span className="dot" />

          <span>
            LIVE FORT LOCATIONS
          </span>
        </div>

        <p>
          🛰️ Satellite • 🗺️ Street • 🏔️ Terrain
        </p>

      </div>


      <style jsx global>{`

        .mapSection {
          width: 100%;
          padding: 110px 7%;
          background: #080b09;
          color: #f4f4f1;
        }

        .mapHeader {
          max-width: 1250px;
          margin: 0 auto 45px;

          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          gap: 30px;
        }

        .mapLabel {
          margin: 0 0 12px;

          color: #e7a93b;

          font-size: 11px;
          font-weight: 900;

          letter-spacing: 4px;
        }

        .mapHeader h2 {
          margin: 0 0 20px;

          font-size: clamp(
            45px,
            6vw,
            75px
          );

          line-height: 0.95;

          letter-spacing: -3px;
        }

        .mapHeader h2 span {
          color: #e7a93b;
        }

        .mapDescription {
          max-width: 650px;

          margin: 0;

          color: #929b95;

          font-size: 16px;

          line-height: 1.8;
        }

        .fortCount {
          min-width: 150px;

          padding: 20px;

          background: #101511;

          border: 1px solid #303832;

          display: flex;

          flex-direction: column;
        }

        .fortCount strong {
          color: #e7a93b;

          font-size: 40px;

          line-height: 1;
        }

        .fortCount span {
          margin-top: 8px;

          color: #777f79;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 2px;
        }

        .mapWrapper {
          max-width: 1250px;

          height: 600px;

          margin: 0 auto;

          position: relative;

          overflow: hidden;

          border: 1px solid #303832;

          background: #101511;
        }

        .sahyadriMap {
          width: 100%;
          height: 600px;
        }

        .mapInfo {
          position: absolute;

          z-index: 1000;

          left: 20px;
          bottom: 20px;

          padding: 12px 16px;

          background: rgba(
            8,
            11,
            9,
            0.94
          );

          border: 1px solid #303832;

          display: flex;

          align-items: center;

          gap: 9px;
        }

        .mapInfo span {
          font-size: 20px;
        }

        .mapInfo strong {
          color: #e7a93b;

          font-size: 12px;
        }

        .mapInfo small {
          color: #9da59f;

          font-size: 11px;
        }

        .gpxStatus {
          position: absolute;

          z-index: 1000;

          right: 20px;
          bottom: 20px;

          padding: 13px 17px;

          display: flex;

          align-items: center;

          gap: 10px;

          background: rgba(
            8,
            11,
            9,
            0.95
          );

          border: 1px solid #e7a93b;
        }

        .gpxStatus strong {
          display: block;

          color: #e7a93b;

          font-size: 12px;
        }

        .gpxStatus small {
          display: block;

          margin-top: 3px;

          color: #999;

          font-size: 10px;
        }

        .routeDot {
          width: 9px;
          height: 9px;

          border-radius: 50%;

          background: #e7a93b;

          box-shadow:
            0 0 12px
            rgba(231,169,59,.8);
        }

        .customFortMarker {
          background: transparent;
          border: none;
        }

        .markerPin {
          width: 42px;
          height: 42px;

          border-radius:
            50% 50% 50% 0;

          transform: rotate(-45deg);

          background: #e7a93b;

          border: 3px solid #080b09;

          box-shadow:
            0 4px 15px
            rgba(0,0,0,0.45);

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .markerPin span {
          display: block;

          transform: rotate(45deg);

          font-size: 20px;
        }

        .leaflet-popup-content-wrapper {
          background: #101511;

          color: white;

          border:
            1px solid #303832;

          border-radius: 0;
        }

        .leaflet-popup-tip {
          background: #101511;
        }

        .leaflet-popup-content {
          margin: 16px;

          min-width: 190px;
        }

        .popup {
          text-align: left;
        }

        .popupIcon {
          font-size: 30px;
          margin-bottom: 5px;
        }

        .popupLabel {
          margin: 0 0 5px;

          color: #e7a93b;

          font-size: 9px;

          font-weight: 900;

          letter-spacing: 2px;
        }

        .popup h3 {
          margin: 0 0 8px;

          color: white;

          font-size: 21px;
        }

        .popupLocation {
          margin: 0 0 10px;

          color: #9da59f;

          font-size: 12px;
        }

        .gpxAvailable {
          color: #e7a93b;

          font-size: 10px;

          font-weight: bold;
        }

        .popupButton {
          display: inline-block;

          padding: 9px 12px;

          background: #e7a93b;

          color: #111;

          text-decoration: none;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 1px;
        }

        .mapBottom {
          max-width: 1250px;

          margin: 15px auto 0;

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 20px;
        }

        .mapBottom div {
          display: flex;

          align-items: center;

          gap: 8px;

          color: #777f79;

          font-size: 9px;

          font-weight: 900;

          letter-spacing: 2px;
        }

        .dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #e7a93b;

          display: inline-block;
        }

        .mapBottom p {
          margin: 0;

          color: #666e68;

          font-size: 11px;
        }

        @media (max-width: 800px) {

          .mapSection {
            padding: 80px 6%;
          }

          .mapHeader {
            flex-direction: column;
            align-items: flex-start;
          }

          .mapWrapper {
            height: 500px;
          }

          .sahyadriMap {
            height: 500px;
          }

          .mapBottom {
            flex-direction: column;
            align-items: flex-start;
          }

        }

        @media (max-width: 600px) {

          .mapSection {
            padding: 70px 6%;
          }

          .mapHeader h2 {
            font-size: 48px;
          }

          .mapWrapper {
            height: 450px;
          }

          .sahyadriMap {
            height: 450px;
          }

          .mapInfo {
            left: 10px;
            bottom: 10px;
          }

          .mapInfo small {
            display: none;
          }

          .gpxStatus {
            right: 10px;
            bottom: 10px;
          }

          .mapBottom p {
            display: none;
          }

        }

      `}</style>

    </section>
  );
}