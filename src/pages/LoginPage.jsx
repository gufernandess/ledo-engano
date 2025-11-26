import { useState } from "react";
import "./Admin.css";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === "admin" && password === "1234") {
      navigate("/admin/dashboard");
    } else {
      alert("Acesso Negado! Tente:\nUsuário: admin\nSenha: 1234");
    }
  };

  return (
    <div id="login-overlay" style={{ display: "flex" }}>
      <div className="login-box">
        <h1 className="glitch" data-text="RESTRICTED">
          RESTRICTED
        </h1>
        <p
          style={{
            margin: "1rem 0",
            color: "var(--primary)",
            fontFamily: "Oswald",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Área Administrativa
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Usuário (admin)"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <input
              type="password"
              placeholder="Senha (1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="cta-button full">
            Acessar Sistema
          </button>
        </form>

        <div
          style={{
            marginTop: "2rem",
            borderTop: "1px solid #333",
            paddingTop: "1rem",
          }}
        >
          <Link
            to="/"
            style={{
              color: "var(--light)",
              fontSize: "0.9rem",
              transition: "0.3s",
            }}
          >
            ← Voltar para o Site Público
          </Link>
        </div>
      </div>
    </div>
  );
}
