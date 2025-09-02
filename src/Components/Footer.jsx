import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../Css/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // ✅ Get current year

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Get in Touch */}
        <div className="footer-section">
          <h3>Get In Touch</h3>
          <p>Malaviya Vidhyalaya Kendram ,Door No 52/4,South Street,Karai Suthu Uvari 627651.</p>
          <p>✉️ malaviyavidyakendram.uvari@gmail.com</p>
          <p>📞 Ph-04637277137</p>
         
          {/* Social Media */}
          <div className="footer-social">
            <a
              href="https://www.facebook.com/watch/malaviya.vidya.kendram.uvari.2025/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/malaviyavidyakendram/?igsh=MWU4ZnZndjVnMjBoNg%3D%3D#"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:malaviyavidyakendram.uvari@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <MdEmail />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
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
      <div className="footer-bottom">
        <p>© {currentYear} All Rights Reserved. Malaviya Vidyalaya Kendram</p>
      </div>
    </footer>
  );
};

export default Footer;
