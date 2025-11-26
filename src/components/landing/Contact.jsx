import SectionTitle from "../common/SectionTitle";
import { FaInstagram, FaSpotify, FaSoundcloud } from "react-icons/fa";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Obrigado por entrar em contato! (Simulação)");
    e.target.reset();
  };

  return (
    <section id="contact">
      <SectionTitle>Contatos</SectionTitle>

      <div className="contact-content">
        <div className="social-links">
          <a
            href="https://instagram.com/ledoenganoband"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="Spotify"
          >
            <FaSpotify />
          </a>

          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="SoundCloud"
          >
            <FaSoundcloud />
          </a>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  color: "var(--light)",
                }}
              >
                Nome
              </label>
              <input type="text" id="name" required />
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  color: "var(--light)",
                }}
              >
                Email
              </label>
              <input type="email" id="email" required />
            </div>

            <div className="form-group">
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontFamily: "Oswald",
                  textTransform: "uppercase",
                  color: "var(--light)",
                }}
              >
                Mensagem
              </label>
              <textarea id="message" required rows="5"></textarea>
            </div>

            <button type="submit" className="cta-button full">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
