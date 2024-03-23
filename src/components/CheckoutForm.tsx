import React, { useState } from "react";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import AddressForm from "./AddressForm";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage pop-up visibility

  const handlePayNowClick = async () => {
    try {
      // Here goes the code to handle the payment process with Stripe
      // For simplicity, I'll just set the pop-up to show immediately
      setShowPopup(true);
      // Scroll to the pop-up message after a short delay
      setTimeout(() => {
        document.getElementById("popup-message")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100); // Adjust the delay as needed
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Something went wrong with the payment.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the pop-up
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <AddressForm />

      {/* Pay now button */}
      <button
        onClick={handlePayNowClick}
        className="bg-red-500 text-white p-4 rounded-md w-28"
      >
        Pay now
      </button>

      {/* Pop-up message */}
      {showPopup && (
        <div
          id="popup-message"
          className="popup-message absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 border border-gray-300 p-4 rounded-md text-center"
        >
          <p className="text-white">
            Your order has been successfully placed!
          </p>
          <p className="text-white">
           You can track your order status in Orders Section
          </p>
          <button
            onClick={handleClosePopup}
            className="bg-white text-gray-800 px-3 py-1 rounded-md"
          >
            Close
          </button>
        </div>
      )}

      {/* Show any error messages */}
      {message && <div id="payment-message">{message}</div>}
    </div>
  );
};

export default CheckoutForm;
