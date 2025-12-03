import React, { useState } from "react";
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
import { useShows } from "../hooks/useShows";
import Toast from "../components/ui/Toast";
import { useAlbums } from "../hooks/useAlbums";

registerLocale("pt-BR", ptBR);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    shows,
    loading: showsLoading,
    error: showsError,
    addShow,
    deleteShow,
    updateShow,
  } = useShows();
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
    addAlbum,
    deleteAlbum,
    updateAlbum,
  } = useAlbums();

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
  const [toast, setToast] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleLogout = () => navigate("/admin");
  const formatDateToString = (date) =>
    date ? date.toLocaleDateString("pt-BR") : "";
  const formatTimeToString = (time) =>
    time
      ? time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      : "";
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddShow = async (e) => {
    e.preventDefault();
    const venueInput = e.target.venue.value;
    if (!selectedDate || !selectedTime || !venueInput) {
      showToast("Preencha todos os campos!", "error");
      return;
    }
    const newShowData = {
      date: formatDateToString(selectedDate),
      venue: venueInput,
      time: formatTimeToString(selectedTime),
    };
    try {
      await addShow(newShowData);
      showToast("Show adicionado com sucesso!");
      e.target.reset();
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error) {
      showToast("Erro ao adicionar show.", error);
    }
  };

  const promptDeleteShow = (id) => setShowToDeleteId(id);
  const confirmDeleteShow = async () => {
    if (showToDeleteId) {
      try {
        await deleteShow(showToDeleteId);
        showToast("Show deletado com sucesso!");
      } catch (error) {
        showToast("Erro ao deletar show.", error);
      } finally {
        setShowToDeleteId(null);
      }
    }
  };

  const promptEditShow = (show) => setShowToEdit(show);
  const handleSaveEditShow = async (updatedShow) => {
    try {
      const { id, ...dataToUpdate } = updatedShow;
      await updateShow(id, dataToUpdate);
      showToast("Show atualizado com sucesso!");
      setShowToEdit(null);
    } catch (error) {
      showToast("Erro ao atualizar show.", error);
    }
  };

  const handleAddAlbum = async (e) => {
    e.preventDefault();
    if (!newAlbumTitle || !newAlbumYear) {
      showToast("Título e Ano são obrigatórios!");
      return;
    }
    const tracksArray = newAlbumTracksStr
      .split("\n")
      .filter((line) => line.trim() !== "");
    const newAlbumData = {
      title: newAlbumTitle,
      year: newAlbumYear,
      cover: newAlbumCover || null,
      tracks: tracksArray,
    };
    try {
      await addAlbum(newAlbumData);
      showToast("Álbum adicionado com sucesso!");
      setNewAlbumTitle("");
      setNewAlbumYear("");
      setNewAlbumCover("");
      setNewAlbumTracksStr("");
    } catch (error) {
      showToast("Erro ao adicionar álbum.", error);
    }
  };

  const promptDeleteAlbum = (id) => setAlbumToDeleteId(id);
  const cancelDelete = () => {
    setShowToDeleteId(null);
    setAlbumToDeleteId(null);
  };
  const confirmDeleteAlbum = async () => {
    if (albumToDeleteId) {
      try {
        await deleteAlbum(albumToDeleteId);
        showToast("Álbum deletado com sucesso!");
      } catch (error) {
        showToast("Erro ao deletar álbum.", error);
      } finally {
        setAlbumToDeleteId(null);
      }
    }
  };

  const promptEditAlbum = (album) => setAlbumToEdit(album);
  const cancelEdit = () => {
    setShowToEdit(null);
    setAlbumToEdit(null);
  };
  const handleSaveEditAlbum = async (updatedAlbum) => {
    try {
      const { id, ...dataToUpdate } = updatedAlbum;
      await updateAlbum(id, dataToUpdate);
      showToast("Álbum atualizado com sucesso!");
      setAlbumToEdit(null);
    } catch (error) {
      showToast("Erro ao atualizar álbum.", error);
    }
  };

  return (
    <div className="admin-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
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
            {showsLoading && (
              <p style={{ color: "var(--light)" }}>
                Carregando shows do banco de dados...
              </p>
            )}
            {showsError && <p style={{ color: "red" }}>Erro: {showsError}</p>}
            {!showsLoading && !showsError && (
              <div className="shows-list-admin">
                {shows.length === 0 ? (
                  <p style={{ color: "var(--light)" }}>
                    Nenhum show cadastrado.
                  </p>
                ) : (
                  shows.map((show) => (
                    <ShowCard
                      key={show.id}
                      {...show}
                      isAdmin={true}
                      onDelete={() => promptDeleteShow(show.id)}
                      onEdit={() => promptEditShow(show)}
                    />
                  ))
                )}
              </div>
            )}
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
            {albumsLoading && (
              <p style={{ color: "var(--light)" }}>
                Carregando álbuns do banco de dados...
              </p>
            )}
            {albumsError && <p style={{ color: "red" }}>Erro: {albumsError}</p>}
            {!albumsLoading && !albumsError && (
              <div className="shows-list-admin">
                {albums.length === 0 ? (
                  <p style={{ color: "var(--light)" }}>
                    Nenhum álbum cadastrado.
                  </p>
                ) : (
                  albums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      {...album}
                      isAdmin={true}
                      onDelete={() => promptDeleteAlbum(album.id)}
                      onEdit={() => promptEditAlbum(album)}
                    />
                  ))
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
