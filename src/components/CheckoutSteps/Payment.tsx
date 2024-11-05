import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { useEffect } from "react";

const Payment = () => {
  const { clearCart } = useCart();
  const { step, nextStep } = useCheckout();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Payment successful. Clearing cart...");
      clearCart(); // Only clear on successful payment
      nextStep();
    }
    if (query.get("canceled")) {
      console.log("Payment canceled. Cart remains unchanged.");
    }
  }, [clearCart, nextStep]);

  if (step !== 3) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <p>Please enter your payment details</p>
    </div>
  );
};

export default Payment;
