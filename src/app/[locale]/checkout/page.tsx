"use client";

import {
  CheckoutBreadcrumb,
  Details,
  OrderType,
  Payment,
  Recap,
  Confirmation,
} from "@/components/CheckoutSteps";
import CheckoutProvider from "@/context/CheckoutContext";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

const CheckoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      if (cart && cart.length === 0) {
        router.push("/menu");
      }
    }
  }, [router]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <CheckoutProvider>
        {/* Breadcrumb Navigation */}
        <CheckoutBreadcrumb />

        <OrderType />
        <Details />
        <Recap />
        <Payment />
        <Confirmation />

        {/* {currentStep === 3 && <ConfirmationStep />} */}
      </CheckoutProvider>
    </div>
  );
};

export default CheckoutPage;
