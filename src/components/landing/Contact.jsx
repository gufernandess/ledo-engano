import { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import { FaInstagram, FaSpotify, FaSoundcloud } from "react-icons/fa";

import Toast from "../ui/Toast";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/SEU_CODIGO_AQUI";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setToast({
          type: "success",
          message: "🤘 Mensagem enviada! Entraremos em contato em breve.",
        });
        e.target.reset();
      } else {
        throw new Error("Erro no envio");
      }
    } catch (error) {
      setToast({
        type: "error",
        message: "❌ Ops! Erro ao enviar. Tente novamente.",
      });
      console.error("Erro de formulário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    color: "var(--light)",
    letterSpacing: "1px",
  };

  return (
    <section id="contact" style={{ position: "relative" }}>
      <SectionTitle>Contatos</SectionTitle>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
              <label htmlFor="email" style={labelStyle}>
                Seu E-mail
              </label>

              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject" style={labelStyle}>
                Assunto
              </label>
              <input type="text" id="subject" name="subject" required />
            </div>

            <div className="form-group">
              <label htmlFor="message" style={labelStyle}>
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
              ></textarea>
            </div>

            <button
              type="submit"
              className="cta-button full"
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
