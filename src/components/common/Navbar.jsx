import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  const getLink = (id) => (isHome ? id : `/${id}`);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href={getLink("#members")}>Membros</a>
        </li>

        <li>
          <a href={getLink("#shows")}>Shows</a>
        </li>

        <li>
          <a href={getLink("#discography")}>Discografia</a>
        </li>

        <li>
          <a href={getLink("#contact")}>Contatos</a>
        </li>

        <li>
          <Link
            to="/admin"
            style={{
              color: "var(--primary)",
              fontWeight: "bold",
              borderBottom: "1px solid transparent",
            }}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
