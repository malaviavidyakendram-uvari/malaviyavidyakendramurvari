import axios from "axios";

// ✅ Railway backend public URL
const API_URL = "https://malaviya-vidya-kendram-production.up.railway.app";

/**
 * Create Razorpay order
 * @param {number} amount - Amount in rupees
 * @returns {object} - Order data from backend
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
