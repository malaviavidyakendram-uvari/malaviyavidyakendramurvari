// src/PaymentButton.jsx
import React from "react";
import { createOrder } from "./service"; // import the API function

const PaymentButton = () => {
  const handlePayment = async () => {
    try {
      const order = await createOrder(100); // ₹100 for testing
      console.log("Order received:", order);

      const options = {
        key: "rzp_test_RTLaMUI81ACyZG", // public key
        amount: order.amount,
        currency: order.currency,
        name: "School Donation",
        description: "Test Payment",
        order_id: order.id,
        handler: (response) => {
          alert("Payment successful! ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Muthu Nambi",
          email: "muthu@example.com",
          contact: "9876543210",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Check console.");
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;
