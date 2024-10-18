"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";

interface CheckoutButtonProps {
  lng: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ lng }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(lng);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Checkout session data:", data);

      // Redirect the user to the Stripe Checkout page
      if (data.url) {
        window.location.href = data.url; // Use the Stripe session URL to redirect
      } else {
        throw new Error("Stripe session URL is missing.");
      }
    } catch (error) {
      console.error("Error during checkout session creation:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? t("loading") : t("checkout")}
    </Button>
  );
};

export default CheckoutButton;
