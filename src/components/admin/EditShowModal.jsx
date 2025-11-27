import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

const parseDateString = (dateStr) => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split("/");

  return new Date(year, month - 1, day);
};

const parseTimeString = (timeStr) => {
  if (!timeStr) return null;
  const [hours, minutes] = timeStr.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date;
};

const formatDateToString = (date) =>
  date ? date.toLocaleDateString("pt-BR") : "";
const formatTimeToString = (time) =>
  time
    ? time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "";

export default function EditShowModal({ isOpen, onClose, onSave, showToEdit }) {
  const [editedDate, setEditedDate] = useState(null);
  const [editedVenue, setEditedVenue] = useState("");
  const [editedTime, setEditedTime] = useState(null);

  useEffect(() => {
    if (showToEdit) {
      setEditedDate(parseDateString(showToEdit.date));
      setEditedVenue(showToEdit.venue);
      setEditedTime(parseTimeString(showToEdit.time));
    }
  }, [showToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editedDate || !editedTime || !editedVenue) {
      alert("Preencha todos os campos para salvar.");
      return;
    }

    const updatedShow = {
      id: showToEdit.id,
      date: formatDateToString(editedDate),
      venue: editedVenue,
      time: formatTimeToString(editedTime),
    };

    onSave(updatedShow);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "600px" }}
      >
        <div className="modal-header">
          <h3>Editar Show</h3>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <form id="edit-form" onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div>
                <label
                  style={{
                    color: "var(--primary)",
                    fontFamily: "var(--font-display)",
                    marginBottom: "5px",
                    display: "block",
                  }}
                >
                  Data:
                </label>
                <div className="custom-datepicker-wrapper">
                  <DatePicker
                    selected={editedDate}
                    onChange={(date) => setEditedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    className="datepicker-input"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    color: "var(--primary)",
                    fontFamily: "var(--font-display)",
                    marginBottom: "5px",
                    display: "block",
                  }}
                >
                  Local:
                </label>
                <input
                  type="text"
                  value={editedVenue}
                  onChange={(e) => setEditedVenue(e.target.value)}
                  className="datepicker-input"
                  required
                  style={{ height: "50px", margin: 0 }}
                />
              </div>

              <div>
                <label
                  style={{
                    color: "var(--primary)",
                    fontFamily: "var(--font-display)",
                    marginBottom: "5px",
                    display: "block",
                  }}
                >
                  Horário:
                </label>
                <div className="custom-datepicker-wrapper">
                  <DatePicker
                    selected={editedTime}
                    onChange={(date) => setEditedTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="HH:mm"
                    locale="pt-BR"
                    className="datepicker-input"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button className="cta-button secondary small" onClick={onClose}>
            Cancelar
          </button>

          <button
            type="submit"
            form="edit-form"
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
