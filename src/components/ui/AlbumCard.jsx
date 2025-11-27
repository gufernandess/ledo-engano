import "./Cards.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function AlbumCard({
  id,
  title,
  year,
  cover,
  tracks,
  isAdmin,
  onDelete,
  onEdit,
}) {
  return (
    <div className="album-card">
      <div
        className="album-cover"
        style={{ backgroundImage: `url(${cover})`, backgroundSize: "cover" }}
      >
        {!cover && title}
      </div>

      <div className="album-info">
        <h3 className="album-name">{title}</h3>
        <p className="album-year">{year}</p>

        {tracks && tracks.length > 0 && (
          <ul className="album-tracks">
            {tracks.map((track, index) => (
              <li key={index}>{track}</li>
            ))}
          </ul>
        )}
        {isAdmin && (
          <div className="admin-actions">
            <button
              className="action-btn btn-edit"
              onClick={onEdit}
              title="Editar Álbum"
            >
              <FiEdit2 /> Editar
            </button>
            <button
              className="action-btn btn-delete"
              onClick={onDelete}
              title="Excluir Álbum"
            >
              <FiTrash2 /> Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
