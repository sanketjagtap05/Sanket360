import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const { data: forts } = await supabase
    .from("forts")
    .select("id, name, location, history, photos_url")
    .order("id", { ascending: true })
    .limit(6);

  return (
    <main className="home">

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
            EXPLORE • EXPERIENCE • PRESERVE
          </p>

          <h1>
            Discover
            <br />
            Maharashtra.
          </h1>

          <p className="heroText">
            महाराष्ट्रातील किल्ले, सह्याद्री,
            इतिहास आणि 360° experiences
            एका digital platform वर.
          </p>

          <div className="buttons">

            <Link href="/Forts" className="primaryButton">
              Explore Forts →
            </Link>

            <a href="#about" className="secondaryButton">
              About SANKET360
            </a>

          </div>

        </div>

        <div className="heroVisual">
          <div className="circle">
            🏰
          </div>

          <p>
            SAHYADRI
            <br />
            MAHARASHTRA
          </p>
        </div>

      </section>

      {/* STATS */}
      <section className="stats">

        <div>
          <strong>{forts?.length || 0}</strong>
          <span>Forts</span>
        </div>

        <div>
          <strong>360°</strong>
          <span>Experiences</span>
        </div>

        <div>
          <strong>∞</strong>
          <span>Stories</span>
        </div>

      </section>

      {/* FEATURED FORTS */}
      <section className="fortSection">

        <div className="sectionHeading">

          <p className="sectionLabel">
            FEATURED
          </p>

          <h2>
            Explore the Forts
          </h2>

          <p>
            महाराष्ट्रातील ऐतिहासिक किल्ल्यांचा
            digital journey सुरू करा.
          </p>

        </div>

        <div className="fortGrid">

          {forts?.map((fort) => (

            <Link
              href={`/Forts/${fort.id}`}
              className="fortCard"
              key={fort.id}
            >

              <div className="fortImage">

                {fort.photos_url ? (

                  <img
                    src={fort.photos_url}
                    alt={fort.name}
                  />

                ) : (

                  <div className="placeholder">
                    🏰
                  </div>

                )}

                <span>
                  EXPLORE →
                </span>

              </div>

              <div className="fortContent">

                <p className="cardLabel">
                  FORT • MAHARASHTRA
                </p>

                <h3>
                  {fort.name}
                </h3>

                {fort.location && (
                  <p className="location">
                    📍 {fort.location}
                  </p>
                )}

                {fort.history && (
                  <p className="history">
                    {fort.history.length > 100
                      ? fort.history.slice(0, 100) + "..."
                      : fort.history}
                  </p>
                )}

              </div>

            </Link>

          ))}

        </div>

        <div className="allForts">

          <Link href="/Forts">
            View All Forts →
          </Link>

        </div>

      </section>

      {/* 360 EXPERIENCE */}
      <section className="experience">

        <div>

          <p className="sectionLabel">
            IMMERSIVE
          </p>

          <h2>
            Experience
            <br />
            the Forts in 360°
          </h2>

          <p>
            तुमच्या Insta360 X3 photographs
            वापरून महाराष्ट्रातील किल्ल्यांना
            digital experience मध्ये आणण्याचा
            प्रयत्न.
          </p>

          <Link href="/Forts" className="primaryButton">
            Start Exploring →
          </Link>

        </div>

        <div className="experienceIcon">
          🌐
        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="about">

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
          SANKET360 हा महाराष्ट्रातील किल्ले,
          पर्वत आणि सुंदर ठिकाणे digital
          photography, 360° technology आणि
          storytelling द्वारे explore करण्याचा
          प्रयत्न आहे.
        </p>

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
          Explore Forts →
        </Link>

        <small>
          © 2026 SANKET360
        </small>

      </footer>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .home {
          min-height: 100vh;
          background: #080b09;
          color: #f5f5f2;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* NAVBAR */

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
          text-decoration: none;
          font-size: 25px;
          font-weight: 800;
          letter-spacing: 3px;
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

        /* HERO */

        .hero {
          min-height: 650px;
          padding: 90px 8%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 50px;
          background:
            radial-gradient(
              circle at 75% 40%,
              rgba(231,169,59,.15),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #111a14,
              #080b09 70%
            );
        }

        .heroContent {
          max-width: 750px;
        }

        .eyebrow,
        .sectionLabel,
        .cardLabel {
          color: #e7a93b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 4px;
        }

        .hero h1 {
          margin: 20px 0;
          font-size: clamp(65px, 10vw, 130px);
          line-height: .9;
          letter-spacing: -5px;
        }

        .heroText {
          max-width: 650px;
          color: #a5aea8;
          font-size: 19px;
          line-height: 1.8;
        }

        .buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-top: 35px;
        }

        .primaryButton,
        .secondaryButton {
          display: inline-block;
          padding: 15px 22px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
        }

        .primaryButton {
          background: #e7a93b;
          color: #111;
        }

        .secondaryButton {
          border: 1px solid #465048;
          color: white;
        }

        .secondaryButton:hover {
          border-color: #e7a93b;
          color: #e7a93b;
        }

        .heroVisual {
          width: 330px;
          height: 330px;
          border: 1px solid #354239;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background:
            radial-gradient(
              circle,
              #26362b,
              #0b100d 65%
            );
        }

        .circle {
          font-size: 100px;
        }

        .heroVisual p {
          color: #7f8982;
          text-align: center;
          letter-spacing: 4px;
          font-size: 10px;
        }

        /* STATS */

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #303832;
          border-bottom: 1px solid #303832;
          background: #101511;
        }

        .stats div {
          padding: 35px;
          text-align: center;
          border-right: 1px solid #303832;
        }

        .stats div:last-child {
          border-right: none;
        }

        .stats strong {
          display: block;
          color: #e7a93b;
          font-size: 35px;
        }

        .stats span {
          color: #858e88;
          font-size: 12px;
          letter-spacing: 2px;
        }

        /* FORTS */

        .fortSection {
          max-width: 1200px;
          margin: auto;
          padding: 110px 7%;
        }

        .sectionHeading {
          max-width: 700px;
        }

        .sectionHeading h2 {
          font-size: clamp(40px, 6vw, 65px);
          margin: 15px 0;
        }

        .sectionHeading > p:last-child {
          color: #929b95;
          line-height: 1.8;
        }

        .fortGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 50px;
        }

        .fortCard {
          border: 1px solid #303832;
          background: #101511;
          color: white;
          text-decoration: none;
          transition: .25s ease;
          overflow: hidden;
        }

        .fortCard:hover {
          transform: translateY(-6px);
          border-color: #e7a93b;
        }

        .fortImage {
          height: 230px;
          position: relative;
          background: #19221c;
        }

        .fortImage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 70px;
        }

        .fortImage > span {
          position: absolute;
          right: 15px;
          bottom: 15px;
          padding: 8px 12px;
          background: #e7a93b;
          color: #111;
          font-size: 10px;
          font-weight: bold;
        }

        .fortContent {
          padding: 25px;
        }

        .fortContent h3 {
          font-size: 30px;
          margin: 12px 0;
        }

        .location {
          color: #b8c0ba;
          font-size: 14px;
        }

        .history {
          color: #858e88;
          line-height: 1.6;
          font-size: 14px;
        }

        .allForts {
          text-align: center;
          margin-top: 45px;
        }

        .allForts a {
          color: #e7a93b;
          text-decoration: none;
          font-weight: bold;
        }

        /* EXPERIENCE */

        .experience {
          padding: 100px 10%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 50px;
          background: #111a14;
          border-top: 1px solid #303832;
          border-bottom: 1px solid #303832;
        }

        .experience h2 {
          font-size: clamp(45px, 7vw, 75px);
          line-height: 1;
          margin: 15px 0 25px;
        }

        .experience p {
          max-width: 600px;
          color: #929b95;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .experienceIcon {
          font-size: 130px;
          width: 300px;
          height: 300px;
          border: 1px solid #405044;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0b100d;
        }

        /* ABOUT */

        .about {
          max-width: 900px;
          margin: auto;
          padding: 120px 7%;
        }

        .about h2 {
          font-size: clamp(50px, 8vw, 90px);
          line-height: .95;
          margin: 20px 0 40px;
        }

        .about > p:last-child {
          color: #929b95;
          font-size: 18px;
          line-height: 1.9;
        }

        /* FOOTER */

        footer {
          padding: 70px 7%;
          text-align: center;
          border-top: 1px solid #252c27;
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

        footer small {
          display: block;
          margin-top: 30px;
          color: #555d57;
        }

        /* MOBILE */

        @media (max-width: 800px) {

          .navbar {
            height: auto;
            padding: 20px 6%;
            flex-direction: column;
            gap: 18px;
          }

          .hero {
            min-height: auto;
            padding: 80px 6%;
            flex-direction: column;
            align-items: flex-start;
          }

          .hero h1 {
            font-size: 65px;
            letter-spacing: -2px;
          }

          .heroVisual {
            width: 240px;
            height: 240px;
            align-self: center;
          }

          .circle {
            font-size: 70px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .stats div {
            border-right: none;
            border-bottom: 1px solid #303832;
          }

          .fortSection {
            padding: 80px 6%;
          }

          .fortGrid {
            grid-template-columns: 1fr;
          }

          .experience {
            padding: 80px 6%;
            flex-direction: column;
            align-items: flex-start;
          }

          .experienceIcon {
            width: 220px;
            height: 220px;
            font-size: 90px;
            align-self: center;
          }

        }

      `}</style>

    </main>
  );
}