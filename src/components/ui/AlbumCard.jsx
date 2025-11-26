import "./Cards.css";

export default function AlbumCard({
  title,
  year,
  tracks,
  isAdmin,
  onDelete,
  onEdit,
}) {
  const trackList = Array.isArray(tracks)
    ? tracks
    : tracks.split(",").map((t) => t.trim());

  return (
    <div className="album-card reveal">
      <div className="album-cover">
        <div className="album-title">
          {title.split(" ").map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </div>
      </div>

      <div className="album-info">
        <h3 className="album-name">{title}</h3>
        <p className="album-year">{year}</p>

        <ul className="album-tracks">
          {trackList.map((track, i) => (
            <li key={i}>{track}</li>
          ))}
        </ul>

        {isAdmin && (
          <div
            className="admin-actions"
            style={{
              marginTop: "1rem",
              borderTop: "1px solid #444",
              paddingTop: "0.5rem",
            }}
          >
            <button className="action-btn btn-edit" onClick={onEdit}>
              Editar
            </button>
            <button className="action-btn btn-delete" onClick={onDelete}>
              Remover
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
