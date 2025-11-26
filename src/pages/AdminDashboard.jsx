import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "../components/admin/AdminSidebar";
import SectionTitle from "../components/common/SectionTitle";
import ShowCard from "../components/ui/ShowCard";

export default function AdminDashboard({ shows, setShows, albums, setAlbums }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("shows");

  const handleLogout = () => navigate("/admin");

  const handleDeleteShow = (id) => {
    if (window.confirm("Deletar?")) setShows(shows.filter((s) => s.id !== id));
  };

  const handleAddShow = (e) => {
    e.preventDefault();
    const newShow = {
      id: Date.now(),
      date: e.target.date.value,
      venue: e.target.venue.value,
      time: e.target.time.value,
    };
    setShows([...shows, newShow]);
    e.target.reset();
  };

  return (
    <div className="admin-container">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="content">
        {activeTab === "shows" && (
          <section className="tab-content active">
            <SectionTitle>Gerenciar Shows</SectionTitle>

            <form
              onSubmit={handleAddShow}
              className="admin-form"
              style={{ marginBottom: "2rem" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr auto",
                  gap: "10px",
                }}
              >
                <input name="date" placeholder="Data" required />
                <input name="venue" placeholder="Local" required />
                <input name="time" placeholder="Hora" required />
                <button className="cta-button small">+</button>
              </div>
            </form>

            <div className="shows-list-admin">
              {shows.map((show) => (
                <ShowCard
                  key={show.id}
                  {...show}
                  isAdmin={true}
                  onDelete={() => handleDeleteShow(show.id)}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === "discography" && (
          <div className="tab-content active">
            <SectionTitle>Gerenciar Discografia</SectionTitle>
            <p>Implemente o CRUD de álbuns aqui seguindo o padrão acima.</p>
          </div>
        )}
      </main>
    </div>
  );
}
