import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import emailjs from "@emailjs/browser"; // ✅ Import EmailJS
import "../Css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // 🔹 Added phone field
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const serviceID = "service_3u23jnq";
    const templateID = "template_nstaec3";
    const publicKey = "BMpW4NjLKBbPvjGwP";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setStatus({ type: "success", msg: "Message sent successfully!" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        }); // reset

        setTimeout(() => {
          setStatus({ type: "", msg: "" });
        }, 3000);
      })
      .catch(() => {
        setStatus({ type: "error", msg: "Failed to send. Please try again." });

        setTimeout(() => {
          setStatus({ type: "", msg: "" });
        }, 3000);
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="contact-section">
      {/* Top Tags */}
      <div className="contact-tags">
        <div className="tag-card">
          <FaEnvelope className="tag-icon" />
          <h4>Email</h4>
          <p>malaviyavidyakendram.uvari@gmail.com</p>
        </div>
        <div className="tag-card">
          <FaPhone className="tag-icon" />
          <h4>Phone No</h4>
          <p>Ph-04637-210990</p>
        </div>
        <div className="tag-card">
          <FaMapMarkerAlt className="tag-icon" />
          <h4>Address</h4>
          <p>
            9/62-3, Aalamara north street, Karaichuthu Uvari - 627 651,
            Tirunelveli dist
          </p>
        </div>
      </div>

      {/* Map + Form Row */}
      <div className="contact-main">
        {/* Google Map */}
        <div className="map-container">
          <iframe
            title="School Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15721.476140723508!2d77.8704239!3d8.3296177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b047f075b31e1d5%3A0x9368f4117eca38c8!2sMalaviya%20Vidya%20Kendram%2C%20Appuvilai!5e0!3m2!1sen!2sin!4v1693411200000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="form-container">
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* 🔹 Added Phone Number Field */}
            <div className="input-group">
              <FaPhone className="icon" />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaTag className="icon" />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group textarea">
              <FaCommentDots className="icon" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <button type="submit" disabled={sending} className="submit-btn">
              {sending ? "Sending..." : "Send Message"}
            </button>

            {status.msg && (
              <p
                className={
                  status.type === "success" ? "success-msg" : "error-msg"
                }
              >
                {status.msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
