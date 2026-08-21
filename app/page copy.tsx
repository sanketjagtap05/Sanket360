import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const { data: forts } = await supabase
    .from("forts")
    .select("id, name, location, history")
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
        <p className="label">EXPLORE • EXPERIENCE • PRESERVE</p>

        <h1>
          Maharashtra
          <br />
          Forts
        </h1>

        <p className="heroText">
          महाराष्ट्रातील ऐतिहासिक किल्ले, त्यांचा इतिहास,
          trekking आणि digital experiences एका ठिकाणी.
        </p>

        <Link href="/Forts" className="button">
          Explore Forts →
        </Link>
      </section>

      <section className="about">
        <p className="label">SANKET360</p>

        <h2>सह्याद्रीचा इतिहास Digital स्वरूपात.</h2>

        <p>
          महाराष्ट्रातील ऐतिहासिक किल्ले, त्यांचा इतिहास
          आणि digital experiences एका platform वर.
        </p>
      </section>

      <section className="fortSection">

        <div className="sectionHeader">
          <div>
            <p className="label">FORTS OF MAHARASHTRA</p>
            <h2>Explore Forts</h2>
          </div>

          <Link href="/Forts" className="viewAll">
            View All →
          </Link>
        </div>

        <div className="grid">
          {forts?.map((fort) => (
            <Link
              key={fort.id}
              href={`/Forts/${fort.id}`}
              className="card"
            >
              <div className="icon">🏰</div>

              <p className="number">
                FORT {String(fort.id).padStart(2, "0")}
              </p>

              <h3>{fort.name}</h3>

              {fort.location && (
                <p className="location">
                  📍 {fort.location}
                </p>
              )}

              {fort.history && (
                <p className="history">
                  {fort.history.length > 120
                    ? fort.history.slice(0, 120) + "..."
                    : fort.history}
                </p>
              )}

              <span className="explore">
                EXPLORE →
              </span>
            </Link>
          ))}
        </div>

      </section>

      <section className="experience">
        <p className="label">360° EXPERIENCE</p>

        <h2>
          Explore. Experience. Preserve.
        </h2>

        <p>
          Insta360 X3 photographs आणि digital information
          वापरून किल्ल्यांचा immersive experience.
        </p>

        <Link href="/Forts" className="button">
          Start Exploring →
        </Link>
      </section>

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

        .navbar {
          min-height: 72px;
          padding: 18px 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          gap: 25px;
        }

        .navLinks a {
          color: #ccc;
          text-decoration: none;
        }

        .navLinks a:hover {
          color: #e7a93b;
        }

        .hero {
          min-height: 620px;
          padding: 100px 7%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          background:
            radial-gradient(
              circle at 75% 35%,
              rgba(231,169,59,0.16),
              transparent 35%
            ),
            linear-gradient(135deg, #17231c, #080b09);
        }

        .label {
          color: #e7a93b;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .hero h1 {
          margin: 20px 0;
          font-size: clamp(60px, 10vw, 130px);
          line-height: 0.9;
          letter-spacing: -4px;
        }

        .heroText {
          max-width: 650px;
          color: #b6beb8;
          font-size: 18px;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .button {
          width: fit-content;
          padding: 14px 22px;
          background: #e7a93b;
          color: #111;
          text-decoration: none;
          font-weight: 800;
          border-radius: 7px;
        }

        .about {
          max-width: 1100px;
          margin: auto;
          padding: 100px 7%;
        }

        .about h2 {
          margin: 15px 0 25px;
          font-size: clamp(38px, 6vw, 65px);
          line-height: 1;
        }

        .about p:last-child {
          max-width: 750px;
          color: #aeb6b0;
          font-size: 18px;
          line-height: 1.8;
        }

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
          font-size: clamp(38px, 6vw, 65px);
        }

        .viewAll {
          color: #e7a93b;
          text-decoration: none;
          font-weight: bold;
        }

        .grid {
          max-width: 1200px;
          margin: 35px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .card {
          min-height: 300px;
          padding: 28px;
          background: #111713;
          border: 1px solid #303832;
          color: white;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
          border-color: #e7a93b;
        }

        .icon {
          font-size: 42px;
        }

        .number {
          margin-top: 22px;
          color: #e7a93b;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .card h3 {
          margin: 8px 0;
          font-size: 30px;
        }

        .location {
          color: #c4cbc6;
        }

        .history {
          color: #8f9891;
          line-height: 1.6;
        }

        .explore {
          margin-top: auto;
          padding-top: 20px;
          color: #e7a93b;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .experience {
          padding: 110px 7%;
          text-align: center;
          background: #17231c;
        }

        .experience h2 {
          margin: 15px 0 25px;
          font-size: clamp(38px, 6vw, 65px);
        }

        .experience p:not(.label) {
          max-width: 650px;
          margin: 0 auto 30px;
          color: #adb6b0;
          line-height: 1.8;
        }

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

        @media (max-width: 800px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .navbar {
            flex-direction: column;
            gap: 15px;
          }

          .hero {
            min-height: 550px;
            padding: 70px 6%;
          }

          .hero h1 {
            font-size: 65px;
          }

          .about,
          .fortSection,
          .experience {
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
        }
      `}</style>

    </main>
  );
}