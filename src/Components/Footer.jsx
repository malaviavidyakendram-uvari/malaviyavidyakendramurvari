import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../Css/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mvk-footer">
      <div className="mvk-footer-top">
        {/* Get in Touch */}
        <div className="mvk-footer-section mvk-footer-contact">
          <h3>Get In Touch</h3>
          <p>
            Malaviya Vidya Kendram, 9/62-3, Aalamara North Street, Karaichuthu
            Uvari - 627 651, Tirunelveli Dist
          </p>
          <p>
            <a href="mailto:malaviavidyakendram@gmail.com">
              ✉️ malaviavidyakendram@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:04637210990">📞 Ph - 04637-210990</a>
          </p>

          {/* Social Media */}
          <div className="mvk-footer-social">
            <a
              href="https://www.facebook.com/watch/malaviya.vidya.kendram.uvari.2025/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/malaviyavidyakendram/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:malaviyavidyakendram.uvari@gmail.com"
              rel="noreferrer"
              aria-label="Email"
            >
              <MdEmail />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mvk-footer-section mvk-footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/About">About Us</Link>
            </li>
            <li>
              <Link to="/Contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/History">History</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mvk-footer-bottom">
        <p>© {currentYear} All Rights Reserved. Malaviya Vidya Kendram</p>
      </div>
    </footer>
  );
};

export default Footer;
