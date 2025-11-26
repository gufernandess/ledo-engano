import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} LEDO ENGANO. Todos os direitos reservados.</p>
      <p
        style={{
          marginTop: "0.5rem",
          fontFamily: "Oswald, sans-serif",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--primary)",
        }}
      >
        Punk Rock nunca morre.
      </p>
    </footer>
  );
}
