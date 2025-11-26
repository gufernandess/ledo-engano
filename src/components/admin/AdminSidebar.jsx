import React from "react";

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="sidebar">
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
        >
          ADMIN AREA
        </span>
      </div>

      <nav className="admin-nav">
        <button
          className={`nav-btn ${activeTab === "shows" ? "active" : ""}`}
          onClick={() => setActiveTab("shows")}
        >
          🎤 Gerenciar Shows
        </button>

        <button
          className={`nav-btn ${activeTab === "discography" ? "active" : ""}`}
          onClick={() => setActiveTab("discography")}
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
