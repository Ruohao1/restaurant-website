"use client";

import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/components/ui/button";
import React from "react";

interface CartProps {
  params: {
    lng: string;
  };
}

export default function Cart({ params: { lng } }: CartProps) {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      //redirect to success page
      window.location.href = `/[lng]/checkout/success`;
    }

    if (query.get("canceled")) {
      //redirect to cancel page
      window.location.href = `/[lng]/checkout/cancel`;
    }
  }, []);

  const { t } = useTranslation(lng);

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div>
      <h1>{t("cart")}</h1>
      <form onSubmit={handleCheckout}>
        <Button type="submit">Checkout</Button>
      </form>
    </div>
  );
}
