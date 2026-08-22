"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import FortGallery from "@/app/components/FortGallery";

type Fort = {
  id: number;
  name: string;
  location: string | null;
  history: string | null;
  what_to_see: string | null;
  photos_url: string | null;
  photos_360_url: string | null;
  video_url: string | null;
  gpx_url: string | null;
};

export default function RajgadPage() {
  const [fort, setFort] = useState<Fort | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRajgad() {
      const { data, error } = await supabase
        .from("forts")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      console.log("RAJGAD:", data);
      console.log("RAJGAD ERROR:", error);

      if (error || !data) {
        setLoading(false);
        return;
      }

      setFort(data);
      setLoading(false);
    }

    loadRajgad();
  }, []);

  if (loading) {
    return (
      <main className="loading">
        <div className="loader">🏰</div>
        <h2>Loading Rajgad...</h2>

        <style>{`
          .loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #070a08;
            color: white;
            font-family: Arial, Helvetica, sans-serif;
          }

          .loader {
            font-size: 60px;
            margin-bottom: 20px;
          }
        `}</style>
      </main>
    );
  }

  if (!fort) {
    return (
      <main className="loading">
        <div className="loader">⚠️</div>

        <h2>Rajgad information not found</h2>

        <p>
          Supabase मधून Rajgad ची माहिती मिळाली नाही.
        </p>

        <Link href="/Forts" className="back">
          ← Back to Forts
        </Link>

        <style>{`
          .loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #070a08;
            color: white;
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
            padding: 30px;
          }

          .loader {
            font-size: 60px;
          }

          .loading p {
            color: #999;
          }

          .back {
            margin-top: 20px;
            color: #e7a93b;
            text-decoration: none;
          }
        `}</style>
      </main>
    );
  }

  const heroImage = fort.photos_url;

  return (
    <main className="page">

      {/* NAVBAR */}

      <nav className="navbar">

        <Link href="/" className="logo">
          SANKET<span>360</span>
        </Link>

        <div className="nav">

          <Link href="/">
            HOME
          </Link>

          <Link href="/Forts">
            FORTS
          </Link>

          <a href="#history">
            HISTORY
          </a>

          <a href="#gallery">
            GALLERY
          </a>

        </div>

      </nav>

      {/* HERO */}

      <section
        className="hero"
        style={
          heroImage
            ? {
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    rgba(3,7,5,.94),
                    rgba(3,7,5,.58),
                    rgba(3,7,5,.25)
                  ),
                  url("${heroImage}")
                `,
              }
            : undefined
        }
      >

        <div className="heroContent">

          <div className="eyebrow">
            SANKET360 • SAHYADRI
          </div>

          <h1>
            {fort.name}
          </h1>

          <h2>
            राजगड
          </h2>

          <p>
            {fort.location ||
              "महाराष्ट्राच्या सह्याद्री पर्वतरांगांमधील ऐतिहासिक किल्ला."}
          </p>

          <div className="buttons">

            <a
              href="#history"
              className="primary"
            >
              EXPLORE RAJGAD ↓
            </a>

            {fort.photos_360_url && (
              <a
                href={fort.photos_360_url}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary"
              >
                360° EXPERIENCE
              </a>
            )}

          </div>

        </div>

        <div className="scroll">
          SCROLL TO EXPLORE ↓
        </div>

      </section>

      {/* QUICK INFO */}

      <section className="quick">

        <div>
          <span>01</span>
          <strong>HISTORY</strong>
          <p>
            स्वराज्याच्या इतिहासातील महत्त्वाचा गड
          </p>
        </div>

        <div>
          <span>02</span>
          <strong>TREK</strong>
          <p>
            सह्याद्रीतील लोकप्रिय trekking destination
          </p>
        </div>

        <div>
          <span>03</span>
          <strong>360°</strong>
          <p>
            Immersive digital experience
          </p>
        </div>

        <div>
          <span>04</span>
          <strong>EXPLORE</strong>
          <p>
            इतिहास, निसर्ग आणि साहस
          </p>
        </div>

      </section>

      {/* HISTORY */}

      <section
        id="history"
        className="section"
      >

        <div className="label">
          01 / HISTORY
        </div>

        <h2>
          राजगडाचा
          <br />
          <span>इतिहास.</span>
        </h2>

        <div className="historyLayout">

          <div className="bigNumber">
            01
          </div>

          <div>

            <p className="historyText">
              {fort.history ||
                "राजगडाचा इतिहास लवकरच येथे जोडला जाईल."}
            </p>

            <div className="quote">
              “सह्याद्रीच्या प्रत्येक कड्यावर
              इतिहासाची एक कथा दडलेली आहे.”
            </div>

          </div>

        </div>

      </section>

      {/* WHAT TO SEE */}

      <section className="dark section">

        <div className="label">
          02 / EXPLORE
        </div>

        <h2>
          गडावर काय
          <br />
          <span>पाहाल?</span>
        </h2>

        <div className="things">

          {fort.what_to_see ? (
            fort.what_to_see
              .split("\n")
              .filter(Boolean)
              .map((item, index) => (
                <div
                  className="thing"
                  key={index}
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    {item}
                  </p>

                  <b>
                    →
                  </b>

                </div>
              ))
          ) : (
            <>
              <div className="thing">
                <span>01</span>
                <p>बालेकिल्ला</p>
                <b>→</b>
              </div>

              <div className="thing">
                <span>02</span>
                <p>माच्या आणि तटबंदी</p>
                <b>→</b>
              </div>

              <div className="thing">
                <span>03</span>
                <p>सह्याद्रीचे विहंगम दृश्य</p>
                <b>→</b>
              </div>
            </>
          )}

        </div>

      </section>

      {/* PREMIUM GALLERY */}

      <section
        id="gallery"
        className="section gallerySection"
      >

        <div className="label">
          03 / MEDIA EXPERIENCE
        </div>

        <h2>
          Experience
          <br />
          <span>Rajgad.</span>
        </h2>

        <p className="galleryIntro">
          Rajgad चे photos, 360° experience आणि
          video एका premium digital gallery मध्ये
          explore करा.
        </p>

        <FortGallery
          photosUrl={fort.photos_url}
          photos360Url={fort.photos_360_url}
          videoUrl={fort.video_url}
          fortName={fort.name}
        />

      </section>

      {/* GPX */}

      <section className="gpxSection">

        <div>

          <div className="label">
            04 / TREK DATA
          </div>

          <h2>
            Trek the
            <br />
            <span>Rajgad.</span>
          </h2>

          <p>
            Rajgad trekking route साठी GPX file
            वापरा आणि तुमचा route digitally
            explore करा.
          </p>

          {fort.gpx_url ? (
            <a
              href={fort.gpx_url}
              target="_blank"
              rel="noopener noreferrer"
              className="gpxButton"
            >
              🗺️ OPEN GPX ROUTE →
            </a>
          ) : (
            <p className="muted">
              GPX route लवकरच उपलब्ध होईल.
            </p>
          )}

        </div>

        <div className="mapBox">

          <div className="mapLines" />

          <div className="mapPin">
            📍
          </div>

          <span>
            RAJGAD
          </span>

        </div>

      </section>

      {/* TREKKING TIPS */}

      <section className="section dark">

        <div className="label">
          05 / TREKKING
        </div>

        <h2>
          Trek
          <br />
          <span>Smart.</span>
        </h2>

        <div className="tips">

          <div>
            <b>01</b>

            <h3>
              🥾 Footwear
            </h3>

            <p>
              योग्य trekking shoes वापरा.
            </p>
          </div>

          <div>
            <b>02</b>

            <h3>
              💧 Water
            </h3>

            <p>
              पुरेसे पाणी सोबत ठेवा.
            </p>
          </div>

          <div>
            <b>03</b>

            <h3>
              🌦️ Weather
            </h3>

            <p>
              ट्रेकपूर्वी हवामान तपासा.
            </p>
          </div>

          <div>
            <b>04</b>

            <h3>
              ♻️ Nature
            </h3>

            <p>
              कचरा न टाकता सह्याद्री स्वच्छ ठेवा.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <div className="label">
          SANKET360
        </div>

        <h2>
          Explore.
          <br />
          Experience.
          <br />
          Preserve.
        </h2>

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
          ← BACK TO FORTS
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
        }

        .page {
          background: #070a08;
          color: #f5f5f2;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* NAVBAR */

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;

          height: 76px;

          padding: 0 7%;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: rgba(7,10,8,.94);

          border-bottom: 1px solid #252c27;

          backdrop-filter: blur(15px);
        }

        .logo,
        .footerLogo {
          color: white;

          text-decoration: none;

          font-size: 25px;

          font-weight: 900;

          letter-spacing: 3px;
        }

        .logo span,
        .footerLogo span {
          color: #e7a93b;
        }

        .nav {
          display: flex;

          gap: 28px;
        }

        .nav a {
          color: #aaa;

          text-decoration: none;

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 2px;

          transition: .2s;
        }

        .nav a:hover {
          color: #e7a93b;
        }

        /* HERO */

        .hero {
          min-height: calc(100vh - 76px);

          padding: 100px 8%;

          display: flex;

          align-items: center;

          position: relative;

          background-color: #111;

          background-size: cover;

          background-position: center;

          border-bottom: 1px solid #252c27;
        }

        .heroContent {
          max-width: 900px;
        }

        .eyebrow,
        .label {
          color: #e7a93b;

          font-size: 11px;

          font-weight: 900;

          letter-spacing: 4px;
        }

        .hero h1 {
          margin: 20px 0 0;

          font-size: clamp(75px,12vw,155px);

          line-height: .82;

          letter-spacing: -8px;
        }

        .hero h2 {
          margin: 20px 0;

          font-size: 32px;

          font-weight: 400;
        }

        .hero p {
          max-width: 650px;

          color: #c2c7c3;

          font-size: 18px;

          line-height: 1.8;
        }

        .buttons {
          display: flex;

          gap: 12px;

          margin-top: 35px;

          flex-wrap: wrap;
        }

        .primary,
        .secondary,
        .gpxButton,
        .ctaButton {
          display: inline-block;

          padding: 15px 22px;

          text-decoration: none;

          font-size: 11px;

          font-weight: 900;

          letter-spacing: 2px;

          transition: .25s;
        }

        .primary {
          background: #e7a93b;

          color: #111;
        }

        .secondary {
          color: white;

          border: 1px solid #777;
        }

        .primary:hover {
          transform: translateY(-3px);
        }

        .secondary:hover {
          border-color: #e7a93b;

          color: #e7a93b;
        }

        .scroll {
          position: absolute;

          right: 7%;

          bottom: 35px;

          color: #777;

          font-size: 9px;

          letter-spacing: 3px;
        }

        /* QUICK INFO */

        .quick {
          display: grid;

          grid-template-columns: repeat(4,1fr);

          background: #101511;

          border-bottom: 1px solid #29312c;
        }

        .quick > div {
          padding: 35px;

          border-right: 1px solid #29312c;
        }

        .quick > div:last-child {
          border-right: none;
        }

        .quick span {
          display: block;

          color: #e7a93b;

          font-size: 10px;

          margin-bottom: 20px;
        }

        .quick strong {
          display: block;

          font-size: 15px;

          letter-spacing: 2px;
        }

        .quick p {
          color: #777f79;

          font-size: 13px;

          line-height: 1.5;
        }

        /* SECTION */

        .section {
          padding: 120px 8%;
        }

        .section h2,
        .gpxSection h2,
        .cta h2 {
          margin: 20px 0 50px;

          font-size: clamp(55px,8vw,105px);

          line-height: .88;

          letter-spacing: -5px;
        }

        .section h2 span,
        .gpxSection h2 span {
          color: #e7a93b;
        }

        /* HISTORY */

        .historyLayout {
          max-width: 1000px;

          display: grid;

          grid-template-columns: 180px 1fr;

          gap: 50px;
        }

        .bigNumber {
          font-size: 130px;

          color: #1c241f;

          font-weight: 900;

          line-height: 1;
        }

        .historyText {
          color: #b8beb9;

          font-size: 19px;

          line-height: 1.9;
        }

        .quote {
          margin-top: 35px;

          padding: 25px;

          border-left: 2px solid #e7a93b;

          color: #e7a93b;

          font-size: 16px;

          line-height: 1.7;
        }

        /* DARK */

        .dark {
          background: #0d120f;

          border-top: 1px solid #1f2822;

          border-bottom: 1px solid #1f2822;
        }

        /* WHAT TO SEE */

        .things {
          max-width: 1100px;
        }

        .thing {
          display: grid;

          grid-template-columns: 80px 1fr 30px;

          align-items: center;

          padding: 28px 0;

          border-bottom: 1px solid #29312c;
        }

        .thing span {
          color: #e7a93b;

          font-size: 11px;
        }

        .thing p {
          margin: 0;

          font-size: 22px;
        }

        .thing b {
          color: #e7a93b;

          font-size: 22px;
        }

        /* GALLERY */

        .gallerySection {
          background: #070a08;
        }

        .galleryIntro {
          max-width: 650px;

          margin-top: -20px;

          margin-bottom: 45px;

          color: #8d968f;

          line-height: 1.8;

          font-size: 16px;
        }

        /* GPX */

        .gpxSection {
          padding: 120px 8%;

          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 80px;

          background: #172219;
        }

        .gpxSection p {
          max-width: 600px;

          color: #aeb6b0;

          line-height: 1.8;
        }

        .gpxButton {
          margin-top: 20px;

          background: #e7a93b;

          color: #111;
        }

        .muted {
          color: #777 !important;
        }

        .mapBox {
          min-height: 400px;

          position: relative;

          overflow: hidden;

          border: 1px solid #39483d;

          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(231,169,59,.12),
              transparent 35%
            ),
            #0d1410;
        }

        .mapLines {
          position: absolute;

          inset: 0;

          opacity: .25;

          background-image:
            linear-gradient(#59655c 1px,transparent 1px),
            linear-gradient(90deg,#59655c 1px,transparent 1px);

          background-size: 50px 50px;
        }

        .mapPin {
          position: absolute;

          left: 50%;

          top: 48%;

          transform: translate(-50%,-50%);

          font-size: 55px;
        }

        .mapBox > span {
          position: absolute;

          bottom: 25px;

          left: 25px;

          color: #e7a93b;

          font-size: 10px;

          font-weight: 900;

          letter-spacing: 4px;
        }

        /* TIPS */

        .tips {
          display: grid;

          grid-template-columns: repeat(4,1fr);

          gap: 20px;
        }

        .tips > div {
          padding: 30px;

          border: 1px solid #29342e;

          background: #131a16;
        }

        .tips b {
          color: #e7a93b;

          font-size: 11px;
        }

        .tips h3 {
          margin-top: 25px;
        }

        .tips p {
          color: #888f8a;

          line-height: 1.6;

          font-size: 14px;
        }

        /* CTA */

        .cta {
          padding: 150px 8%;

          text-align: center;

          background:
            radial-gradient(
              circle,
              rgba(231,169,59,.12),
              transparent 45%
            ),
            #111812;
        }

        .cta h2 {
          margin-bottom: 45px;
        }

        .ctaButton {
          border: 1px solid #e7a93b;

          color: #e7a93b;
        }

        /* FOOTER */

        footer {
          padding: 70px 7%;

          text-align: center;

          background: #060806;

          border-top: 1px solid #29312c;
        }

        footer p {
          color: #777;

          font-size: 10px;

          letter-spacing: 3px;

          margin: 18px 0 25px;
        }

        footer a {
          color: #e7a93b;

          text-decoration: none;

          font-size: 11px;
        }

        footer small {
          display: block;

          margin-top: 30px;

          color: #444;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {

          .quick {
            grid-template-columns: repeat(2,1fr);
          }

          .tips {
            grid-template-columns: repeat(2,1fr);
          }

          .gpxSection {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .navbar {
            height: auto;

            padding: 18px 6%;

            flex-direction: column;

            gap: 15px;
          }

          .nav {
            gap: 15px;

            flex-wrap: wrap;

            justify-content: center;
          }

          .hero {
            min-height: 650px;

            padding: 80px 6%;
          }

          .hero h1 {
            font-size: 70px;

            letter-spacing: -4px;
          }

          .quick {
            grid-template-columns: 1fr;
          }

          .quick > div {
            border-right: none;

            border-bottom: 1px solid #29312c;
          }

          .section,
          .gpxSection {
            padding: 80px 6%;
          }

          .section h2,
          .gpxSection h2,
          .cta h2 {
            font-size: 60px;

            letter-spacing: -3px;
          }

          .historyLayout {
            grid-template-columns: 1fr;

            gap: 10px;
          }

          .bigNumber {
            font-size: 70px;
          }

          .tips {
            grid-template-columns: 1fr;
          }

          .cta {
            padding: 100px 6%;
          }

          .scroll {
            display: none;
          }

        }

      `}</style>

    </main>
  );
}