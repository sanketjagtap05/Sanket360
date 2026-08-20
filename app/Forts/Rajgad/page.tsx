"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
    loadRajgad();
  }, []);

  async function loadRajgad() {
    const { data, error } = await supabase
      .from("forts")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Rajgad fetch error:", error);
      setLoading(false);
      return;
    }

    setFort(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="loading-page">
        <h1>Loading Rajgad...</h1>

        <style>{`
          .loading-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0b0f0d;
            color: white;
            font-family: Arial, Helvetica, sans-serif;
          }
        `}</style>
      </main>
    );
  }

  if (!fort) {
    return (
      <main className="loading-page">
        <h1>Rajgad information not found.</h1>

        <style>{`
          .loading-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0b0f0d;
            color: white;
            font-family: Arial, Helvetica, sans-serif;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="rajgad-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          SANKET<span>360</span>
        </div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/Forts">Forts</a>
          <a href="/Forts/Rajgad">Rajgad</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <p className="tagline">
            EXPLORE • EXPERIENCE • PRESERVE
          </p>

          <h1>{fort.name}</h1>

          <h2>राजगड</h2>

          <p>
            {fort.location ||
              "महाराष्ट्राच्या इतिहासातील एक भव्य आणि ऐतिहासिक किल्ला."}
          </p>

          <div className="hero-buttons">
            <a href="#history" className="btn">
              Explore Rajgad ↓
            </a>

            {fort.photos_360_url && (
              <a href="#360" className="btn secondary">
                360° Experience
              </a>
            )}
          </div>

        </div>
      </section>

      {/* QUICK INFO */}
      <section className="info-section">

        <div className="info-card">
          <span>🏰</span>
          <h3>ऐतिहासिक किल्ला</h3>
          <p>स्वराज्याच्या इतिहासातील महत्त्वाचे स्थान</p>
        </div>

        <div className="info-card">
          <span>📍</span>
          <h3>Location</h3>
          <p>{fort.location || "Location माहिती उपलब्ध नाही."}</p>
        </div>

        <div className="info-card">
          <span>🥾</span>
          <h3>Trek</h3>
          <p>ट्रेकिंगसाठी लोकप्रिय गड</p>
        </div>

        <div className="info-card">
          <span>🌐</span>
          <h3>360°</h3>
          <p>
            {fort.photos_360_url
              ? "360° Experience Available"
              : "360° link लवकरच"}
          </p>
        </div>

      </section>

      {/* HISTORY */}
      <section id="history" className="content-section">

        <p className="section-label">HISTORY</p>

        <h2>राजगडाचा इतिहास</h2>

        <p>
          {fort.history ||
            "राजगडाचा इतिहास Admin मधून लवकरच जोडला जाईल."}
        </p>

        <div className="history-box">

          <h3>राजगड का पाहावा?</h3>

          <ul>
            <li>स्वराज्याच्या इतिहासाशी जोडलेला गड</li>
            <li>बालेकिल्ला आणि विविध माच्या</li>
            <li>सह्याद्रीचे सुंदर विहंगम दृश्य</li>
            <li>ट्रेकिंगचा रोमांचक अनुभव</li>
            <li>360° Photography अनुभव</li>
          </ul>

        </div>

      </section>

      {/* WHAT TO SEE */}
      <section className="content-section dark-section">

        <p className="section-label">EXPLORE</p>

        <h2>राजगडावर काय काय पाहायचे?</h2>

        <div className="what-see-box">
          {fort.what_to_see ? (
            fort.what_to_see.split("\n").map((item, index) => (
              <div className="what-see-item" key={index}>
                <span>🏰</span>
                <p>{item}</p>
              </div>
            ))
          ) : (
            <p>
              राजगडावर पाहण्यासारखी माहिती Admin मधून जोडली जाईल.
            </p>
          )}
        </div>

      </section>

      {/* PHOTO GALLERY */}
      <section id="gallery" className="content-section">

        <p className="section-label">PHOTOGRAPHY</p>

        <h2>Rajgad Photo Gallery</h2>

        <p>
          राजगडाचे फोटो, 360° photographs आणि videos येथे पाहता येतील.
        </p>

        <div className="media-grid">

          {/* PHOTOS */}
          <div className="media-card">

            <div className="media-placeholder">
              📸
            </div>

            <h3>Normal Photos</h3>

            <p>
              राजगडाचे high quality photographs.
            </p>

            {fort.photos_url ? (
              <a
                href={fort.photos_url}
                target="_blank"
                rel="noopener noreferrer"
                className="media-button"
              >
                View Photos →
              </a>
            ) : (
              <span className="coming-soon">
                Photos link लवकरच
              </span>
            )}

          </div>

          {/* 360 */}
          <div className="media-card">

            <div className="media-placeholder">
              🌐
            </div>

            <h3>360° Photos</h3>

            <p>
              राजगडाचा immersive 360° अनुभव.
            </p>

            {fort.photos_360_url ? (
              <a
                href={fort.photos_360_url}
                target="_blank"
                rel="noopener noreferrer"
                className="media-button"
              >
                Open 360° →
              </a>
            ) : (
              <span className="coming-soon">
                360° link लवकरच
              </span>
            )}

          </div>

          {/* VIDEO */}
          <div className="media-card">

            <div className="media-placeholder">
              🎥
            </div>

            <h3>Videos</h3>

            <p>
              राजगड ट्रेक आणि गडाची माहिती देणारे videos.
            </p>

            {fort.video_url ? (
              <a
                href={fort.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="media-button"
              >
                Watch Videos →
              </a>
            ) : (
              <span className="coming-soon">
                Video link लवकरच
              </span>
            )}

          </div>

        </div>

      </section>

      {/* 360 EXPERIENCE */}
      <section id="360" className="experience-section">

        <p className="section-label">
          IMMERSIVE EXPERIENCE
        </p>

        <h2>Explore Rajgad in 360°</h2>

        <p>
          राजगडावरील 360° photographs वापरून गडाचा digital experience.
        </p>

        <div className="experience-box">

          <div className="big-icon">
            🌐
          </div>

          <h3>Rajgad 360° Experience</h3>

          <p>
            तुमचे Insta360 X3 photographs येथे जोडले जातील.
          </p>

          {fort.photos_360_url ? (
            <a
              href={fort.photos_360_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Launch 360° →
            </a>
          ) : (
            <span className="coming-soon">
              360° Experience लवकरच
            </span>
          )}

        </div>

      </section>

      {/* GPX */}
      <section className="content-section">

        <p className="section-label">
          TREK DATA
        </p>

        <h2>Rajgad Trek Route</h2>

        <p>
          राजगड ट्रेकचा GPX route आणि trekking information.
        </p>

        <div className="gpx-card">

          <div>
            <span className="gpx-icon">
              🗺️
            </span>

            <div>
              <h3>Rajgad GPX Route</h3>

              <p>
                Trek route file / map
              </p>
            </div>
          </div>

          {fort.gpx_url ? (
            <a
              href={fort.gpx_url}
              target="_blank"
              rel="noopener noreferrer"
              className="media-button"
            >
              View / Download GPX
            </a>
          ) : (
            <span className="coming-soon">
              GPX link लवकरच
            </span>
          )}

        </div>

      </section>

      {/* TREK INFORMATION */}
      <section className="content-section dark-section">

        <p className="section-label">
          TREKKING
        </p>

        <h2>ट्रेकपूर्वी लक्षात ठेवा</h2>

        <div className="tips-grid">

          <div>
            <h3>🥾 योग्य तयारी</h3>
            <p>
              आरामदायी trekking shoes आणि आवश्यक trekking सामान सोबत ठेवा.
            </p>
          </div>

          <div>
            <h3>💧 पाणी</h3>
            <p>
              पुरेसे पाणी आणि आवश्यक food supplies सोबत ठेवा.
            </p>
          </div>

          <div>
            <h3>🌦️ हवामान</h3>
            <p>
              ट्रेकपूर्वी हवामानाची माहिती तपासा.
            </p>
          </div>

          <div>
            <h3>♻️ निसर्ग संवर्धन</h3>
            <p>
              कचरा गडावर न टाकता परत आणा आणि ऐतिहासिक वास्तूंचे संरक्षण करा.
            </p>
          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="content-section about-section">

        <p className="section-label">
          SANKET360
        </p>

        <h2>
          Explore • Experience • Preserve
        </h2>

        <p>
          SANKET360 हा महाराष्ट्रातील किल्ले, पर्वत आणि सुंदर ठिकाणे
          digital photography आणि 360° experience द्वारे explore करण्याचा
          प्रयत्न आहे.
        </p>

        <p>
          इतिहास जतन करा. निसर्ग अनुभवा. सह्याद्रीला जवळून पहा.
        </p>

      </section>

      {/* FOOTER */}
      <footer>

        <strong>SANKET360</strong>

        <p>
          Explore • Experience • Preserve
        </p>

        <p>
          © 2026 SANKET360
        </p>

      </footer>

      {/* PAGE STYLE */}
      <style>{`

        .rajgad-page {
          background: #0b0f0d;
          color: #f5f5f5;
          min-height: 100vh;
          font-family: Arial, Helvetica, sans-serif;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 7%;
          background: rgba(8, 12, 10, 0.95);
          border-bottom: 1px solid #26302a;
        }

        .logo {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .logo span {
          color: #e7a93b;
        }

        .nav-links {
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
        }

        .nav-links a {
          color: #ddd;
          text-decoration: none;
        }

        .nav-links a:hover {
          color: #e7a93b;
        }

        .hero {
          min-height: 75vh;
          display: flex;
          align-items: center;
          padding: 80px 8%;
          background:
            linear-gradient(rgba(5,10,7,.45), rgba(5,10,7,.9)),
            linear-gradient(135deg, #20352a, #111815 60%, #332617);
        }

        .hero-content {
          max-width: 800px;
        }

        .tagline,
        .section-label {
          color: #e7a93b;
          font-size: 13px;
          letter-spacing: 3px;
          font-weight: bold;
        }

        .hero h1 {
          font-size: clamp(60px, 10vw, 120px);
          margin: 10px 0 0;
          line-height: .9;
        }

        .hero h2 {
          font-size: 30px;
          margin: 20px 0;
        }

        .hero p {
          font-size: 19px;
          line-height: 1.7;
          color: #d5d5d5;
          max-width: 700px;
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        .btn,
        .media-button {
          display: inline-block;
          padding: 13px 22px;
          border-radius: 8px;
          background: #e7a93b;
          color: #111;
          text-decoration: none;
          font-weight: bold;
        }

        .btn.secondary {
          background: transparent;
          color: white;
          border: 1px solid #777;
        }

        .info-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          padding: 50px 7%;
          background: #121815;
        }

        .info-card,
        .place-card,
        .media-card,
        .tips-grid > div,
        .history-box,
        .gpx-card {
          border: 1px solid #29342e;
          background: #151c18;
          border-radius: 14px;
          padding: 25px;
        }

        .info-card span {
          font-size: 30px;
        }

        .content-section,
        .experience-section {
          padding: 80px 8%;
        }

        .content-section h2,
        .experience-section h2 {
          font-size: clamp(32px, 5vw, 55px);
          margin: 10px 0 25px;
        }

        .content-section > p,
        .experience-section > p {
          max-width: 800px;
          color: #c8c8c8;
          line-height: 1.8;
          font-size: 17px;
        }

        .history-box {
          margin-top: 30px;
        }

        .history-box li {
          margin: 12px 0;
        }

        .dark-section {
          background: #101512;
        }

        .what-see-box {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-top: 35px;
        }

        .what-see-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
          border: 1px solid #29342e;
          background: #151c18;
          border-radius: 14px;
          padding: 20px;
        }

        .what-see-item span {
          font-size: 25px;
        }

        .what-see-item p {
          margin: 0;
          color: #ddd;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .media-grid,
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 35px;
        }

        .tips-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .media-placeholder {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #222b25;
          border-radius: 10px;
          font-size: 55px;
          margin-bottom: 20px;
        }

        .media-card p,
        .tips-grid p,
        .gpx-card p {
          color: #bbb;
          line-height: 1.6;
        }

        .media-button {
          margin-top: 10px;
          padding: 10px 16px;
          font-size: 14px;
        }

        .coming-soon {
          display: inline-block;
          margin-top: 10px;
          color: #999;
          font-size: 14px;
        }

        .experience-section {
          text-align: center;
          background: #18251e;
        }

        .experience-section > p {
          margin-left: auto;
          margin-right: auto;
        }

        .experience-box {
          max-width: 700px;
          margin: 40px auto 0;
          padding: 60px 30px;
          border: 1px solid #405346;
          border-radius: 18px;
          background: #0d1410;
        }

        .big-icon {
          font-size: 70px;
        }

        .experience-box h3 {
          font-size: 30px;
        }

        .gpx-card {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .gpx-card > div {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .gpx-icon {
          font-size: 40px;
        }

        .about-section {
          text-align: center;
        }

        .about-section > p {
          margin-left: auto;
          margin-right: auto;
        }

        footer {
          text-align: center;
          padding: 50px 20px;
          background: #080b09;
          border-top: 1px solid #26302a;
        }

        footer strong {
          font-size: 24px;
        }

        footer p {
          color: #999;
        }

        @media (max-width: 900px) {

          .info-section,
          .media-grid,
          .tips-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .what-see-box {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .navbar {
            flex-direction: column;
            gap: 15px;
          }

          .nav-links {
            justify-content: center;
          }

          .info-section,
          .media-grid,
          .tips-grid {
            grid-template-columns: 1fr;
          }

          .gpx-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .hero {
            min-height: 65vh;
          }

        }

      `}</style>

    </main>
  );
}