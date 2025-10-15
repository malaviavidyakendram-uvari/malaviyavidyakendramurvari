import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// -------------------- CORS Setup --------------------
// Allow requests from both local dev and Netlify production
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://malaviyavidyakendram.netlify.app", // Netlify frontend
    ],
    methods: ["GET", "POST"],
  })
);

// -------------------- Middleware --------------------
app.use(express.json());

// -------------------- Razorpay Setup --------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // public key
  key_secret: process.env.RAZORPAY_KEY_SECRET, // secret key
});

// -------------------- Routes --------------------

// Root route for health check
app.get("/", (req, res) => {
  res.send({ message: "✅ Backend is connected successfully 🚀" });
});

// Create Razorpay order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid or missing amount" });
    }

    const options = {
      amount: amount * 100, // Convert rupees to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    // Create order via Razorpay
    const order = await razorpay.orders.create(options);
    console.log("✅ Order created:", order);

    res.json(order);
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ error: "Error creating order", details: err });
  }
});

// Catch-all route for undefined endpoints
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
