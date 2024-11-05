// src/components/CheckoutSteps/Confirmation.tsx
"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const Confirmation: React.FC = () => {
  const t = useTranslations("ConfirmationPage");
  const { step } = useCheckout();

  // Simulating order details for demonstration purposes
  const orderDetails = {
    orderId: "12345",
    orderDate: new Date().toLocaleDateString(),
    deliveryMethod: "Home Delivery",
    estimatedDelivery: new Date(
      new Date().setDate(new Date().getDate() + 5)
    ).toLocaleDateString(),
  };

  useEffect(() => {
    // Here you can add any logic you want to run when the confirmation page is loaded
    console.log("Confirmation Page Loaded");
  }, []);

  if (step !== 4) return null;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">
        {t("title", { orderId: orderDetails.orderId })}
      </h1>
      <p className="text-lg text-gray-700 mb-6">{t("thankYouMessage")}</p>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <p className="text-gray-800">
          {t("orderDate")}: {orderDetails.orderDate}
        </p>
        <p className="text-gray-800">
          {t("deliveryMethod")}: {orderDetails.deliveryMethod}
        </p>
        <p className="text-gray-800">
          {t("estimatedDelivery")}: {orderDetails.estimatedDelivery}
        </p>
      </div>
      <div className="mt-6">
        <p className="text-gray-600">{t("contactSupport")}</p>
      </div>
    </div>
  );
};

export default Confirmation;
