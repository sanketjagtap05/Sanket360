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

      {/* NAVBAR */}
      <nav className="navbar">
        <Link href="/" className="logo">
          SANKET<span>360</span>
        </Link>

        <div className="navLinks">
          <Link href="/">HOME</Link>
          <Link href="/Forts">FORTS</Link>
          <Link href="/admin">ADMIN</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="heroGlow" />
        <div className="heroGrid" />

        <div className="heroContent">

          <div className="eyebrow">
            SANKET360 / SAHYADRI ARCHIVE
          </div>

          <h1>
            Explore
            <br />
            <span>Maharashtra.</span>
          </h1>

          <p className="heroText">
            महाराष्ट्रातील ऐतिहासिक किल्ले,
            trekking routes आणि immersive
            digital experiences एका premium
            digital archive मध्ये.
          </p>

          <div className="heroActions">
            <a href="#forts" className="primaryButton">
              EXPLORE FORTS <span>↓</span>
            </a>

            <a href="#map" className="outlineButton">
              VIEW SAHYADRI MAP
            </a>
          </div>

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

        <div className="heroSide">
          <div className="verticalText">
            EXPLORE • EXPERIENCE • PRESERVE
          </div>
        </div>

      </section>

      {/* FORTS */}
      <section className="fortSection" id="forts">

        <div className="sectionHeader">

          <div>
            <p className="sectionLabel">
              01 / THE COLLECTION
            </p>

            <h2>
              Forts of
              <br />
              <span>Maharashtra.</span>
            </h2>

            <p className="sectionIntro">
              Discover the stories, landscapes and
              trekking routes hidden across the
              Sahyadri ranges.
            </p>
          </div>

          <div className="countBox">
            <span>ARCHIVE</span>

            <strong>
              {String(forts?.length || 0).padStart(2, "0")}
            </strong>

            <small>FORTS</small>
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

                  <div className="number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="cardTop">
                    SAHYADRI / FORT
                  </div>

                  <div className="exploreBadge">
                    EXPLORE →
                  </div>

                </div>

                <div className="cardContent">

                  <div className="cardLabel">
                    FORT {String(index + 1).padStart(2, "0")}
                  </div>

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

                      {fort.history.length > 145
                        ? fort.history.slice(0, 145) + "..."
                        : fort.history}

                    </p>

                  )}

                  <div className="badges">

                    {fort.gpx_url && (
                      <span>🗺 GPX</span>
                    )}

                    {fort.photos_360_url && (
                      <span>🌐 360°</span>
                    )}

                    {fort.photos_url && (
                      <span>📷 PHOTOS</span>
                    )}

                    {fort.video_url && (
                      <span>🎥 VIDEO</span>
                    )}

                  </div>

                  <div className="cardFooter">

                    <span>
                      VIEW FORT
                    </span>

                    <strong>
                      ↗
                    </strong>

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

      {/* MAP */}
      <section id="map" className="mapSection">

        <div className="mapHeader">

          <div>

            <p className="sectionLabel">
              02 / THE SAHYADRI
            </p>

            <h2>
              Explore the
              <br />
              <span>Sahyadri.</span>
            </h2>

          </div>

          <p>
            महाराष्ट्रातील किल्ले आणि त्यांचे
            geographical locations एका interactive
            map वर explore करा.
          </p>

        </div>

        <div className="mapFrame">
          <SahyadriMapWrapper forts={forts || []} />
        </div>

      </section>

      {/* DIGITAL EXPERIENCE */}
      <section className="experience">

        <div className="experienceNumber">
          03
        </div>

        <p className="sectionLabel">
          DIGITAL SAHYADRI
        </p>

        <h2>
          Explore.
          <br />
          Experience.
          <br />
          <span>Preserve.</span>
        </h2>

        <p className="experienceText">
          इतिहासापासून trekking routes पर्यंत,
          360° photography पासून digital exploration
          पर्यंत — Sahyadri एका नवीन स्वरूपात.
        </p>

        <Link
          href="#forts"
          className="experienceButton"
        >
          START EXPLORING <span>↓</span>
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

        <div className="footerLine" />

        <Link href="/">
          ← BACK TO HOME
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

        body {
          margin: 0;
          background: #050705;
        }

        .page {
          min-height: 100vh;
          background: #070a08;
          color: #f4f4ef;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* NAVBAR */

        .navbar {
          height: 78px;
          padding: 0 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          position: sticky;
          top: 0;
          z-index: 100;

          background: rgba(5,7,5,.88);
          backdrop-filter: blur(18px);

          border-bottom: 1px solid #252b27;
        }

        .logo,
        .footerLogo {
          color: white;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 4px;
          text-decoration: none;
        }

        .logo span,
        .footerLogo span {
          color: #e7a93b;
        }

        .navLinks {
          display: flex;
          gap: 30px;
        }

        .navLinks a {
          color: #aeb6b0;
          text-decoration: none;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          transition: .25s;
        }

        .navLinks a:hover {
          color: #e7a93b;
        }

        /* HERO */

        .hero {
          min-height: 720px;
          padding: 100px 8%;

          display: flex;
          align-items: center;

          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 75% 30%,
              rgba(231,169,59,.15),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #17251d,
              #070a08 55%,
              #0e1510
            );

          border-bottom: 1px solid #252c27;
        }

        .heroGrid {
          position: absolute;
          inset: 0;

          opacity: .15;

          background-image:
            linear-gradient(#69756c 1px, transparent 1px),
            linear-gradient(90deg,#69756c 1px,transparent 1px);

          background-size: 80px 80px;

          mask-image:
            linear-gradient(
              to right,
              black,
              transparent
            );
        }

        .heroGlow {
          position: absolute;

          width: 600px;
          height: 600px;

          right: -180px;
          top: -100px;

          border-radius: 50%;

          background: rgba(231,169,59,.12);

          filter: blur(110px);
        }

        .heroContent {
          position: relative;
          z-index: 2;

          max-width: 900px;
        }

        .eyebrow,
        .sectionLabel {
          color: #e7a93b;

          font-size: 10px;
          font-weight: 900;
          letter-spacing: 4px;
        }

        .hero h1 {
          margin: 25px 0;

          font-size: clamp(70px,11vw,145px);

          line-height: .82;

          letter-spacing: -8px;
        }

        .hero h1 span,
        .sectionHeader h2 span,
        .mapHeader h2 span,
        .experience h2 span {
          color: #e7a93b;
        }

        .heroText {
          max-width: 620px;

          color: #aeb6b0;

          font-size: 17px;

          line-height: 1.8;
        }

        .heroActions {
          display: flex;
          gap: 12px;

          margin-top: 35px;

          flex-wrap: wrap;
        }

        .primaryButton,
        .outlineButton,
        .experienceButton {
          padding: 15px 21px;

          text-decoration: none;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 2px;
        }

        .primaryButton {
          background: #e7a93b;
          color: #10120f;
        }

        .primaryButton span {
          margin-left: 10px;
        }

        .outlineButton {
          border: 1px solid #59645c;
          color: white;
        }

        .heroStats {
          display: flex;

          margin-top: 55px;
        }

        .heroStats div {
          min-width: 125px;

          padding-right: 30px;
          margin-right: 30px;

          border-right: 1px solid #39423b;

          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .heroStats div:last-child {
          border: none;
        }

        .heroStats strong {
          font-size: 26px;
        }

        .heroStats span {
          color: #727a74;

          font-size: 9px;

          letter-spacing: 2px;

          font-weight: 900;
        }

        .heroSide {
          position: absolute;
          right: 5%;
          bottom: 12%;

          writing-mode: vertical-rl;
        }

        .verticalText {
          color: #59635b;

          font-size: 9px;

          letter-spacing: 4px;
        }

        /* FORT SECTION */

        .fortSection {
          padding: 120px 7%;

          background: #090c0a;
        }

        .sectionHeader {
          max-width: 1250px;

          margin: auto;

          display: flex;

          justify-content: space-between;

          align-items: flex-end;

          gap: 50px;
        }

        .sectionHeader h2,
        .mapHeader h2 {
          margin: 15px 0 25px;

          font-size: clamp(45px,7vw,80px);

          line-height: .9;

          letter-spacing: -5px;
        }

        .sectionIntro {
          max-width: 580px;

          color: #808981;

          line-height: 1.8;
        }

        .countBox {
          min-width: 125px;

          padding: 20px;

          border: 1px solid #303832;

          background: #101511;
        }

        .countBox span,
        .countBox small {
          display: block;

          color: #69736c;

          font-size: 9px;

          letter-spacing: 2px;
        }

        .countBox strong {
          display: block;

          margin: 8px 0;

          font-size: 45px;

          color: #e7a93b;
        }

        /* CARDS */

        .grid {
          max-width: 1250px;

          margin: 60px auto 0;

          display: grid;

          grid-template-columns:
            repeat(3,1fr);

          gap: 20px;
        }

        .card {
          background: #101511;

          border: 1px solid #303832;

          color: white;

          text-decoration: none;

          overflow: hidden;

          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .card:hover {
          transform: translateY(-10px);

          border-color: #e7a93b;

          box-shadow:
            0 30px 70px rgba(0,0,0,.4);
        }

        .imageBox {
          height: 290px;

          position: relative;

          overflow: hidden;

          background: #17201a;
        }

        .imageBox img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          display: block;

          transition:
            transform .7s ease,
            filter .7s ease;
        }

        .card:hover .imageBox img {
          transform: scale(1.08);

          filter: saturate(1.1);
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
              to bottom,
              rgba(0,0,0,.05),
              rgba(0,0,0,.8)
            );
        }

        .number {
          position: absolute;

          top: 18px;
          left: 18px;

          width: 45px;
          height: 45px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 1px solid rgba(255,255,255,.35);

          background: rgba(0,0,0,.35);

          font-size: 11px;
          font-weight: 900;
        }

        .cardTop {
          position: absolute;

          top: 23px;
          right: 20px;

          color: #d8ddd9;

          font-size: 8px;

          letter-spacing: 2px;

          font-weight: 900;
        }

        .exploreBadge {
          position: absolute;

          bottom: 18px;
          right: 18px;

          padding: 10px 13px;

          background: #e7a93b;

          color: #111;

          font-size: 9px;

          font-weight: 900;

          letter-spacing: 1px;
        }

        .cardContent {
          padding: 25px;
        }

        .cardLabel {
          color: #e7a93b;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 3px;
        }

        .card h3 {
          margin: 8px 0;

          font-size: 31px;

          letter-spacing: -.5px;
        }

        .location {
          color: #c0c7c2;

          font-size: 12px;
        }

        .history {
          min-height: 48px;

          color: #818a83;

          font-size: 13px;

          line-height: 1.65;
        }

        .badges {
          display: flex;

          flex-wrap: wrap;

          gap: 6px;

          margin-top: 20px;
        }

        .badges span {
          padding: 6px 8px;

          border: 1px solid #303832;

          background: #0b0f0c;

          color: #9da59f;

          font-size: 8px;

          font-weight: 900;
        }

        .cardFooter {
          margin-top: 25px;

          padding-top: 18px;

          border-top: 1px solid #29312c;

          display: flex;

          justify-content: space-between;

          color: #e7a93b;

          font-size: 9px;

          letter-spacing: 2px;

          font-weight: 900;
        }

        .cardFooter strong {
          font-size: 18px;
        }

        /* MAP */

        .mapSection {
          padding: 110px 7%;

          background: #0d120f;

          border-top: 1px solid #222a25;
        }

        .mapHeader {
          max-width: 1250px;

          margin: auto;

          display: flex;

          justify-content: space-between;

          gap: 50px;

          align-items: flex-end;
        }

        .mapHeader > p {
          max-width: 430px;

          color: #838c85;

          line-height: 1.8;
        }

        .mapFrame {
          max-width: 1250px;

          margin: 50px auto 0;

          border: 1px solid #303832;

          background: #101511;

          overflow: hidden;
        }

        /* EXPERIENCE */

        .experience {
          position: relative;

          padding: 150px 7%;

          text-align: center;

          overflow: hidden;

          background:
            radial-gradient(
              circle at center,
              rgba(231,169,59,.12),
              transparent 45%
            ),
            #101a14;
        }

        .experienceNumber {
          position: absolute;

          top: 25px;
          right: 7%;

          color: #303b32;

          font-size: 120px;

          font-weight: 900;
        }

        .experience h2 {
          margin: 20px 0 30px;

          font-size: clamp(55px,9vw,110px);

          line-height: .85;

          letter-spacing: -6px;
        }

        .experienceText {
          max-width: 650px;

          margin: auto auto 35px;

          color: #9da69f;

          line-height: 1.8;
        }

        .experienceButton {
          display: inline-block;

          border: 1px solid #e7a93b;

          color: #e7a93b;
        }

        /* MESSAGE */

        .message {
          max-width: 1250px;

          margin: 40px auto;

          padding: 25px;

          border: 1px solid #303832;

          background: #101511;
        }

        .message p {
          color: #777f79;
        }

        .errorMessage {
          border-color: #704545;
        }

        /* FOOTER */

        footer {
          padding: 70px 7%;

          text-align: center;

          background: #050705;

          border-top: 1px solid #252c27;
        }

        footer p {
          color: #626b64;

          font-size: 9px;

          letter-spacing: 3px;

          margin: 16px 0 25px;
        }

        footer a {
          color: #e7a93b;

          text-decoration: none;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 2px;
        }

        .footerLine {
          width: 70px;

          height: 1px;

          margin: 25px auto;

          background: #303832;
        }

        footer small {
          display: block;

          margin-top: 30px;

          color: #454d47;

          font-size: 9px;
        }

        /* RESPONSIVE */

        @media (max-width: 950px) {

          .grid {
            grid-template-columns: repeat(2,1fr);
          }

          .sectionHeader,
          .mapHeader {
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
            gap: 17px;
          }

          .hero {
            min-height: 650px;

            padding: 80px 6%;
          }

          .hero h1 {
            font-size: 65px;

            letter-spacing: -4px;
          }

          .heroText {
            font-size: 15px;
          }

          .heroStats {
            flex-wrap: wrap;

            gap: 20px;
          }

          .heroStats div {
            min-width: 85px;

            padding-right: 15px;

            margin-right: 0;
          }

          .heroSide {
            display: none;
          }

          .fortSection,
          .mapSection {
            padding: 80px 6%;
          }

          .grid {
            grid-template-columns: 1fr;

            gap: 18px;
          }

          .imageBox {
            height: 240px;
          }

          .sectionHeader h2,
          .mapHeader h2 {
            font-size: 55px;
          }

          .experience {
            padding: 100px 6%;
          }

          .experience h2 {
            font-size: 58px;

            letter-spacing: -4px;
          }

          .experienceNumber {
            font-size: 70px;
          }

        }

      `}</style>

    </main>
  );
}