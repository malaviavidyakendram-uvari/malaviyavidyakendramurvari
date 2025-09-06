import React, { useState, useEffect } from "react";
import "../Css/Donate.css";
import { db } from "../Pages/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  // -------------------- State --------------------
  const [formData, setFormData] = useState({
    amount: "",
    email: "",
    phone: "",
    name: "",
    pan: "",
    address: "",
  });

  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const navigate = useNavigate();

  // -------------------- Load Razorpay Script --------------------
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => setIsRazorpayLoaded(false);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // -------------------- Handlers --------------------
  // -------------------- Handlers --------------------
  // ✅ Indian Currency Formatter
  const formatIndianCurrency = (value) => {
    if (!value) return "";
    const num = value.replace(/\D/g, ""); // remove non-digits
    if (!num) return "";

    // ✅ Limit to 10 digits max to avoid UI expansion
    const limited = num.slice(0, 10);

    // Format in Indian system (e.g., 1,00,000 not 100,000)
    return new Intl.NumberFormat("en-IN").format(Number(limited));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10); // keep max 10 digits
      setFormData((prev) => ({
        ...prev,
        amount: formatIndianCurrency(digitsOnly),
      }));
    } else if (name === "pan") {
      // Always uppercase PAN input
      const panValue = value.toUpperCase().slice(0, 10); // PAN always 10 chars
      setFormData((prev) => ({
        ...prev,
        pan: panValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      email: "",
      phone: "",
      name: "",
      pan: "",
      address: "",
    });
  };

  // ✅ Field Validation Function
  const validateForm = () => {
    const { amount, email, phone, name, pan, address } = formData;

    const cleanAmount = amount.replace(/,/g, ""); // remove commas

    if (!cleanAmount || Number(cleanAmount) <= 0) {
      alert("⚠ Please enter a valid donation amount greater than 0.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("⚠ Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("⚠ Please enter a valid 10-digit phone number.");
      return false;
    }

    if (name.trim().length < 3) {
      alert("⚠ Name must be at least 3 characters long.");
      return false;
    }

    if (pan) {
      // ✅ PAN Regex: 5 letters + 4 digits + 1 letter, all caps
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(pan)) {
        alert("⚠ Please enter a valid PAN number (e.g., AAAPA1234A).");
        return false;
      }
    }

    if (address.trim().length < 5) {
      alert("⚠ Please enter a valid address (minimum 5 characters).");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate before submission
    if (!validateForm()) return;

    if (!window.Razorpay) {
      alert("❌ Razorpay SDK not available. Please refresh and try again.");
      return;
    }

    try {
      const cleanAmount = formData.amount.replace(/,/g, ""); // remove commas

      // ✅ Save donor details in Firestore
      const docRef = await addDoc(collection(db, "Doner-details"), {
        ...formData,
        amount: cleanAmount,
        date: new Date(),
        status: "INITIATED",
      });
      console.log("✅ Donor data stored with ID:", docRef.id);

      // ✅ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(Number(cleanAmount) * 100),
        currency: "INR",
        name: "School Donation",
        description: "Donation Payment",
        handler: function (response) {
          alert("🎉 Payment Successful! ID: " + response.razorpay_payment_id);
          resetForm();
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("❌ Error saving donor data:", error);
      alert("Failed to process donation. Try again.");
    }
  };

  // -------------------- JSX --------------------
  return (
    <div className="donation-container">
      {/* Left Section */}
      <div className="donation-info">
        <div className="org-logo">
          <img
            src="/assets/Blue and Brown Illustrative School Logo.png"
            alt="Organization Logo"
          />
        </div>

        <h2 className="org-name">Malaviya Vidyalaya Kendram</h2>
        <h3 className="donation-title">Donate to Educate</h3>

        <p className="donation-text">
          We would like to support the Malaviya Vidyalaya Kendram as a small
          effort to express our gratitude for everything we’ve been blessed
          with!
        </p>

        <div className="contact-box">
          <h4>Contact Us:</h4>
          <p>📧 malaviyavidyakendram.uvari@gmail.com</p>
          <p>📞 Ph-04637277137</p>
        </div>

        <div className="terms">
          <h4>Terms & Conditions:</h4>
          <p>
            You agree to share information entered on this page with Malaviya
            Vidyalaya Kendram and Razorpay, adhering to applicable laws.
          </p>
        </div>

        <button
          className="history-btn"
          onClick={() => navigate("/donordetails")}
        >
          📜 View Donor History
        </button>
      </div>

      {/* Right Section (Form) */}
      <div className="donation-form">
        <h3>Payment Details</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="amount"
            placeholder="₹ Enter Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            autoComplete="off"
            className="amount-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
          <input
            type="text"
            name="pan"
            placeholder="PAN Number (e.g., AAAPA1234A)"
            value={formData.pan}
            onChange={handleChange}
            autoComplete="off"
            maxLength={10}
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
          />

          <button type="submit">Pay ₹{formData.amount || "0.00"}</button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
