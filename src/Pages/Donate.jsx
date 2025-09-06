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
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (
      !formData.amount ||
      !formData.email ||
      !formData.phone ||
      !formData.name
    ) {
      alert("⚠ Please fill all required fields.");
      return;
    }

    if (!window.Razorpay) {
      alert("❌ Razorpay SDK not available. Please refresh and try again.");
      return;
    }

    try {
      // ✅ Save donor details in Firestore
      const docRef = await addDoc(collection(db, "Doner-details"), {
        ...formData,
        date: new Date(),
        status: "INITIATED",
      });
      console.log("✅ Donor data stored with ID:", docRef.id);

      // ✅ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(Number(formData.amount) * 100),
        currency: "INR",
        name: "School Donation",
        description: "Donation Payment",
        handler: function (response) {
          alert("🎉 Payment Successful! ID: " + response.razorpay_payment_id);

          // ✅ Save status update (optional, if you want to update Firestore)
          // updateDoc(doc(db, "Doner-details", docRef.id), {
          //   status: "SUCCESS",
          //   paymentId: response.razorpay_payment_id,
          // });

          // ✅ Reset form after success
          resetForm();
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      // ✅ Open Razorpay checkout
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

        {/* ✅ Donor History Button */}
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
            type="number"
            name="amount"
            placeholder="₹ Enter Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            autoComplete="off"
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
            placeholder="PAN Number"
            value={formData.pan}
            onChange={handleChange}
            autoComplete="off"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
          />

          <button type="submit">Pay ₹{formData.amount || "0.00"}</button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
