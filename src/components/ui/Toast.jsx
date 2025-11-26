import React, { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const toastStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: type === "success" ? "#28a745" : "#dc3545",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 9999,
    fontFamily: "var(--font-body)",
    fontWeight: "bold",
    borderLeft: "5px solid rgba(0,0,0,0.2)",
    animation: "slideIn 0.3s ease-out forwards",
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
      <div style={toastStyle}>{message}</div>
    </>
  );
}
