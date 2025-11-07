import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaTag,
  FaCommentDots,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet"; // ✅ Added for SEO
import "../Css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "name") newValue = value.replace(/[^a-zA-Z\s]/g, "");
    if (name === "phone") newValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    if (name === "subject")
      newValue = value.replace(/[^a-zA-Z0-9\s]/g, "");

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Validation
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      setStatus({ type: "error", msg: "Name must contain only letters." });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setStatus({ type: "error", msg: "Invalid email address." });
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setStatus({ type: "error", msg: "Phone must be exactly 10 digits." });
      return;
    }
    if (formData.subject.trim().length < 3) {
      setStatus({ type: "error", msg: "Subject must be at least 3 characters." });
      return;
    }
    if (formData.message.trim().length < 10) {
      setStatus({ type: "error", msg: "Message must be at least 10 characters." });
      return;
    }

    setSending(true);

    const serviceID = "service_v64eyoh";
    const templateID = "template_6iafhj9";
    const publicKey = "vPN7vm7osHakSvz6c";

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
        });
        setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
      })
      .catch(() => {
        setStatus({ type: "error", msg: "Failed to send. Please try again." });
        setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="contact-section">
      {/* 🧭 SEO Meta Tags */}
      <Helmet>
        <title>Contact | Malaviya Vidya Kendram School Uvari</title>
        <meta
          name="description"
          content="Contact Malaviya Vidya Kendram School, Uvari. Get in touch with our staff for admissions, academic queries, and school activities."
        />
        <meta
          name="keywords"
          content="Malaviya Vidya Kendram, Uvari School, Tirunelveli school, best school in Uvari, CBSE school in Tirunelveli, contact Malaviya Vidya Kendram"
        />
        <meta name="author" content="Malaviya Vidya Kendram School" />
        <meta property="og:title" content="Malaviya Vidya Kendram School - Contact Us" />
        <meta
          property="og:description"
          content="Reach out to Malaviya Vidya Kendram School, Uvari for admissions and general inquiries."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://your-website-link.com/contact"
        />
        <meta
          property="og:image"
          content="https://your-website-link.com/school-logo.png"
        />

        {/* 🏫 Schema Markup for Google */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "School",
            "name": "Malaviya Vidya Kendram",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "9/62-3, Aalamara north street, Karaichuthu Uvari - 627 651",
              "addressLocality": "Uvari",
              "addressRegion": "Tamil Nadu",
              "postalCode": "627651",
              "addressCountry": "IN"
            },
            "telephone": "04637-210990",
            "email": "malaviavidyakendram@gmail.com",
            "url": "https://your-website-link.com",
            "sameAs": [
              "https://www.facebook.com/your-school-page",
              "https://www.instagram.com/your-school-page"
            ]
          }
          `}
        </script>
      </Helmet>

      {/* Top Info Cards */}
      <div className="contact-tags">
        <div className="tag-card">
          <FaEnvelope className="tag-icon" />
          <h4>Email</h4>
          <p>
            <a href="mailto:malaviavidyakendram@gmail.com">
              ✉️ malaviavidyakendram@gmail.com
            </a>
          </p>
        </div>

        <div className="tag-card">
          <FaPhone className="tag-icon" />
          <h4>Phone No</h4>
          <p>
            <a href="tel:04637210990">📞 Ph- 04637-210990</a>
          </p>
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

      {/* Map and Form */}
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
