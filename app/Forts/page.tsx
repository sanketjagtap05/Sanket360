import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SahyadriMapWrapper from "@/app/components/SahyadriMapWrapper";

export default async function FortsPage() {
  const { data: forts, error } = await supabase
    .from("forts")
    .select(
      "id, name, location, history, photos_url, photos_360_url, video_url, gpx_url, latitude, longitude"
    )
    .order("id", { ascending: true });

  return (
    <main className="page">

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

      <section className="hero">
        <div className="heroGlow" />

        <div className="heroContent">
          <p className="eyebrow">
            SANKET360 • SAHYADRI FORT EXPLORER
          </p>

          <h1>
            Explore
            <br />
            Maharashtra
            <br />
            <span>Forts.</span>
          </h1>

          <p className="heroText">
            महाराष्ट्रातील ऐतिहासिक किल्ले, त्यांचा इतिहास,
            trekking routes आणि immersive digital experiences
            एका ठिकाणी.
          </p>

          <div className="heroStats">
            <div>
              <strong>{forts?.length || 0}</strong>
              <span>FORTS</span>
            </div>

            <div>
              <strong>360°</strong>
              <span>EXPERIENCE</span>
            </div>

            <div>
              <strong>GPX</strong>
              <span>TREK ROUTES</span>
            </div>
          </div>
        </div>
      </section>

      <section className="fortSection" id="forts">

        <div className="sectionHeader">
          <div>
            <p className="sectionLabel">
              FORTS OF MAHARASHTRA
            </p>

            <h2>Explore Forts</h2>

            <p className="sectionIntro">
              Discover the stories, trekking routes and
              digital experiences hidden across the Sahyadri.
            </p>
          </div>

          <div className="countBox">
            <strong>{forts?.length || 0}</strong>
            <span>FORTS</span>
          </div>
        </div>

        {error ? (
          <div className="message errorMessage">
            <strong>Forts load करताना error आला.</strong>
            <p>{error.message}</p>
          </div>
        ) : forts && forts.length > 0 ? (
          <div className="grid">

            {forts.map((fort, index) => (
              <Link
                key={fort.id}
                href={`/Forts/${fort.id}`}
                className="card"
              >

                <div className="imageBox">

                  {fort.photos_url ? (
                    <img
                      src={fort.photos_url}
                      alt={fort.name}
                    />
                  ) : (
                    <div className="imageFallback">
                      🏰
                    </div>
                  )}

                  <div className="imageOverlay" />

                  <div className="fortNumber">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="openBadge">
                    EXPLORE →
                  </div>
                </div>

                <div className="cardContent">

                  <p className="cardLabel">
                    SAHYADRI FORT
                  </p>

                  <h3>{fort.name}</h3>

                  {fort.location && (
                    <p className="location">
                      📍 {fort.location}
                    </p>
                  )}

                  {fort.history && (
                    <p className="history">
                      {fort.history.length > 130
                        ? fort.history.slice(0, 130) + "..."
                        : fort.history}
                    </p>
                  )}

                  <div className="badges">

                    {fort.gpx_url && (
                      <span className="badge">
                        🗺️ GPX
                      </span>
                    )}

                    {fort.photos_360_url && (
                      <span className="badge">
                        🌐 360°
                      </span>
                    )}

                    {fort.photos_url && (
                      <span className="badge">
                        📷 PHOTOS
                      </span>
                    )}

                    {fort.video_url && (
                      <span className="badge">
                        🎥 VIDEO
                      </span>
                    )}

                  </div>

                  <div className="cardFooter">
                    <span>VIEW FORT</span>
                    <span className="arrow">→</span>
                  </div>

                </div>

              </Link>
            ))}

          </div>
        ) : (
          <div className="message">
            अजून कोणताही किल्ला जोडलेला नाही.
          </div>
        )}

      </section>

      {/* SAHYADRI MAP */}
      <SahyadriMapWrapper forts={forts || []} />

      <section className="experience">

        <p className="sectionLabel">
          DIGITAL SAHYADRI
        </p>

        <h2>
          Explore.
          <br />
          Experience.
          <br />
          Preserve.
        </h2>

        <p>
          इतिहासापासून trekking route पर्यंत आणि
          360° experiences पासून digital exploration
          पर्यंत — Sahyadri एका नवीन स्वरूपात.
        </p>

        <Link
          href="#forts"
          className="experienceButton"
        >
          START EXPLORING ↓
        </Link>

      </section>

      <footer>

        <div className="footerLogo">
          SANKET<span>360</span>
        </div>

        <p>
          EXPLORE • EXPERIENCE • PRESERVE
        </p>

        <Link href="/">
          ← Back to Home
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
          font-family: Arial, Helvetica, sans-serif;
        }

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
          color: #c4cbc6;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .navLinks a:hover {
          color: #e7a93b;
        }

        .hero {
          min-height: 650px;
          padding: 100px 7%;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              #142019 0%,
              #080b09 55%,
              #101710 100%
            );
          border-bottom: 1px solid #252c27;
        }

        .heroGlow {
          position: absolute;
          width: 600px;
          height: 600px;
          right: -180px;
          top: -100px;
          border-radius: 50%;
          background: rgba(231,169,59,0.12);
          filter: blur(100px);
        }

        .heroContent {
          max-width: 1000px;
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
          margin: 25px 0;
          font-size: clamp(65px, 10vw, 135px);
          line-height: 0.88;
          letter-spacing: -6px;
        }

        .hero h1 span {
          color: #e7a93b;
        }

        .heroText {
          max-width: 650px;
          color: #aeb6b0;
          font-size: 18px;
          line-height: 1.8;
        }

        .heroStats {
          margin-top: 45px;
          display: flex;
        }

        .heroStats div {
          min-width: 130px;
          padding-right: 35px;
          margin-right: 35px;
          border-right: 1px solid #384039;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .heroStats div:last-child {
          border: none;
        }

        .heroStats strong {
          font-size: 25px;
          color: #f0f0ec;
        }

        .heroStats span {
          color: #777f79;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: 800;
        }

        .fortSection {
          padding: 110px 7%;
          background: #0b0f0c;
        }

        .sectionHeader {
          max-width: 1250px;
          margin: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }

        .sectionHeader h2 {
          margin: 15px 0;
          font-size: clamp(42px, 6vw, 70px);
          line-height: 0.95;
          letter-spacing: -3px;
        }

        .sectionIntro {
          max-width: 600px;
          color: #8f9891;
          line-height: 1.7;
        }

        .countBox {
          border: 1px solid #303832;
          background: #101511;
          padding: 20px 28px;
          display: flex;
          flex-direction: column;
          min-width: 100px;
        }

        .countBox strong {
          font-size: 35px;
          color: #e7a93b;
        }

        .countBox span {
          color: #777f79;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .grid {
          max-width: 1250px;
          margin: 55px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .card {
          background: #101511;
          border: 1px solid #303832;
          color: white;
          text-decoration: none;
          overflow: hidden;
          transition: 0.3s ease;
        }

        .card:hover {
          transform: translateY(-8px);
          border-color: #e7a93b;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        .imageBox {
          height: 260px;
          position: relative;
          overflow: hidden;
          background: #18201b;
        }

        .imageBox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .card:hover .imageBox img {
          transform: scale(1.06);
        }

        .imageFallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 75px;
          background: #18201b;
        }

        .imageOverlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(0,0,0,0.05),
              rgba(0,0,0,0.75)
            );
        }

        .fortNumber {
          position: absolute;
          top: 18px;
          left: 18px;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,0.4);
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 900;
        }

        .openBadge {
          position: absolute;
          bottom: 18px;
          right: 18px;
          padding: 9px 12px;
          background: #e7a93b;
          color: #111;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .cardContent {
          padding: 25px;
        }

        .cardLabel {
          color: #e7a93b;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        .card h3 {
          margin: 9px 0;
          font-size: 30px;
        }

        .location {
          color: #c3cac5;
          font-size: 13px;
          margin: 10px 0;
        }

        .history {
          color: #8f9891;
          font-size: 14px;
          line-height: 1.65;
          min-height: 47px;
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 18px;
        }

        .badge {
          padding: 6px 8px;
          border: 1px solid #303832;
          background: #0b0f0c;
          color: #aeb6b0;
          font-size: 9px;
          font-weight: 800;
        }

        .cardFooter {
          margin-top: 25px;
          padding-top: 18px;
          border-top: 1px solid #29312c;
          display: flex;
          justify-content: space-between;
          color: #e7a93b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .arrow {
          font-size: 20px;
        }

        .message {
          max-width: 1250px;
          margin: 40px auto;
          padding: 25px;
          border: 1px solid #303832;
          background: #101511;
          color: #bfc6c1;
        }

        .errorMessage {
          border-color: #704545;
        }

        .message p {
          color: #777f79;
        }

        .experience {
          padding: 130px 7%;
          text-align: center;
          background:
            radial-gradient(
              circle at center,
              rgba(231,169,59,0.1),
              transparent 40%
            ),
            #142019;
        }

        .experience h2 {
          margin: 20px 0 30px;
          font-size: clamp(50px, 8vw, 100px);
          line-height: 0.9;
          letter-spacing: -4px;
        }

        .experience > p:not(.sectionLabel) {
          max-width: 650px;
          margin: 0 auto 35px;
          color: #aeb6b0;
          line-height: 1.8;
        }

        .experienceButton {
          display: inline-block;
          padding: 14px 22px;
          border: 1px solid #e7a93b;
          color: #e7a93b;
          text-decoration: none;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

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

        @media (max-width: 950px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sectionHeader {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 600px) {
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
            min-height: 600px;
            padding: 80px 6%;
          }

          .hero h1 {
            font-size: 65px;
            letter-spacing: -3px;
          }

          .heroText {
            font-size: 16px;
          }

          .heroStats {
            flex-wrap: wrap;
            gap: 20px;
          }

          .heroStats div {
            min-width: 90px;
            padding-right: 15px;
            margin-right: 0;
          }

          .fortSection {
            padding: 75px 6%;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .imageBox {
            height: 230px;
          }

          .card h3 {
            font-size: 27px;
          }

          .experience {
            padding: 90px 6%;
          }

          .experience h2 {
            font-size: 55px;
          }
        }

      `}</style>

    </main>
  );
}