import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../Css/Home.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // ✅ SEO import

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

  const slideshowImages = [
    "/assets/schoolback1.jpg",
    "/assets/schoolback2.jpg",
    "/assets/Schoolback3.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const namePattern = /^[A-Za-z\s]+$/;

    if (!namePattern.test(formData.fullName)) {
      setStatus({ type: "error", msg: "Name must contain only letters." });
      return false;
    }
    if (!emailPattern.test(formData.email)) {
      setStatus({ type: "error", msg: "Please enter a valid email address." });
      return false;
    }
    if (!phonePattern.test(formData.phone)) {
      setStatus({
        type: "error",
        msg: "Phone number must be exactly 10 digits (numbers only).",
      });
      return false;
    }
    if (formData.country.trim() === "") {
      setStatus({ type: "error", msg: "Please enter your country." });
      return false;
    }
    if (formData.interest.trim() === "") {
      setStatus({ type: "error", msg: "Please enter your interested area." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", msg: "" });

    if (!validateForm()) {
      setSending(false);
      return;
    }

    try {
      const SERVICE_ID = "service_v64eyoh";
      const TEMPLATE_ID = "template_1a7qrda";
      const PUBLIC_KEY = "vPN7vm7osHakSvz6c";

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);

      setStatus({
        type: "success",
        msg: "Application submitted successfully ",
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
      {/* ✅ SEO META TAGS START */}
      <Helmet>
        <title>Malaviya Vidya Kendram | Best School in Uvari</title>
        <meta
          name="description"
          content="Malaviya Vidya Kendram Uvari - Providing quality education since 1995. English medium school offering classes from LKG to VIII with modern facilities, video learning, and dedicated tutors."
        />
        <meta
          name="keywords"
          content="Malaviya Vidya Kendram, malaviyavidyakendram, Malaviya school Uvari, Uvari school, malaviyavidyakendramurvari, uvarimkv, malaviya school, uvari education, best school in Uvari, Tamil Nadu school, English medium school, TCS funded school"
        />
        <meta name="author" content="Malaviya Vidya Kendram School" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://malaviyavidyakendramurvari.netlify.app/" />
        <meta property="og:title" content="Malaviya Vidya Kendram | School in Uvari" />
        <meta
          property="og:description"
          content="Providing quality education and social service from home. Join Malaviya Vidya Kendram – Uvari’s best English medium school."
        />
        <meta property="og:image" content="https://malaviyavidyakendramurvari.netlify.app/assets/schoolback1.jpg" />
        <meta property="og:url" content="https://malaviyavidyakendramurvari.netlify.app/" />
      </Helmet>
      {/* ✅ SEO META TAGS END */}

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${slideshowImages[currentImage]})`,
        }}
      >
        <div className="overlay"></div>
      </div>

      {/* Donate Button */}
      <div className="top-donate-button-wrapper">
        <button
          onClick={() => navigate("/donate")}
          className="top-donate-button"
        >
          🎓 Donate for Education
        </button>
      </div>

      {/* About Section */}
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
              180+ students from LKG to VIII standard
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
              pattern="[A-Za-z\s]+"
              title="Name should only contain letters and spaces"
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
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                }))
              }
              required
              placeholder="Phone Number"
              type="tel"
              className="form-input"
              maxLength="10"
              pattern="[0-9]{10}"
              title="Phone number must be exactly 10 digits"
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
