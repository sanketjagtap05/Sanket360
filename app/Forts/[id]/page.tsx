import Link from "next/link";
import { supabase } from "@/lib/supabase";
import GPXMapClient from "@/app/components/GPXMapClient";

export default async function FortDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fortId = Number(id);

  const { data: fort, error } = await supabase
    .from("forts")
    .select("*")
    .eq("id", fortId)
    .single();

  if (error || !fort) {
    return (
      <main className="notFound">
        <div className="notFoundBox">
          <p className="sectionLabel">SANKET360</p>
          <h1>Fort Not Found</h1>
          <p>हा किल्ला सापडला नाही.</p>
          <Link href="/Forts">← Back to Forts</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">

      {/* NAVBAR */}
      <nav className="navbar">
        <Link href="/" className="logo">
          SANKET<span>360</span>
        </Link>

        <div className="navLinks">
          <Link href="/">Home</Link>
          <Link href="/Forts">Forts</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        {fort.photos_url && (
          <img
            src={fort.photos_url}
            alt={fort.name}
            className="heroImage"
          />
        )}

        <div className="heroOverlay" />

        <div className="heroContent">

          <p className="eyebrow">
            SANKET360 • FORT EXPLORER
          </p>

          <h1>{fort.name}</h1>

          {fort.location && (
            <p className="heroLocation">
              📍 {fort.location}
            </p>
          )}

          <p className="heroText">
            Explore the history, stories, trekking routes
            and digital experiences of Maharashtra's
            legendary forts.
          </p>

          <div className="heroButtons">

            {fort.gpx_url && (
              <a
                href="#trek-route"
                className="primaryButton"
              >
                🗺️ Explore Trek Route
              </a>
            )}

            {fort.photos_360_url && (
              <a
                href={fort.photos_360_url}
                target="_blank"
                rel="noopener noreferrer"
                className="secondaryButton"
              >
                🌐 360° Experience
              </a>
            )}

          </div>

        </div>

      </section>

      {/* QUICK INFO */}
      <section className="quickInfo">

        <div className="infoCard">
          <span className="infoIcon">🏰</span>
          <small>FORT</small>
          <strong>Historic Heritage</strong>
        </div>

        <div className="infoCard">
          <span className="infoIcon">📍</span>
          <small>LOCATION</small>
          <strong>
            {fort.location || "Maharashtra"}
          </strong>
        </div>

        <div className="infoCard">
          <span className="infoIcon">🗺️</span>
          <small>TREK ROUTE</small>
          <strong>
            {fort.gpx_url ? "Available" : "Coming Soon"}
          </strong>
        </div>

        <div className="infoCard">
          <span className="infoIcon">🌐</span>
          <small>360° EXPERIENCE</small>
          <strong>
            {fort.photos_360_url
              ? "Available"
              : "Coming Soon"}
          </strong>
        </div>

      </section>

      {/* HISTORY */}
      {fort.history && (
        <section className="section">

          <p className="sectionLabel">
            01 • HISTORY
          </p>

          <h2>
            The Story Behind {fort.name}
          </h2>

          <p className="description">
            {fort.history}
          </p>

        </section>
      )}

      {/* WHAT TO SEE */}
      {fort.what_to_see && (
        <section className="section darkSection">

          <p className="sectionLabel">
            02 • EXPLORE
          </p>

          <h2>
            What to See at {fort.name}
          </h2>

          <p className="description">
            {fort.what_to_see}
          </p>

        </section>
      )}

      {/* TREKKING ROUTE */}
      {fort.gpx_url && (
        <section
          className="section trekSection"
          id="trek-route"
        >

          <div className="trekHeader">

            <div>
              <p className="sectionLabel">
                03 • TREKKING ROUTE
              </p>

              <h2>
                Trek Route
              </h2>

              <p className="description">
                Explore the actual trekking route directly
                on the interactive map. Zoom, pan and
                follow the route without downloading the
                GPX file.
              </p>
            </div>

            <div className="routeBadge">
              <span>LIVE ROUTE</span>
              <strong>●</strong>
            </div>

          </div>

          <div className="mapWrapper">
            <GPXMapClient url={fort.gpx_url} />
          </div>

        </section>
      )}

      {/* EXPERIENCE */}
      <section className="section experienceSection">

        <p className="sectionLabel">
          04 • EXPERIENCE
        </p>

        <h2>
          Explore {fort.name}
        </h2>

        <div className="mediaGrid">

          {fort.photos_url && (
            <a
              href={fort.photos_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mediaCard"
            >
              <span>📷</span>

              <h3>
                Photo Gallery
              </h3>

              <p>
                View photographs from the fort.
              </p>

              <b>
                OPEN GALLERY →
              </b>
            </a>
          )}

          {fort.photos_360_url && (
            <a
              href={fort.photos_360_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mediaCard"
            >
              <span>🌐</span>

              <h3>
                360° Experience
              </h3>

              <p>
                Explore the fort in immersive 360°.
              </p>

              <b>
                EXPLORE 360° →
              </b>
            </a>
          )}

          {fort.video_url && (
            <a
              href={fort.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mediaCard"
            >
              <span>🎥</span>

              <h3>
                Videos
              </h3>

              <p>
                Watch the fort experience.
              </p>

              <b>
                WATCH VIDEO →
              </b>
            </a>
          )}

          {fort.gpx_url && (
            <a
              href="#trek-route"
              className="mediaCard"
            >
              <span>🗺️</span>

              <h3>
                Trek Route
              </h3>

              <p>
                View the live trekking route on the map.
              </p>

              <b>
                VIEW ROUTE →
              </b>
            </a>
          )}

        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <p className="sectionLabel">
          SANKET360
        </p>

        <h2>
          Explore.
          <br />
          Experience.
          <br />
          Preserve.
        </h2>

        <p>
          सह्याद्रीचा इतिहास Digital स्वरूपात.
        </p>

        <Link
          href="/Forts"
          className="ctaButton"
        >
          EXPLORE MORE FORTS →
        </Link>

      </section>

      {/* FOOTER */}
      <footer>

        <div className="footerLogo">
          SANKET<span>360</span>
        </div>

        <p>
          EXPLORE • EXPERIENCE • PRESERVE
        </p>

        <Link href="/Forts">
          ← Explore More Forts
        </Link>

        <small>
          © 2026 SANKET360
        </small>

      </footer>

      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .page {
          min-height: 100vh;
          background: #070a08;
          color: #f4f4f1;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        /* NAVBAR */

        .navbar {
          height: 76px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(7,10,8,0.96);
          border-bottom: 1px solid #252c27;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }

        .logo,
        .footerLogo {
          color: white;
          font-size: 25px;
          font-weight: 900;
          letter-spacing: 3px;
          text-decoration: none;
        }

        .logo span,
        .footerLogo span {
          color: #e7a93b;
        }

        .navLinks {
          display: flex;
          gap: 28px;
        }

        .navLinks a {
          color: #cbd0cc;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }

        .navLinks a:hover {
          color: #e7a93b;
        }

        /* HERO */

        .hero {
          min-height: 650px;
          display: flex;
          align-items: flex-end;
          padding: 90px 7%;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              #121814,
              #080b09
            );
          border-bottom: 1px solid #252c27;
        }

        .heroImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.55;
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(7,10,8,0.15),
              rgba(7,10,8,0.95)
            );
        }

        .heroContent {
          max-width: 950px;
          position: relative;
          z-index: 2;
        }

        .eyebrow,
        .sectionLabel {
          color: #e7a93b;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 4px;
        }

        .hero h1 {
          margin: 18px 0 12px;
          font-size: clamp(60px, 10vw, 135px);
          line-height: 0.9;
          letter-spacing: -5px;
        }

        .heroLocation {
          font-size: 20px;
          color: #d3d8d4;
        }

        .heroText {
          max-width: 650px;
          color: #aeb6b0;
          line-height: 1.8;
          font-size: 17px;
        }

        .heroButtons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .primaryButton,
        .secondaryButton {
          padding: 14px 20px;
          text-decoration: none;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .primaryButton {
          background: #e7a93b;
          color: #111;
        }

        .secondaryButton {
          border: 1px solid #e7a93b;
          color: #e7a93b;
          background: rgba(0,0,0,0.3);
        }

        .primaryButton:hover {
          background: #f0b84e;
        }

        .secondaryButton:hover {
          background: #e7a93b;
          color: #111;
        }

        /* QUICK INFO */

        .quickInfo {
          max-width: 1100px;
          margin: -45px auto 0;
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #303832;
          background: #101511;
          box-shadow:
            0 20px 60px rgba(0,0,0,0.35);
        }

        .infoCard {
          padding: 25px;
          border-right: 1px solid #303832;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .infoCard:last-child {
          border-right: none;
        }

        .infoIcon {
          font-size: 25px;
        }

        .infoCard small {
          color: #e7a93b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .infoCard strong {
          color: #d5dad6;
          font-size: 14px;
          line-height: 1.4;
        }

        /* SECTIONS */

        .section {
          max-width: 1100px;
          margin: auto;
          padding: 110px 7%;
        }

        .darkSection {
          max-width: none;
          background: #0e1310;
        }

        .section h2 {
          max-width: 850px;
          margin: 15px 0 25px;
          font-size: clamp(38px, 6vw, 65px);
          line-height: 1;
          letter-spacing: -2px;
        }

        .description {
          max-width: 850px;
          color: #c4cbc6;
          font-size: 18px;
          line-height: 1.9;
          white-space: pre-line;
        }

        /* TREK */

        .trekSection {
          max-width: none;
          background:
            linear-gradient(
              180deg,
              #080b09,
              #0e1310
            );
        }

        .trekHeader {
          max-width: 1100px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 30px;
        }

        .routeBadge {
          padding: 12px 16px;
          border: 1px solid #303832;
          background: #101511;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .routeBadge span {
          color: #aeb6b0;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .routeBadge strong {
          color: #65d47c;
          font-size: 14px;
        }

        .mapWrapper {
          max-width: 1100px;
          margin: 45px auto 0;
          border: 1px solid #303832;
          background: #101511;
          overflow: hidden;
        }

        /* MEDIA */

        .experienceSection {
          background: #0b0f0c;
        }

        .mediaGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 40px;
        }

        .mediaCard {
          min-height: 230px;
          padding: 32px;
          border: 1px solid #303832;
          background: #101511;
          text-decoration: none;
          color: white;
          transition: 0.25s ease;
        }

        .mediaCard:hover {
          transform: translateY(-6px);
          border-color: #e7a93b;
        }

        .mediaCard span {
          font-size: 35px;
        }

        .mediaCard h3 {
          margin: 20px 0 8px;
          font-size: 24px;
        }

        .mediaCard p {
          color: #9fa8a1;
          line-height: 1.6;
        }

        .mediaCard b {
          display: inline-block;
          margin-top: 20px;
          color: #e7a93b;
          font-size: 11px;
          letter-spacing: 2px;
        }

        /* CTA */

        .cta {
          padding: 130px 7%;
          text-align: center;
          background:
            radial-gradient(
              circle at center,
              rgba(231,169,59,0.12),
              transparent 45%
            ),
            #142019;
        }

        .cta h2 {
          margin: 20px 0;
          font-size: clamp(50px, 8vw, 100px);
          line-height: 0.88;
          letter-spacing: -4px;
        }

        .cta > p:not(.sectionLabel) {
          color: #aeb6b0;
          margin-bottom: 30px;
        }

        .ctaButton {
          display: inline-block;
          padding: 15px 22px;
          background: #e7a93b;
          color: #111;
          text-decoration: none;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        /* FOOTER */

        footer {
          padding: 65px 7%;
          text-align: center;
          border-top: 1px solid #29312c;
          background: #060806;
        }

        footer p {
          color: #777f79;
          font-size: 10px;
          letter-spacing: 3px;
          margin: 15px 0 25px;
        }

        footer a {
          color: #e7a93b;
          text-decoration: none;
        }

        footer small {
          display: block;
          margin-top: 30px;
          color: #4f5651;
        }

        /* NOT FOUND */

        .notFound {
          min-height: 100vh;
          background: #080b09;
          color: white;
          padding: 100px 7%;
        }

        .notFoundBox {
          max-width: 700px;
        }

        .notFound h1 {
          font-size: 60px;
        }

        .notFound a {
          color: #e7a93b;
          text-decoration: none;
        }

        /* MOBILE */

        @media (max-width: 750px) {

          .navbar {
            height: auto;
            padding: 18px 6%;
            flex-direction: column;
            gap: 16px;
          }

          .navLinks {
            gap: 18px;
          }

          .hero {
            min-height: 560px;
            padding: 65px 6%;
          }

          .hero h1 {
            font-size: 65px;
            letter-spacing: -3px;
          }

          .heroText {
            font-size: 16px;
          }

          .quickInfo {
            margin: 0;
            grid-template-columns: repeat(2, 1fr);
          }

          .infoCard {
            border-bottom: 1px solid #303832;
          }

          .infoCard:nth-child(2) {
            border-right: none;
          }

          .infoCard:nth-child(3) {
            border-bottom: none;
          }

          .infoCard:nth-child(4) {
            border-right: none;
            border-bottom: none;
          }

          .section {
            padding: 75px 6%;
          }

          .trekHeader {
            flex-direction: column;
          }

          .mediaGrid {
            grid-template-columns: 1fr;
          }

          .cta {
            padding: 90px 6%;
          }

          .cta h2 {
            font-size: 55px;
          }
        }

      `}</style>

    </main>
  );
}