"use client";

import { useTranslation } from "@/app/i18n/client";
import React from "react";
import CheckoutButton from "@/components/Stripe/CheckoutButton";

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

  return (
    <div>
      <h1>{t("cart")}</h1>
      <CheckoutButton lng={lng} />
    </div>
  );
}
