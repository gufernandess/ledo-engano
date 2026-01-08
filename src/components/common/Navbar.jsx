import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMobileMenu = () => setIsOpen(false);

  const getPageLink = (id) => {
    return isHome ? id : `/${id}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <a
              href={getPageLink("#members")}
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Membros
            </a>
          </li>

          <li className="nav-item">
            <a
              href={getPageLink("#shows")}
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Shows
            </a>
          </li>

          {/* <li className="nav-item">
            <a
              href={getPageLink("#discography")}
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Discografia
            </a>
          </li>*/}

          <li className="nav-item">
            <a
              href={getPageLink("#contact")}
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Contatos
            </a>
          </li>

          <li className="nav-item"></li>
        </ul>
      </div>
    </nav>
  );
}
