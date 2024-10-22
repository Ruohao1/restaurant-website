"use client";

import { useTranslation } from "@/app/i18n/client";
import React from "react";
import CheckoutButton from "@/components/Stripe/CheckoutButton";
import { useCart } from "@/context/CartContext";

interface CartProps {
  params: {
    lng: string;
  };
}

export default function Cart({ params: { lng } }: CartProps) {
  const { cart, total, removeFromCart, clearCart } = useCart();
  const { t } = useTranslation();

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      //redirect to success page
      window.location.href = `/${lng}/checkout/success`;
    }

    if (query.get("canceled")) {
      //redirect to cancel page
      window.location.href = `/${lng}/checkout/canceled`;
    }
  });

  return (
    <div>
      <h1>{t(`your-cart`)}</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
      <CheckoutButton lng={lng} />
    </div>
  );
}
