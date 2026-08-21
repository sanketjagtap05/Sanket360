"use client";

import Link from "next/link";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Fort = {
  id: number;
  name: string;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
};

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
  const validForts = forts.filter(
    (fort) =>
      typeof fort.latitude === "number" &&
      typeof fort.longitude === "number" &&
      Number.isFinite(fort.latitude) &&
      Number.isFinite(fort.longitude)
  );

  return (
    <section className="mapSection">

      {/* HEADER */}

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
            महाराष्ट्रातील ऐतिहासिक किल्ले नकाशावर
            explore करा. Marker वर click करून
            प्रत्येक किल्ल्याची माहिती पहा.
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


      {/* MAP */}

      <div className="mapWrapper">

        <MapContainer
          center={[18.45, 73.55]}
          zoom={9}
          scrollWheelZoom={true}
          className="sahyadriMap"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

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

        </MapContainer>


        {/* MAP INFO */}

        <div className="mapInfo">

          <span>
            🏰
          </span>

          <strong>
            {validForts.length} Forts
          </strong>

          <small>
            Click a marker to explore
          </small>

        </div>

      </div>


      {/* MAP NOTE */}

      <div className="mapBottom">

        <div>
          <span className="dot" />
          <span>
            LIVE FORT LOCATIONS
          </span>
        </div>

        <p>
          Marker वर click करा आणि Fort Detail page उघडा.
        </p>

      </div>


      <style jsx global>{`

        .mapSection {
          width: 100%;
          padding: 110px 7%;
          background: #080b09;
          color: #f4f4f1;
        }


        /* HEADER */

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


        /* COUNT */

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


        /* MAP */

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


        /* MAP INFO */

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


        /* MARKER */

        .customFortMarker {
          background: transparent;
          border: none;
        }

        .markerPin {
          width: 42px;
          height: 42px;

          border-radius:
            50% 50% 50% 0;

          transform:
            rotate(-45deg);

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

          transform:
            rotate(45deg);

          font-size: 20px;
        }


        /* POPUP */

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
          margin: 0 0 15px;

          color: #9da59f;

          font-size: 12px;
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

        .popupButton:hover {
          background: #f0bd55;
        }


        /* BOTTOM */

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


        /* TABLET */

        @media (max-width: 800px) {

          .mapSection {
            padding: 80px 6%;
          }

          .mapHeader {
            flex-direction: column;

            align-items: flex-start;
          }

          .fortCount {
            min-width: 120px;
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


        /* MOBILE */

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

          .mapBottom p {
            display: none;
          }

        }

      `}</style>

    </section>
  );
}