import { useState, useEffect } from "react";

export default function EditAlbumModal({
  isOpen,
  onClose,
  onSave,
  albumToEdit,
}) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedYear, setEditedYear] = useState("");
  const [editedCover, setEditedCover] = useState("");
  const [editedTracksStr, setEditedTracksStr] = useState("");

  useEffect(() => {
    if (albumToEdit) {
      setEditedTitle(albumToEdit.title);
      setEditedYear(albumToEdit.year);
      setEditedCover(albumToEdit.cover || "");

      setEditedTracksStr(
        albumToEdit.tracks ? albumToEdit.tracks.join("\n") : "",
      );
    }
  }, [albumToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editedTitle || !editedYear) {
      alert("Título e Ano são obrigatórios.");
      return;
    }
    const tracksArray = editedTracksStr
      .split("\n")
      .filter((line) => line.trim() !== "");

    const updatedAlbum = {
      id: albumToEdit.id,
      title: editedTitle,
      year: editedYear,
      cover: editedCover,
      tracks: tracksArray,
    };

    onSave(updatedAlbum);
    onClose();
  };

  if (!isOpen) return null;
  const labelStyle = {
    color: "var(--primary)",
    fontFamily: "var(--font-display)",
    marginBottom: "5px",
    display: "block",
    fontSize: "0.9rem",
    letterSpacing: "1px",
  };
  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    background: "rgba(226, 226, 226, 0.1)",
    border: "2px solid var(--primary)",
    color: "var(--secondary)",
    fontFamily: "var(--font-body)",
    marginBottom: "1rem",
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "600px" }}
      >
        <div className="modal-header">
          <h3>Editar Álbum</h3>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <form id="edit-album-form" onSubmit={handleSubmit}>
            <div>
              <label style={labelStyle}>Título do Álbum:</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Ano de Lançamento:</label>
              <input
                type="text"
                value={editedYear}
                onChange={(e) => setEditedYear(e.target.value)}
                required
                style={inputStyle}
                placeholder="Ex: 2023"
              />
            </div>
            <div>
              <label style={labelStyle}>URL da Capa (Imagem):</label>
              <input
                type="url"
                value={editedCover}
                onChange={(e) => setEditedCover(e.target.value)}
                style={inputStyle}
                placeholder="https://..."
              />
            </div>
            <div>
              <label style={labelStyle}>Faixas (Uma por linha):</label>
              <textarea
                value={editedTracksStr}
                onChange={(e) => setEditedTracksStr(e.target.value)}
                style={{ ...inputStyle, height: "120px", resize: "vertical" }}
                placeholder="Faixa 1&#10;Faixa 2&#10;Faixa 3..."
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button className="cta-button secondary small" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            form="edit-album-form"
            className="cta-button small"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--secondary)",
            }}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
