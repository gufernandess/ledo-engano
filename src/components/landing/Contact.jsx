import { useState, useRef } from "react";
import SectionTitle from "../common/SectionTitle";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import Toast from "../ui/Toast";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const formRef = useRef();

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const now = new Date();
    const formattedTime = now.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const timeInput = document.createElement("input");
    timeInput.type = "hidden";
    timeInput.name = "time";
    timeInput.value = formattedTime;
    formRef.current.appendChild(timeInput);

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );

      console.log("Email enviado com sucesso:", result.text);

      setToast({
        type: "success",
        message: "🤘 Mensagem enviada! Entraremos em contato em breve.",
      });
      e.target.reset();
    } catch (error) {
      console.error("Erro ao enviar email:", error.text);
      setToast({
        type: "error",
        message: "❌ Ops! Erro ao enviar pelo EmailJS. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
      formRef.current.removeChild(timeInput);
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
            href="https://www.youtube.com/@BandaLedoEngano"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/ledoenganoband/"
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <div className="contact-form">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" style={labelStyle}>
                Seu Nome
              </label>
              <input type="text" id="name" name="name" required />
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
