import "../components/landing/Landing.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Hero from "../components/landing/Hero";
import Members from "../components/landing/Members";
import Shows from "../components/landing/Shows";
import Discography from "../components/landing/Discography";
import Contact from "../components/landing/Contact";

export default function LandingPage({ shows, albums }) {
  return (
    <>
      <Navbar />
      <Hero />
      <section id="members">
        <h2 className="section-title">
          <Members />
        </h2>
      </section>
      <Shows showsData={shows} />
      <Discography albumsData={albums} />
      <Contact />
      <Footer />
    </>
  );
}
