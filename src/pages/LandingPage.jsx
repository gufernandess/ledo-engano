import Navbar from "../components/common/Navbar";
import Hero from "../components/landing/Hero";
import Members from "../components/landing/Members";
import BandVideo from "../components/landing/BandVideo";
import Shows from "../components/landing/Shows";
import Footer from "../components/common/Footer";
import "../components/landing/Landing.css";
import { useShows } from "../hooks/useShows";
import { useAlbums } from "../hooks/useAlbums";
import Discography from "../components/landing/Discography";
import Contact from "../components/landing/Contact";

export default function LandingPage() {
  const { shows, loading: showsLoading, error: showsError } = useShows();

  const { albums, loading: albumsLoading, error: albumsError } = useAlbums();

  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Members />
      <BandVideo />

      {showsLoading && (
        <p style={{ color: "var(--light)", textAlign: "center" }}>
          Carregando shows...
        </p>
      )}
      {showsError && (
        <p style={{ color: "red", textAlign: "center" }}>
          Erro ao carregar shows.
        </p>
      )}
      {!showsLoading && !showsError && <Shows showsData={shows} />}

      {/* {albumsLoading && (
        <p
          style={{
            color: "var(--light)",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          Carregando discografia...
        </p>
      )}
      {albumsError && (
        <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
          Erro ao carregar discografia.
        </p>
      )}
      {!albumsLoading && !albumsError && <Discography albumsData={albums} />}*/}

      <Contact />
      <Footer />
    </div>
  );
}
