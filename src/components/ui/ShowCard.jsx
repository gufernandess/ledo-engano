import "./Cards.css";

export default function ShowCard({
  date,
  venue,
  time,
  image,
  isAdmin,
  onDelete,
  onEdit,
}) {
  return (
    <div
      className={`show-card reveal ${isAdmin ? "admin-mode" : ""}`}
      style={{
        backgroundImage: image
          ? `url(${image})`
          : "linear-gradient(to bottom, #1a1a1a, #000)",
      }}
    >
      <div className="show-date">{date}</div>
      <div className="show-venue">{venue}</div>
      <div className="show-time">{time}</div>

      {isAdmin && (
        <div
          className="admin-actions"
          style={{
            width: "100%",
            marginTop: "1rem",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            className="action-btn btn-edit"
            onClick={onEdit}
            style={{ flex: 1 }}
          >
            Editar
          </button>
          <button
            className="action-btn btn-delete"
            onClick={onDelete}
            style={{ width: "50px" }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
