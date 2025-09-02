import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { FiMenu, FiX, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../Css/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // ✅ Keep routes lowercase to match your Route paths
  const NAV = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Management", path: "/management" },
    { name: "Teachers", path: "/teachers" },
    { name: "History", path: "/history" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="header">
      {/* ROW 1 — TOP BAR */}
      <div className="header-top">
        <div className="header-container">
          <div className="top-left">
            <span className="icon">
              <IoLocationSharp />
            </span>
            <span className="top-text">
              No 52/4, South Street, Karai Suthu Uvari 627651.
            </span>
          </div>

          {/* Desktop only — phone + socials */}
          <div className="top-right">
            <div className="phone">
              <FiPhone className="icon" />
              <a href="tel:04637277137" className="top-text">
                Ph-04637277137
              </a>
            </div>

            <div className="socials">
              <a
                href="https://www.facebook.com/watch/malaviya.vidya.kendram.uvari.2025/"
                aria-label="Facebook"
                className="social-link"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/malaviyavidyakendram/"
                aria-label="Instagram"
                className="social-link"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:malaviyavidyakendram.uvari@gmail.com"
                aria-label="Email"
                className="social-link"
                title="Email"
              >
                <MdEmail />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2 — MAIN BAR */}
      <div className="header-main">
        <div className="header-container-2">
          <Link to="/" className="brand">
            <span className="brand-icon">
            <img src="/assets/Blue and Brown Illustrative School Logo.png" />
            </span>
            <h1 className="brand-name">Malaviya Vidyalaya Kendram</h1>
          </Link>

          {/* Desktop nav */}
          <nav className="header-nav">
            <ul className="nav-list">
              {NAV.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="nav-link">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link to="/Donate" className="cta-btn">
              Donate Now <FiArrowRight className="cta-icon" />
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div ref={menuRef} className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          {NAV.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="mobile-link"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="mobile-cta-wrap">
            <Link
              to="/Donate"
              onClick={() => setMenuOpen(false)}
              className="mobile-cta"
            >
              Donate Now <FiArrowRight />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
