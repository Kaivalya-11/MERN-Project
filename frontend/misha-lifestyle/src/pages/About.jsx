import Header from "../components/layout/Header";
import TopBar from "../components/layout/TopBar";
import Footer from "../components/layout/Footer";
import "../components/styles/about.css";

import studioImg from "../assets/images/studio.jpg";
import founderNayan from "../assets/images/founder-nayan.jpg";
import founderEsha from "../assets/images/founder-esha.jpg";
import founderNeel from "../assets/images/founder-neel.jpg";
import gallery1 from "../assets/images/gallery-1.jpg";
import gallery2 from "../assets/images/gallery-2.jpg";
import gallery3 from "../assets/images/gallery-3.jpg";
import gallery4 from "../assets/images/gallery-4.jpg";

const About = () => {
  return (
    <>
      <TopBar />
      <Header />

      <main className="about-page">

        {/* INTRO */}
        <section className="about-intro">
          <h1>MAISHA BY ESHA</h1>
          <p>
            Maisha is a lifestyle accessory brand based in Ahmedabad, India.
            Our products are handcrafted and handmade by local artisans from
            the finest weaves of cotton and jute. The products are designed
            keeping in mind the aesthetics and versatility that lies in
            cottons & jute and the fine woven textures we’ve been inherited with.
            We use minimal vegan leather instead of animal leather.
          </p>
        </section>

        {/* OUR STUDIO */}
        <section className="about-split">
          <div className="about-image">
            <img src={studioImg} alt="Maisha Studio" />
          </div>
          <div className="about-text">
            <h2>OUR STUDIO</h2>
            <p>
              Our Studio has been created using stone from 30% inputs which are
              reused and upcycled. Some of the articles that we have created are
              more than 70 years old and were lying in a run-down condition at
              dealer of waste material. Our products are perfectly at home when
              they are displayed at our studio which itself is situated in a
              serene surrounding.
            </p>
          </div>
        </section>

        {/* EVENTS */}
        <section className="about-text-block">
          <h2>EVENTS</h2>
          <p>
            Our journey involved events like exhibitions & pop-ups around the
            country. Exhibitions in cities like Ahmedabad, Mumbai, Delhi, Surat,
            Baroda, Kolkata, Rajkot, etc. with a total of approximately 250,000
            footfall has been a place where we meet people from all around and
            interact with customers on one-on-one basis.
          </p>
        </section>

        {/* FOUNDERS */}
        <section className="about-founders">
          <h2>MEET OUR FOUNDERS</h2>
          <div className="founder-grid">
            <div className="founder-card">
              <img src={founderNayan} alt="Nayan Shah" />
              <h3>NAYAN SHAH</h3>
              <span>Co-Founder, Operations Director</span>
            </div>
            <div className="founder-card">
              <img src={founderEsha} alt="Esha Shah" />
              <h3>ESHA SHAH</h3>
              <span>Co-Founder, Creative Director</span>
            </div>
            <div className="founder-card">
              <img src={founderNeel} alt="Neel Vora" />
              <h3>NEEL VORA</h3>
              <span>Co-Founder, Marketing Director</span>
            </div>
          </div>
        </section>

        {/* STUDIO GALLERY */}
        <section className="about-gallery">
          <h2>STUDIO GALLERY</h2>
          <div className="gallery-grid">
            <img src={gallery1} alt="" />
            <img src={gallery2} alt="" />
            <img src={gallery3} alt="" />
            <img src={gallery4} alt="" />
          </div>
        </section>

        {/* GOOGLE REVIEWS (STATIC PLACEHOLDER) */}
        <section className="about-reviews">
          <div className="review-card">
            <h3>Maisha The Studio</h3>
            <p>⭐ 4.3 · 126 reviews on Google</p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;