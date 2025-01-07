// pages/api/charge.js

import Stripe from "stripe";

// Initialize Stripe with your **secret** key (use test mode secret key)
const stripe = new Stripe("sk_test_51QeTNGFgqWrZlV0Q0DgBfAcsG9SItg0uwJlvowWkbhrn4J8ScWphcCFVqV5XOBm93TxlAe9xxAe5IFId4kd3ugVY001e8orTtp");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token } = req.body; // Extract the token from the request body

    try {
      // Create a charge using the token and amount (5000 cents = $50)
      const charge = await stripe.charges.create({
        amount: 5000, // Amount in cents
        currency: "usd",
        description: "Test Payment",
        source: token,
      });

      // Return success response
      res.status(200).json({ success: true, charge });
    } catch (error) {
      // Return error response if something goes wrong
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
