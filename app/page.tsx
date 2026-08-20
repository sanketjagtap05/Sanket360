export default function Home() {
  return (
    <main className="site">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          SANKET<span>360</span>
        </div>

        <div className="navLinks">
          <a href="#home">Home</a>
          <a href="#forts">Forts</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="heroContent">
          <p className="smallTitle">
            EXPLORE • EXPERIENCE • PRESERVE
          </p>

          <h1>
            Earth
            <br />
            in 360°
          </h1>

          <p>
            Explore forts,temples,historical places, mountains and beautiful places of
            Maharashtra through immersive 360° & normal photography.
          </p>

          <a href="#forts" className="button">
            EXPLORE NOW →
          </a>
        </div>
      </section>

      {/* Forts */}
<section id="Forts">
  <h2>Explore the Forts</h2>

  <p className="sectionText">
    Discover Maharashtra's historic forts through
    immersive photography and 360° experiences.
  </p>

  <div className="cards">

    <a href="/forts/rajgad" className="card">
      <h3>Rajgad</h3>
      <p>
        Explore the historic capital of Chhatrapati
        Shivaji Maharaj through 360° photography.
      </p>
    </a>

    <a href="/forts/sudhagad" className="card">
      <h3>Sudhagad</h3>
      <p>
        Discover the beautiful Sahyadri landscapes
        and heritage of Sudhagad.
      </p>
    </a>

    <a href="/forts/tikona" className="card">
      <h3>Tikona</h3>
      <p>
        Experience the iconic triangular fort and
        surrounding valleys in 360°.
      </p>
    </a>

  </div>
</section>
        
      
      {/* FOOTER */}
      <footer>
        <strong>SANKET360</strong>
        <p>Explore • Experience • Preserve</p>
        <p>© 2026 SANKET360</p>
      </footer>

    </main>
  );
}