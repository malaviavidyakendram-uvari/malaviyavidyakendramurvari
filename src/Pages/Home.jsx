import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../Css/Home.css"; // Import CSS

const Home = () => {
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
      </div>

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
