"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Replace with your Stripe Publishable Key (test mode)
const STRIPE_PUBLISHABLE_KEY = "pk_test_51QeTNGFgqWrZlV0QRgx5rLfc1J894ifnofM3bgS0vgbqcWnoKIxoDpUnMDkgq9UdZR18b2o9QBjIh1BaD2HuINLs0031FjsNWw";

const PaymentForm = ({ closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(""); // Amount state
  const [showDemoCards, setShowDemoCards] = useState(false);

  const demoCards = [
    { cardNumber: "4242 4242 4242 4242", cvv: "123", expiryDate: "12/23", zip: "94103" },
    { cardNumber: "5555 5555 5555 4444", cvv: "321", expiryDate: "01/25", zip: "94105" },
    { cardNumber: "6011 6011 6011 6611", cvv: "456", expiryDate: "11/22", zip: "94107" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (!amount) {
      toast.error("Please enter a valid amount.", { autoClose: 1000 });
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    // Create a token using the card element
    const { token, error: stripeError } = await stripe.createToken(cardElement);

    if (stripeError) {
      toast.error(stripeError.message, { autoClose: 1000 });
      setLoading(false);
    } else {
      // Send the token to the server to process payment
      try {
        const response = await axios.post("/api/charge", {
          token: token.id,
          amount: amount * 100, // Convert amount to cents
        });

        if (response.data.success) {
          toast.success("Payment Successful!", { autoClose: 1000 });
          setLoading(false);
          closeModal(); // Close modal after payment is successful
        } else {
          toast.error("Payment failed. Please try again.", { autoClose: 1000 });
          setLoading(false);
        }
      } catch (err) {
        toast.error("Error connecting to payment gateway. Please try again.", { autoClose: 1000 });
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-[90%] w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Test Payment Gateway</h2>

      {/* Amount Input */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-lg">Amount (USD)</label>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
        />
      </div>

      {/* Card Element (Stripe form field for card details) */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {/* Show Demo Cards */}
      <div className="mt-4">
        <button
          onClick={() => setShowDemoCards(!showDemoCards)}
          className="bg-gray-500 text-white p-2 rounded-md w-full"
        >
          {showDemoCards ? "Hide Demo Cards" : "Show Demo Cards"}
        </button>

        {showDemoCards && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Demo Cards</h3>
            {demoCards.map((card, index) => (
              <div key={index} className="border p-4 mt-2 rounded-md">
                <p><strong>Card Number:</strong> {card.cardNumber}</p>
                <p><strong>CVV:</strong> {card.cvv}</p>
                <p><strong>Expiry Date:</strong> {card.expiryDate}</p>
                <p><strong>ZIP Code:</strong> {card.zip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapper to load Stripe Elements
const StripePayment = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
  onClick={() => setModalOpen(true)}
  className="z-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#5A55FA] px-6 py-2 rounded text-white hover:bg-[#4A44D4] transition"
>
  Test Payment Method
</button>


      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
            >
              &times; {/* Close icon (×) */}
            </button>

            <Elements stripe={loadStripe(STRIPE_PUBLISHABLE_KEY)}>
              <PaymentForm closeModal={closeModal} />
            </Elements>
          </div>
        </div>
      )}
    </>
  );
};

export default StripePayment;
