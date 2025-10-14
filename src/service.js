// src/service.js
import axios from "axios";

const API_URL = "http://localhost:5000";

export const createOrder = async (amount) => {
  try {
    const response = await axios.post(`${API_URL}/create-order`, { amount });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
