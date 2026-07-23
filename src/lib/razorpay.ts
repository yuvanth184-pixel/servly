import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const PLANS = {
  free: { name: "Free", price: 0, duration: 30 },
  starter: { name: "Starter", price: 49900, duration: 30 },
  pro: { name: "Pro", price: 99900, duration: 30 },
} as const;
