// server.js
import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// -------------------- Safety Checks --------------------
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error(
    "❌ Razorpay keys are missing! Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Railway env."
  );
  process.exit(1); // stop server
}

// -------------------- Middleware --------------------
// Allow requests from local dev and Netlify frontend safely
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173", // local dev
        "https://malaviyavidyakendram.netlify.app", // production
      ];
      // allow requests with no origin (like Postman or curl)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// -------------------- Razorpay Setup --------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// -------------------- Routes --------------------

// Health check
app.get("/", (req, res) => {
  res.send({ message: "✅ Backend is connected successfully 🚀" });
});

// Create Razorpay order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid or missing amount" });
    }

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Order created:", order);

    res.json(order);
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res
      .status(500)
      .json({ error: "Error creating order", details: err.message });
  }
});

// Catch-all route
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
