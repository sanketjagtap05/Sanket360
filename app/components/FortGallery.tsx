"use client";

import { useState } from "react";

type FortGalleryProps = {
  photosUrl: string | null;
  photos360Url: string | null;
  videoUrl: string | null;
  fortName: string;
};

export default function FortGallery({
  photosUrl,
  photos360Url,
  videoUrl,
  fortName,
}: FortGalleryProps) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <div className="gallery">

        {/* PHOTO */}

        <div
          className="galleryCard"
          onClick={() => {
            if (photosUrl) {
              setFullscreen(true);
            }
          }}
        >
          <div className="galleryImage">

            {photosUrl ? (
              <img
                src={photosUrl}
                alt={fortName}
              />
            ) : (
              <div className="placeholder">
                📷
              </div>
            )}

            <div className="overlay" />

            <div className="number">
              01
            </div>

            <div className="type">
              PHOTOGRAPHY
            </div>

          </div>

          <div className="content">

            <span>
              01 / PHOTO
            </span>

            <h3>
              {fortName}
            </h3>

            <p>
              VIEW FULLSCREEN →
            </p>

          </div>
        </div>

        {/* 360 */}

        <div
          className="galleryCard"
          onClick={() => {
            if (photos360Url) {
              window.open(
                photos360Url,
                "_blank",
                "noopener,noreferrer"
              );
            }
          }}
        >

          <div className="galleryImage">

            <div className="placeholder">
              🌐
            </div>

            <div className="overlay" />

            <div className="number">
              02
            </div>

            <div className="type">
              360°
            </div>

            {photos360Url && (
              <div className="open">
                OPEN ↗
              </div>
            )}

          </div>

          <div className="content">

            <span>
              02 / IMMERSIVE
            </span>

            <h3>
              360° Experience
            </h3>

            <p>
              {photos360Url
                ? "LAUNCH EXPERIENCE →"
                : "COMING SOON"}
            </p>

          </div>

        </div>

        {/* VIDEO */}

        <div
          className="galleryCard"
          onClick={() => {
            if (videoUrl) {
              window.open(
                videoUrl,
                "_blank",
                "noopener,noreferrer"
              );
            }
          }}
        >

          <div className="galleryImage">

            <div className="placeholder">
              ▶
            </div>

            <div className="overlay" />

            <div className="number">
              03
            </div>

            <div className="type">
              VIDEO
            </div>

            {videoUrl && (
              <div className="open">
                PLAY ↗
              </div>
            )}

          </div>

          <div className="content">

            <span>
              03 / VIDEO
            </span>

            <h3>
              {fortName} Video
            </h3>

            <p>
              {videoUrl
                ? "WATCH VIDEO →"
                : "COMING SOON"}
            </p>

          </div>

        </div>

      </div>

      {/* FULLSCREEN */}

      {fullscreen && photosUrl && (
        <div
          className="fullscreen"
          onClick={() => setFullscreen(false)}
        >

          <button
            className="close"
            onClick={() => setFullscreen(false)}
          >
            ×
          </button>

          <img
            src={photosUrl}
            alt={fortName}
          />

          <div className="fullscreenTitle">
            {fortName} • SANKET360
          </div>

        </div>
      )}

      <style jsx>{`

        .gallery {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 20px;
        }

        .galleryCard {
          background: #101511;

          border: 1px solid #303832;

          overflow: hidden;

          cursor: pointer;

          transition:
            transform .3s ease,
            border-color .3s ease,
            box-shadow .3s ease;
        }

        .galleryCard:hover {
          transform: translateY(-8px);

          border-color: #e7a93b;

          box-shadow:
            0 25px 60px rgba(0,0,0,.45);
        }

        .galleryImage {
          height: 280px;

          position: relative;

          overflow: hidden;

          background: #18201b;
        }

        .galleryImage img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          display: block;

          transition:
            transform .6s ease;
        }

        .galleryCard:hover
        .galleryImage img {
          transform: scale(1.08);
        }

        .placeholder {
          width: 100%;
          height: 100%;

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 65px;

          background:
            radial-gradient(
              circle,
              rgba(231,169,59,.13),
              transparent 55%
            ),
            #18201b;
        }

        .overlay {
          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(0,0,0,.8)
            );
        }

        .number {
          position: absolute;

          top: 18px;
          left: 18px;

          width: 40px;
          height: 40px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: white;

          border: 1px solid
            rgba(255,255,255,.35);

          background:
            rgba(0,0,0,.35);

          font-size: 10px;

          font-weight: 900;
        }

        .type {
          position: absolute;

          top: 23px;
          right: 18px;

          color: #e7a93b;

          font-size: 9px;

          font-weight: 900;

          letter-spacing: 2px;
        }

        .open {
          position: absolute;

          bottom: 18px;
          right: 18px;

          padding: 9px 12px;

          background: #e7a93b;

          color: #111;

          font-size: 9px;

          font-weight: 900;
        }

        .content {
          padding: 22px;
        }

        .content span {
          color: #e7a93b;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 3px;
        }

        .content h3 {
          margin: 10px 0;

          color: white;

          font-size: 22px;
        }

        .content p {
          margin: 0;

          color: #858e87;

          font-size: 9px;

          font-weight: 900;

          letter-spacing: 1.5px;
        }

        .fullscreen {
          position: fixed;

          inset: 0;

          z-index: 9999;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 30px;

          background:
            rgba(0,0,0,.95);

          cursor: zoom-out;
        }

        .fullscreen img {
          max-width: 92vw;

          max-height: 88vh;

          object-fit: contain;
        }

        .close {
          position: fixed;

          top: 20px;
          right: 25px;

          width: 45px;
          height: 45px;

          border: 1px solid #555;

          background: #101511;

          color: white;

          font-size: 28px;

          cursor: pointer;
        }

        .fullscreenTitle {
          position: fixed;

          left: 25px;
          bottom: 20px;

          color: #e7a93b;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 3px;
        }

        @media (max-width: 900px) {

          .gallery {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .galleryImage {
            height: 240px;
          }

          .fullscreen {
            padding: 15px;
          }

          .fullscreen img {
            max-width: 96vw;

            max-height: 85vh;
          }

        }

      `}</style>
    </>
  );
}