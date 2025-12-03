import { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import Toast from "../components/ui/Toast";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Erro no login:", error.code, error.message);

      let errorMessage = "Falha ao acessar. Verifique seus dados.";

      if (error.code === "auth/invalid-credential") {
        errorMessage = "E-mail ou senha incorretos.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Muitas tentativas. Tente novamente mais tarde.";
      }

      setToast({
        type: "error",
        message: `❌ ${errorMessage}`,
      });
      setIsLoggingIn(false);
    }
  };

  return (
    <div id="login-overlay" style={{ display: "flex" }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="login-box">
        <h1 className="glitch" data-text="RESTRITO">
          RESTRITO
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
              type="email"
              placeholder="E-mail de acesso"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="cta-button full"
            disabled={isLoggingIn}
            style={{ opacity: isLoggingIn ? 0.7 : 1 }}
          >
            {isLoggingIn ? "Acessando..." : "Acessar Sistema"}
          </button>
        </form>
        <div
          style={{
            marginTop: "2rem",
            borderTop: "1px solid #333",
            paddingTop: "1rem",
          }}
        ></div>
      </div>
    </div>
  );
}
