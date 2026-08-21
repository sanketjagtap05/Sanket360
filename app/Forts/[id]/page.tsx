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
        <h1>Fort Not Found</h1>
        <Link href="/Forts">← Back to Forts</Link>
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

        <div className="heroContent">
          <p className="eyebrow">
            SANKET360 • FORT EXPLORER
          </p>

          <h1>{fort.name}</h1>

          {fort.location && (
            <p className="location">
              📍 {fort.location}
            </p>
          )}

          <p className="heroText">
            Explore the history, stories, views and experiences
            of Maharashtra's legendary forts.
          </p>
        </div>

      </section>

      {/* QUICK INFO */}
      <section className="quickInfo">

        <div>
          <span>🏰</span>
          <strong>FORT</strong>
          <small>Historic Heritage</small>
        </div>

        <div>
          <span>📍</span>
          <strong>LOCATION</strong>
          <small>{fort.location || "Maharashtra"}</small>
        </div>

        <div>
          <span>🌐</span>
          <strong>360°</strong>
          <small>Explore Virtually</small>
        </div>

        <div>
          <span>🗺️</span>
          <strong>GPX</strong>
          <small>Trek Route</small>
        </div>

      </section>

      {/* HISTORY */}
      {fort.history && (
        <section className="section">

          <p className="sectionLabel">01 • HISTORY</p>

          <h2>The Story Behind {fort.name}</h2>

          <p className="description">
            {fort.history}
          </p>

        </section>
      )}

      {/* WHAT TO SEE */}
      {fort.what_to_see && (
        <section className="section darkSection">

          <p className="sectionLabel">02 • EXPLORE</p>

          <h2>What to See</h2>

          <p className="description">
            {fort.what_to_see}
          </p>

        </section>
      )}

{/* TREKKING ROUTE MAP */}
{fort.gpx_url && (
  <section className="section darkSection">

    <p className="sectionLabel">
      03 • TREKKING ROUTE
    </p>

    <h2>
      Trek Route of {fort.name}
    </h2>

    <p className="description">
      Explore the actual trekking route directly on the map.
      Zoom, pan and follow the route without downloading the GPX file.
    </p>

    <div style={{ marginTop: "40px" }}>
      <GPXMapClient url={fort.gpx_url} />
    </div>

  </section>
)}
      {/* MEDIA */}
      <section className="section">

        <p className="sectionLabel">03 • EXPERIENCE</p>

        <h2>Explore {fort.name}</h2>

        <div className="mediaGrid">

          {fort.photos_url && (
            <a
              href={fort.photos_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mediaCard"
            >
              <span>📷</span>
              <h3>Photo Gallery</h3>
              <p>View normal photographs</p>
              <b>OPEN GALLERY →</b>
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
              <h3>360° Experience</h3>
              <p>Explore the fort in 360°</p>
              <b>EXPLORE 360° →</b>
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
              <h3>Videos</h3>
              <p>Watch the fort experience</p>
              <b>WATCH VIDEO →</b>
            </a>
          )}

          {fort.gpx_url && (
            <a
              href={fort.gpx_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mediaCard"
            >
              <span>🗺️</span>
              <h3>GPX Trek Route</h3>
              <p>Explore the trekking route</p>
              <b>OPEN GPX →</b>
            </a>
          )}

        </div>

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

      </footer>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #080b09;
          color: #f4f4f1;
        }

        .navbar {
          height: 76px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #252c27;
          background: #080b09;
        }

        .logo,
        .footerLogo {
          color: white;
          font-size: 25px;
          font-weight: 800;
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
          font-size: 14px;
        }

        .navLinks a:hover {
          color: #e7a93b;
        }

        .hero {
          min-height: 570px;
          display: flex;
          align-items: flex-end;
          padding: 80px 7%;
          position: relative;
          background:
            radial-gradient(
              circle at 70% 35%,
              rgba(231,169,59,0.16),
              transparent 35%
            ),
            linear-gradient(
              180deg,
              #121814 0%,
              #080b09 100%
            );
          border-bottom: 1px solid #252c27;
        }

        .heroContent {
          max-width: 900px;
        }

        .eyebrow,
        .sectionLabel {
          color: #e7a93b;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 4px;
        }

        .hero h1 {
          margin: 18px 0 10px;
          font-size: clamp(60px, 10vw, 130px);
          line-height: 0.95;
          letter-spacing: -4px;
        }

        .location {
          font-size: 20px;
          color: #d0d5d1;
        }

        .heroText {
          max-width: 650px;
          color: #9da59f;
          line-height: 1.7;
          font-size: 17px;
        }

        .quickInfo {
          max-width: 1100px;
          margin: -45px auto 0;
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #303832;
          background: #101511;
        }

        .quickInfo div {
          padding: 25px;
          border-right: 1px solid #303832;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .quickInfo div:last-child {
          border-right: none;
        }

        .quickInfo span {
          font-size: 24px;
        }

        .quickInfo strong {
          color: #e7a93b;
          font-size: 12px;
          letter-spacing: 2px;
        }

        .quickInfo small {
          color: #aab1ac;
        }

        .section {
          max-width: 1100px;
          margin: auto;
          padding: 100px 7%;
        }

        .darkSection {
          max-width: none;
          background: #0e1310;
        }

        .section h2 {
          max-width: 850px;
          margin: 15px 0 25px;
          font-size: clamp(35px, 5vw, 60px);
          line-height: 1.05;
        }

        .description {
          max-width: 850px;
          color: #c4cbc6;
          font-size: 18px;
          line-height: 1.9;
          white-space: pre-line;
        }

        .mediaGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 40px;
        }

        .mediaCard {
          min-height: 220px;
          padding: 32px;
          border: 1px solid #303832;
          background: #101511;
          text-decoration: none;
          color: white;
          transition: 0.25s ease;
        }

        .mediaCard:hover {
          transform: translateY(-5px);
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
        }

        .mediaCard b {
          display: inline-block;
          margin-top: 20px;
          color: #e7a93b;
          font-size: 12px;
          letter-spacing: 2px;
        }

        footer {
          padding: 60px 7%;
          border-top: 1px solid #252c27;
          text-align: center;
        }

        footer p {
          color: #777f79;
          letter-spacing: 3px;
          font-size: 11px;
          margin: 15px 0 25px;
        }

        footer a {
          color: #e7a93b;
          text-decoration: none;
        }

        .notFound {
          min-height: 100vh;
          background: #080b09;
          color: white;
          padding: 100px 7%;
        }

        .notFound a {
          color: #e7a93b;
        }

        @media (max-width: 750px) {

          .navbar {
            height: auto;
            padding: 20px 6%;
            flex-direction: column;
            gap: 18px;
          }

          .navLinks {
            gap: 16px;
          }

          .hero {
            min-height: 480px;
            padding: 60px 6%;
          }

          .hero h1 {
            font-size: 65px;
            letter-spacing: -2px;
          }

          .quickInfo {
            margin: 0;
            grid-template-columns: repeat(2, 1fr);
          }

          .quickInfo div {
            border-bottom: 1px solid #303832;
          }

          .section {
            padding: 70px 6%;
          }

          .mediaGrid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </main>
  );
}