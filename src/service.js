// src/service.js
import axios from "axios";

// ✅ Backend URL (Railway public domain)
// Optional: use environment variable for flexibility (local dev or future changes)
const API_URL = process.env.REACT_APP_BACKEND_URL || "https://malaviya-vidya-kendram-production.up.railway.app";

/**
 * Create Razorpay order via backend
 * @param {number} amount - Amount in rupees
 * @returns {object} - Order data returned from backend
 */
export const createOrder = async (amount) => {
  try {
    const response = await axios.post(`${API_URL}/create-order`, { amount });
    return response.data;
  } catch (error) {
    console.error("❌ Error creating order:", error.response || error);
    throw error;
  }
};
