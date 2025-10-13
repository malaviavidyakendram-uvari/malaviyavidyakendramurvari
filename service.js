import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.rzp_test_RNopDT3cPfzVfh,       // Add in .env file
  key_secret: process.env.BPQtvMCqUuflZ0hIbnlr45LG // Add in .env file
});

// ✅ API to create order
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
