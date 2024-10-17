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

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    return response;
  }

  return (
    <Button onClick={handleClick}>
      {loading ? t("loading") : t(`checkout`)}
    </Button>
  );
};

export default CheckoutButton;
