import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import AdminSidebar from "../components/admin/AdminSidebar";
import SectionTitle from "../components/common/SectionTitle";
import ShowCard from "../components/ui/ShowCard";
// import AlbumCard from "../components/ui/AlbumCard"; // COMENTADO: Discografia
import ConfirmationModal from "../components/ui/ConfirmationModal";
import EditShowModal from "../components/admin/EditShowModal";
// import EditAlbumModal from "../components/admin/EditAlbumModal"; // COMENTADO: Discografia
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import "./Admin.css";
import { useShows } from "../hooks/useShows";
import Toast from "../components/ui/Toast";
// import { useAlbums } from "../hooks/useAlbums"; // COMENTADO: Discografia

registerLocale("pt-BR", ptBR);

export default function AdminDashboard() {
  const navigate = useNavigate();

  // --- HOOKS DE SHOWS ---
  const {
    shows,
    loading: showsLoading,
    error: showsError,
    addShow,
    deleteShow,
    updateShow,
  } = useShows();

  /* --- COMENTADO: HOOKS DE ÁLBUNS ---
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
    addAlbum,
    deleteAlbum,
    updateAlbum,
  } = useAlbums();
  */

  const [activeTab, setActiveTab] = useState("shows");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // --- STATES PARA SHOWS ---
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showImage, setShowImage] = useState(""); // NOVO: Estado para a imagem do show
  const [showToDeleteId, setShowToDeleteId] = useState(null);
  const [showToEdit, setShowToEdit] = useState(null);

  /* --- COMENTADO: STATES PARA ÁLBUNS ---
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumYear, setNewAlbumYear] = useState("");
  const [newAlbumCover, setNewAlbumCover] = useState("");
  const [newAlbumTracksStr, setNewAlbumTracksStr] = useState("");
  const [albumToDeleteId, setAlbumToDeleteId] = useState(null);
  const [albumToEdit, setAlbumToEdit] = useState(null);
  */

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

  // --- HANDLERS DE SHOWS ---
  const handleAddShow = async (e) => {
    e.preventDefault();
    const venueInput = e.target.venue.value;

    if (!selectedDate || !selectedTime || !venueInput) {
      showToast("Preencha data, hora e local!", "error");
      return;
    }

    const newShowData = {
      date: formatDateToString(selectedDate),
      venue: venueInput,
      time: formatTimeToString(selectedTime),
      image: showImage || null, // NOVO: Envia a imagem ou null se estiver vazio
    };

    try {
      await addShow(newShowData);
      showToast("Show adicionado com sucesso!");

      // Resetar form
      e.target.reset();
      setSelectedDate(null);
      setSelectedTime(null);
      setShowImage(""); // Resetar imagem
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

  /* --- COMENTADO: HANDLERS DE ÁLBUNS ---
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
  */

  // Handler genérico para cancelar (usado no modal de show)
  const cancelAction = () => {
    setShowToDeleteId(null);
    setShowToEdit(null);
    // setAlbumToDeleteId(null);
    // setAlbumToEdit(null);
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

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmationModal
        isOpen={!!showToDeleteId /* || !!albumToDeleteId */}
        onClose={cancelAction}
        onConfirm={
          showToDeleteId ? confirmDeleteShow : () => {} /* confirmDeleteAlbum */
        }
        title={showToDeleteId ? "Excluir Show" : "Excluir Item"}
        message={
          showToDeleteId
            ? "Tem certeza que deseja apagar este show? Essa ação é irreversível."
            : "" // "Tem certeza que deseja apagar este álbum..."
        }
      />

      {/* Modal de Edição de Show */}
      <EditShowModal
        isOpen={!!showToEdit}
        showToEdit={showToEdit}
        onClose={cancelAction}
        onSave={handleSaveEditShow}
      />

      {/* <EditAlbumModal
        isOpen={!!albumToEdit}
        albumToEdit={albumToEdit}
        onClose={cancelAction}
        onSave={handleSaveEditAlbum}
      />
      */}

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
              {/* NOVO: Input para URL da Imagem - Coloquei acima para ocupar largura */}
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="url"
                  placeholder="URL da Imagem do Show (https://...)"
                  value={showImage}
                  onChange={(e) => setShowImage(e.target.value)}
                  className="datepicker-input"
                  style={{ width: "100%", boxSizing: "border-box" }}
                />
              </div>

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
                      // image={show.image} // Já é passado pelo spread {...show}
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

        {/* {activeTab === "discography" && (
          <section className="tab-content active">
             ... TODO O CONTEÚDO DE DISCOGRAFIA FOI OCULTADO ...
          </section>
        )}
        */}
      </main>
    </div>
  );
}
