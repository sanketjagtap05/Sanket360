import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function FortsPage() {
  const { data: forts, error } = await supabase
    .from("forts")
    .select(
      "id, name, location, history, photos_url, photos_360_url, video_url, gpx_url"
    )
    .order("id", { ascending: true });

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
        <p className="label">SANKET360 • SAHYADRI</p>

        <h1>
          Explore
          <br />
          Forts.
        </h1>

        <p className="heroText">
          महाराष्ट्रातील ऐतिहासिक किल्ले, त्यांचा इतिहास,
          trekking routes आणि immersive digital experiences
          एका ठिकाणी.
        </p>
      </section>

      {/* FORTS */}
      <section className="fortSection">
        <div className="sectionHeader">
          <div>
            <p className="label">FORTS OF MAHARASHTRA</p>
            <h2>Explore Forts</h2>
          </div>

          <span className="count">
            {forts?.length || 0} FORTS
          </span>
        </div>

        {error ? (
          <div className="message">
            <h3>Forts load करताना error आला.</h3>
            <p>Supabase connection किंवा table तपासा.</p>
          </div>
        ) : forts && forts.length > 0 ? (
          <div className="grid">
            {forts.map((fort) => (
              <Link
                key={fort.id}
                href={`/Forts/${fort.id}`}
                className="card"
              >
                {/* CARD TOP */}
                <div className="cardTop">
                  <span className="fortIcon">🏰</span>

                  <span className="number">
                    FORT {String(fort.id).padStart(2, "0")}
                  </span>
                </div>

                {/* NAME */}
                <h3>{fort.name}</h3>

                {/* LOCATION */}
                {fort.location && (
                  <p className="location">
                    📍 {fort.location}
                  </p>
                )}

                {/* HISTORY */}
                {fort.history && (
                  <p className="history">
                    {fort.history.length > 150
                      ? fort.history.slice(0, 150) + "..."
                      : fort.history}
                  </p>
                )}

                {/* BADGES */}
                <div className="badges">
                  {fort.photos_360_url && (
                    <span className="badge">
                      🌐 360°
                    </span>
                  )}

                  {fort.gpx_url && (
                    <span className="badge">
                      🗺️ GPX
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

                {/* EXPLORE */}
                <div className="explore">
                  EXPLORE FORT
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="message">
            <h3>अजून कोणताही किल्ला जोडलेला नाही.</h3>
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="cta">
        <p className="label">SANKET360 EXPERIENCE</p>

        <h2>
          Explore.
          <br />
          Experience.
          <br />
          Preserve.
        </h2>

        <p>
          Sahyadri चा इतिहास digital स्वरूपात अनुभवण्यासाठी
          कोणताही किल्ला निवडा.
        </p>

        <Link href="/" className="button">
          Back to Home →
        </Link>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footerLogo">
          SANKET<span>360</span>
        </div>

        <p>EXPLORE • EXPERIENCE • PRESERVE</p>

        <p>© 2026 SANKET360</p>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #080b09;
        }

        .page {
          min-height: 100vh;
          background: #080b09;
          color: #f5f5f5;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* NAVBAR */

        .navbar {
          min-height: 74px;
          padding: 18px 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #080b09;
          border-bottom: 1px solid #29312c;
        }

        .logo,
        .footerLogo {
          color: white;
          text-decoration: none;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .logo span,
        .footerLogo span {
          color: #e7a93b;
        }

        .navLinks {
          display: flex;
          gap: 26px;
        }

        .navLinks a {
          color: #cbd0cc;
          text-decoration: none;
          font-size: 14px;
        }

        .navLinks a:hover {
          color: #e7a93b;
        }

        /* HERO */

        .hero {
          min-height: 520px;
          padding: 100px 7%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          background:
            radial-gradient(
              circle at 75% 35%,
              rgba(231, 169, 59, 0.16),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #17231c,
              #080b09
            );

          border-bottom: 1px solid #29312c;
        }

        .label {
          color: #e7a93b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .hero h1 {
          margin: 20px 0;
          font-size: clamp(65px, 11vw, 140px);
          line-height: 0.88;
          letter-spacing: -5px;
        }

        .heroText {
          max-width: 680px;
          color: #aeb7b0;
          font-size: 18px;
          line-height: 1.8;
        }

        /* FORT SECTION */

        .fortSection {
          padding: 90px 7%;
          background: #0d120f;
        }

        .sectionHeader {
          max-width: 1200px;
          margin: auto;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .sectionHeader h2 {
          margin: 15px 0 0;
          font-size: clamp(40px, 6vw, 70px);
          line-height: 1;
        }

        .count {
          color: #8f9891;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        /* GRID */

        .grid {
          max-width: 1200px;
          margin: 40px auto 0;

          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* CARD */

        .card {
          min-height: 350px;
          padding: 28px;

          display: flex;
          flex-direction: column;

          background:
            linear-gradient(
              145deg,
              #151c17,
              #0e130f
            );

          border: 1px solid #303832;

          color: white;
          text-decoration: none;

          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .card:hover {
          transform: translateY(-7px);
          border-color: #e7a93b;

          box-shadow:
            0 15px 40px rgba(0,0,0,0.35);
        }

        .cardTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .fortIcon {
          font-size: 42px;
        }

        .number {
          color: #e7a93b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .card h3 {
          margin: 28px 0 8px;
          font-size: 30px;
          line-height: 1.1;
        }

        .location {
          margin: 0 0 8px;
          color: #c6cdc8;
          font-size: 14px;
        }

        .history {
          color: #929b94;
          font-size: 14px;
          line-height: 1.65;
        }

        /* BADGES */

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 15px;
        }

        .badge {
          padding: 7px 9px;

          border: 1px solid #39433c;
          background: #0b0f0c;

          color: #b9c0ba;

          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        /* EXPLORE */

        .explore {
          margin-top: auto;
          padding-top: 25px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          color: #e7a93b;

          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .explore span {
          font-size: 20px;
        }

        /* MESSAGE */

        .message {
          max-width: 1200px;
          margin: 40px auto;
          padding: 30px;

          border: 1px solid #303832;
          background: #111713;
        }

        .message h3 {
          margin-top: 0;
        }

        .message p {
          color: #929b94;
        }

        /* CTA */

        .cta {
          padding: 110px 7%;
          text-align: center;
          background: #17231c;
        }

        .cta h2 {
          margin: 20px 0;

          font-size: clamp(50px, 8vw, 95px);
          line-height: 0.9;
          letter-spacing: -3px;
        }

        .cta > p:not(.label) {
          max-width: 650px;
          margin: 0 auto 30px;

          color: #aeb7b0;
          line-height: 1.8;
        }

        .button {
          display: inline-block;

          padding: 14px 22px;

          background: #e7a93b;
          color: #111;

          border-radius: 7px;

          text-decoration: none;
          font-weight: 800;
        }

        /* FOOTER */

        footer {
          padding: 60px 7%;

          text-align: center;

          border-top: 1px solid #29312c;

          background: #060806;
        }

        footer p {
          color: #777f79;
          font-size: 11px;
          letter-spacing: 2px;
          margin: 15px 0;
        }

        /* TABLET */

        @media (max-width: 900px) {

          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        /* MOBILE */

        @media (max-width: 600px) {

          .navbar {
            padding: 18px 6%;

            flex-direction: column;
            gap: 16px;
          }

          .navLinks {
            gap: 18px;
          }

          .hero {
            min-height: 500px;
            padding: 70px 6%;
          }

          .hero h1 {
            font-size: 65px;
            letter-spacing: -3px;
          }

          .fortSection {
            padding: 70px 6%;
          }

          .sectionHeader {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .card {
            min-height: 330px;
          }

          .cta {
            padding: 80px 6%;
          }

          .cta h2 {
            font-size: 55px;
          }

        }
      `}</style>
    </main>
  );
}