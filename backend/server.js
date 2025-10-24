// server.js
import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // may be needed on some setups

dotenv.config();

const app = express();

// -------------------- Safety Checks --------------------
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error(
    "❌ Razorpay keys are missing! Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Railway env."
  );
  process.exit(1);
}

// -------------------- Middleware --------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://malaviyavidyakendram.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
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
  res.json({ message: "✅ Backend is connected successfully 🚀" });
});

// ✅ Create Razorpay order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid or missing amount" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Order created:", order);

    res.json(order);
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({
      error: "Error creating order",
      details: err.message,
    });
  }
});

// ✅ Fetch RRN (Bank Reference Number) using paymentId
app.post("/fetch-rrn", async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: "Missing paymentId" });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(paymentId);

    // Extract RRN if available
    const rrn =
      payment.acquirer_data?.rrn ||
      payment.acquirer_data?.upi_transaction_id ||
      payment.vpa ||
      "Not Available";

    console.log("✅ RRN Fetched for payment:", paymentId, rrn);

    res.json({
      paymentId: payment.id,
      rrnNumber: rrn,
      method: payment.method,
      amount: payment.amount / 100,
      status: payment.status,
    });
  } catch (err) {
    console.error("❌ Error fetching RRN:", err);
    res.status(500).json({
      error: "Error fetching RRN",
      details: err.message,
    });
  }
});

// -------------------- 404 Catch --------------------
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
