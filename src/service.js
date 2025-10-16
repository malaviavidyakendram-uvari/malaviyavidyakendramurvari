// src/service.js
import axios from "axios";

// ✅ Use correct Vite environment variable format
const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://malaviya-vidya-kendram-production.up.railway.app";

/**
 * ✅ Create Razorpay order via backend
 * @param {number} amount - Amount in rupees
 * @returns {object} - Order data returned from backend
 */
export const createOrder = async (amount) => {
  try {
    const response = await axios.post(`${API_URL}/create-order`, { amount });
    return response.data;
  } catch (error) {
    console.error("❌ Error creating order:", error.response?.data || error);
    throw error;
  }
};

/**
 * ✅ Optional: Health check to test backend connection
 * (useful to verify Railway backend connectivity)
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
