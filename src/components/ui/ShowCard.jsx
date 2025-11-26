import "./Cards.css";

export default function ShowCard({
  date,
  venue,
  time,
  isAdmin,
  onDelete,
  onEdit,
}) {
  return (
    <div className={`show-card reveal ${isAdmin ? "admin-mode" : ""}`}>
      <div className="show-date">{date}</div>
      <div className="show-venue">{venue}</div>
      <div className="show-time">{time}</div>

      {!isAdmin ? (
        <a href="#" className="show-button">
          Comprar Ingressos
        </a>
      ) : (
        <div className="admin-actions">
          <button className="action-btn btn-edit" onClick={onEdit}>
            Editar
          </button>
          <button className="action-btn btn-delete" onClick={onDelete}>
            X
          </button>
        </div>
      )}
    </div>
  );
}
