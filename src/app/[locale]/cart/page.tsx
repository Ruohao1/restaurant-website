// src/app/[locale]/cart/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { useState } from "react";

const CartPage: React.FC = () => {
  const t = useTranslations("CartPage");
  const { cart, total, removeFromCart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    // Your checkout logic here
    setLoading(true);
    console.log(cart);

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    setLoading(false);

    const data = await response.json();

    // Redirect to the checkout page
    window.location.href = data.url;
  };

  return (
    <div>
      <h1>{t("title")}</h1>
      {cart.length === 0 ? (
        <p>{t("empty-cart")}</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>
                  {t("remove")}
                </button>
              </li>
            ))}
          </ul>
          <p>
            {t("total")}: ${total}
          </p>
          <button onClick={clearCart}>{t("clear")}</button>
          <Button onClick={handleCheckout}>
            {loading ? t("loading") : t("checkout")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
