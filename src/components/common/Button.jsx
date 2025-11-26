import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const baseClass = "cta-button";
  const finalClass = `${baseClass} ${variant === "small" ? "small" : ""} ${variant === "full" ? "full" : ""} ${className}`;

  return (
    <button type={type} className={finalClass} onClick={onClick}>
      {children}
    </button>
  );
}
