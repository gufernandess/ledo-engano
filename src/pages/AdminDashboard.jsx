import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "../components/admin/AdminSidebar";
import SectionTitle from "../components/common/SectionTitle";
import ShowCard from "../components/ui/ShowCard";
import AlbumCard from "../components/ui/AlbumCard";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import EditShowModal from "../components/admin/EditShowModal";
import EditAlbumModal from "../components/admin/EditAlbumModal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import "./Admin.css";

registerLocale("pt-BR", ptBR);

export default function AdminDashboard({ shows, setShows, albums, setAlbums }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("shows");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showToDeleteId, setShowToDeleteId] = useState(null);
  const [showToEdit, setShowToEdit] = useState(null);

  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumYear, setNewAlbumYear] = useState("");
  const [newAlbumCover, setNewAlbumCover] = useState("");
  const [newAlbumTracksStr, setNewAlbumTracksStr] = useState("");

  const [albumToDeleteId, setAlbumToDeleteId] = useState(null);
  const [albumToEdit, setAlbumToEdit] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleLogout = () => navigate("/admin");
  const formatDateToString = (date) =>
    date ? date.toLocaleDateString("pt-BR") : "";
  const formatTimeToString = (time) =>
    time
      ? time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      : "";

  const handleAddShow = (e) => {
    e.preventDefault();
    const venueInput = e.target.venue.value;
    if (!selectedDate || !selectedTime || !venueInput) {
      alert("Preencha todos os campos!");
      return;
    }
    const newShow = {
      id: Date.now(),
      date: formatDateToString(selectedDate),
      venue: venueInput,
      time: formatTimeToString(selectedTime),
    };
    setShows([...shows, newShow]);
    e.target.reset();
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const promptDeleteShow = (id) => setShowToDeleteId(id);
  const confirmDeleteShow = () => {
    if (showToDeleteId) {
      setShows(shows.filter((s) => s.id !== showToDeleteId));
      setShowToDeleteId(null);
    }
  };

  const promptEditShow = (show) => setShowToEdit(show);
  const handleSaveEditShow = (updatedShow) => {
    setShows(shows.map((s) => (s.id === updatedShow.id ? updatedShow : s)));
    setShowToEdit(null);
  };

  const handleAddAlbum = (e) => {
    e.preventDefault();
    if (!newAlbumTitle || !newAlbumYear) {
      alert("Título e Ano são obrigatórios!");
      return;
    }

    const tracksArray = newAlbumTracksStr
      .split("\n")
      .filter((line) => line.trim() !== "");

    const newAlbum = {
      id: Date.now(),
      title: newAlbumTitle,
      year: newAlbumYear,
      cover: newAlbumCover || null,
      tracks: tracksArray,
    };

    setAlbums([...albums, newAlbum]);

    setNewAlbumTitle("");
    setNewAlbumYear("");
    setNewAlbumCover("");
    setNewAlbumTracksStr("");
  };

  const promptDeleteAlbum = (id) => setAlbumToDeleteId(id);

  const cancelDelete = () => {
    setShowToDeleteId(null);
    setAlbumToDeleteId(null);
  };

  const confirmDeleteAlbum = () => {
    if (albumToDeleteId) {
      setAlbums(albums.filter((a) => a.id !== albumToDeleteId));
      setAlbumToDeleteId(null);
    }
  };
  const promptEditAlbum = (album) => setAlbumToEdit(album);

  const cancelEdit = () => {
    setShowToEdit(null);
    setAlbumToEdit(null);
  };

  const handleSaveEditAlbum = (updatedAlbum) => {
    setAlbums(albums.map((a) => (a.id === updatedAlbum.id ? updatedAlbum : a)));
    setAlbumToEdit(null);
  };
  return (
    <div className="admin-container">
      <ConfirmationModal
        isOpen={!!showToDeleteId || !!albumToDeleteId}
        onClose={cancelDelete}
        onConfirm={showToDeleteId ? confirmDeleteShow : confirmDeleteAlbum}
        title={showToDeleteId ? "Excluir Show" : "Excluir Álbum"}
        message={
          showToDeleteId
            ? "Tem certeza que deseja apagar este show? Essa ação é irreversível."
            : "Tem certeza que deseja apagar este álbum e suas faixas? Essa ação é irreversível."
        }
      />
      <EditShowModal
        isOpen={!!showToEdit}
        showToEdit={showToEdit}
        onClose={cancelEdit}
        onSave={handleSaveEditShow}
      />
      <EditAlbumModal
        isOpen={!!albumToEdit}
        albumToEdit={albumToEdit}
        onClose={cancelEdit}
        onSave={handleSaveEditAlbum}
      />
      <button className="menu-toggle-btn" onClick={toggleSidebar}>
        <FiMenu size={24} color="var(--primary)" />
      </button>
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <main className="content">
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
        {activeTab === "shows" && (
          <section className="tab-content active">
            <SectionTitle>Gerenciar Shows</SectionTitle>
            <form onSubmit={handleAddShow} className="admin-form">
              <div className="admin-form-row">
                <div className="custom-datepicker-wrapper">
                  <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Data"
                    locale="pt-BR"
                    className="datepicker-input"
                    required
                    autoComplete="off"
                  />
                </div>
                <input
                  type="text"
                  name="venue"
                  placeholder="Local do Show"
                  required
                />
                <div className="custom-datepicker-wrapper">
                  <DatePicker
                    selected={selectedTime}
                    onChange={setSelectedTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="HH:mm"
                    placeholderText="Horário"
                    locale="pt-BR"
                    className="datepicker-input"
                    required
                    autoComplete="off"
                  />
                </div>
                <button className="cta-button small">+</button>
              </div>
            </form>
            <div className="shows-list-admin">
              {shows.map((show) => (
                <ShowCard
                  key={show.id}
                  {...show}
                  isAdmin={true}
                  onDelete={() => promptDeleteShow(show.id)}
                  onEdit={() => promptEditShow(show)}
                />
              ))}
            </div>
          </section>
        )}
        {activeTab === "discography" && (
          <section className="tab-content active">
            <SectionTitle>Gerenciar Discografia</SectionTitle>
            <form
              onSubmit={handleAddAlbum}
              className="admin-form"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "3fr 1fr",
                  gap: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="Título do Álbum"
                  value={newAlbumTitle}
                  onChange={(e) => setNewAlbumTitle(e.target.value)}
                  required
                  className="datepicker-input"
                  style={{ height: "50px", margin: 0 }}
                />
                <input
                  type="text"
                  placeholder="Ano"
                  value={newAlbumYear}
                  onChange={(e) => setNewAlbumYear(e.target.value)}
                  required
                  className="datepicker-input"
                  style={{ height: "50px", margin: 0 }}
                />
              </div>
              <input
                type="url"
                placeholder="URL da Imagem da Capa (https://...)"
                value={newAlbumCover}
                onChange={(e) => setNewAlbumCover(e.target.value)}
                className="datepicker-input"
                style={{ height: "50px", margin: 0, width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <textarea
                  placeholder="Lista de Faixas (Uma por linha)"
                  value={newAlbumTracksStr}
                  onChange={(e) => setNewAlbumTracksStr(e.target.value)}
                  className="datepicker-input"
                  style={{
                    height: "100px",
                    resize: "vertical",
                    flexGrow: 1,
                    margin: 0,
                    paddingTop: "10px",
                  }}
                />
                <button
                  className="cta-button small"
                  style={{ height: "100px", margin: 0 }}
                >
                  +
                </button>
              </div>
            </form>
            <div className="shows-list-admin">
              {albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  {...album}
                  isAdmin={true}
                  onDelete={() => promptDeleteAlbum(album.id)}
                  onEdit={() => promptEditAlbum(album)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
