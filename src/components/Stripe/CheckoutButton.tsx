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

    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.statusText}`);
    }

    const data = await response.json();

    setLoading(false);

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? t("loading") : t("checkout")}
    </Button>
  );
};

export default CheckoutButton;
