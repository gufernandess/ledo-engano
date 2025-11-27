export default function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
  isOpen,
  onClose,
}) {
  const handleNavClick = (tabName) => {
    setActiveTab(tabName);
    onClose();
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

        <button
          className={`nav-btn ${activeTab === "discography" ? "active" : ""}`}
          onClick={() => handleNavClick("discography")}
        >
          💿 Discografia
        </button>

        <button className="nav-btn logout" onClick={onLogout}>
          🚪 Sair
        </button>
      </nav>
    </aside>
  );
}
