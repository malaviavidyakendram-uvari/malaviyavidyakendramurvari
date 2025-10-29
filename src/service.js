// src/service.js
import axios from "axios";

// ✅ Use your new Render backend URL
const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://malaviyavidyakendramurvari.onrender.com"; // ← your live Render backend

/**
 * ✅ Create Razorpay order via backend
 * @param {number} amount - Amount in rupees
 * @returns {object} - Order data returned from backend
 */
export const createOrder = async (amount) => {
  try {
    if (!amount || isNaN(amount)) {
      throw new Error("Invalid donation amount");
    }

    const response = await axios.post(`${API_URL}/create-order`, { amount });
    return response.data; // { id, amount, currency, ... }
  } catch (error) {
    console.error("❌ Error creating order:", error.response?.data || error);
    throw error;
  }
};

/**
 * ✅ Fetch RRN (Bank Reference Number) using Razorpay paymentId
 * @param {string} paymentId - Razorpay payment ID
 * @returns {object} - { paymentId, rrnNumber, method, amount, status }
 */
export const fetchRRN = async (paymentId) => {
  try {
    if (!paymentId) throw new Error("Missing paymentId");

    const response = await axios.post(`${API_URL}/fetch-rrn`, { paymentId });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching RRN:", error.response?.data || error);
    throw error;
  }
};

/**
 * ✅ Optional: Check backend connectivity
 */
export const checkBackendConnection = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("✅ Backend connection success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Backend connection failed:", error.message);
    throw error;
  }
};
