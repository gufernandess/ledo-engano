import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { FiLogOut } from "react-icons/fi";

export default function AdminSidebar({
  activeTab,
  setActiveTab,

  isOpen,
  onClose,
}) {
  const navigate = useNavigate();

  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao sair: ", error);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="brand">
        <h2>LEDO ENGANO</h2>
        <span
          style={{
            display: "block",
            fontSize: "0.7rem",
            letterSpacing: "4px",
            color: "var(--light)",
            marginTop: "5px",
          }}
        ></span>
      </div>

      <nav className="admin-nav">
        <button
          className={`nav-btn ${activeTab === "shows" ? "active" : ""}`}
          onClick={() => handleNavClick("shows")}
        >
          🎤 Gerenciar Shows
        </button>

        {/* <button
          className={`nav-btn ${activeTab === "discography" ? "active" : ""}`}
          onClick={() => handleNavClick("discography")}
        >
          💿 Discografia
        </button>*/}

        <button className="nav-btn logout" onClick={handleLogout}>
          <FiLogOut style={{ marginRight: "8px" }} />
          Sair
        </button>
      </nav>
    </aside>
  );
}
