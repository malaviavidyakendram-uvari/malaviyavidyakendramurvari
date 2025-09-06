import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../Css/Home.css"; // Import CSS
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    interest: "",
    comments: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", msg: "" });

    try {
      const SERVICE_ID = "service_3u23jnq";
      const TEMPLATE_ID = "template_orn2b54";
      const PUBLIC_KEY = "BMpW4NjLKBbPvjGwP";

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);

      setStatus({
        type: "success",
        msg: "Application submitted successfully ✅",
      });

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        country: "",
        interest: "",
        comments: "",
      });

      setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: "Sending failed. Please try again.",
      });
      setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url('/assets/premium_photo-1663050763436-818382a24bb8.avif')`,
        }}
      >
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Welcome to Our School</h1>
          <h3>"Your future begins here."</h3>
        </div>

        <div className="scroll-down">
          <span className="arrow">↓</span>
          <span className="text">Scroll Down</span>
        </div>
      </div>

      <section className="about-section">
        <div className="about-box">
          <h2>WHO WE ARE</h2>
          <p>
            Started in 1995 (L.K.G/U.K.G-40 kids) with a motto to have an
            English medium school in the village to provide quality education
            and enlighten the needy at Uvari, a seashore village between
            Kanyakumari and Tiruchendur.
          </p>
          <p>
            Funded by various groups including{" "}
            <span className="about-highlight">TCS (Rs.1.5 lakhs)</span>, this
            school currently has{" "}
            <span className="about-highlight">
              395 students from LKG to X standard
            </span>
            . Also has special tutors for Hindi and Computers with
            <span className="about-highlight"> 2 school vans</span> for
            commuting kids from 20 nearby villages.
          </p>
          <p>
            It was started to enlighten the needy and evolved over the years and
            has a{" "}
            <span className="about-highlight">video conferencing facility</span>{" "}
            which enables online teaching and provides a platform for anyone in
            the world to teach the kids right from their home without losing
            their comfort (Social service from home).
          </p>
          <p>
            We are progressing to give the{" "}
            <span className="about-highlight">best in class facility </span>
            to our village kids to bring them in par with any urban kid – Trying
            to bridge the gap.
          </p>

          <h2 className="donate-section-title">Donate to Educate</h2>
          <p className="donate-description">
            We would like to support the <b>Malaviya Vidyalaya Kendram </b>
            as a small effort to express our gratitude for everything we’ve been
            blessed with!
          </p>

          <div className="donate-button-wrapper">
            <button
              onClick={() => navigate("/donate")}
              className="donate-button"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Tutor Registration */}
      <section className="registration-section">
        <div className="registration-box">
          <h2 className="form-title">Tutor Registration</h2>

          {status.msg && (
            <div
              className={`status-message ${
                status.type === "success" ? "success" : "error"
              }`}
            >
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-grid">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Your Name"
              type="text"
              className="form-input"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              type="email"
              className="form-input"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              type="tel"
              className="form-input"
            />

            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Country Residing"
              list="countries"
              className="form-input"
            />
            <datalist id="countries">
              <option value="India" />
              <option value="United States" />
              <option value="United Kingdom" />
              <option value="Australia" />
              <option value="Canada" />
            </datalist>

            <input
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              required
              placeholder="Interested Area"
              type="text"
              className="form-input form-span"
            />

            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Additional Comments (Optional)"
              className="form-textarea form-span"
            />

            <div className="form-button-wrapper">
              <button
                type="submit"
                disabled={sending}
                className="submit-button"
              >
                {sending ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
