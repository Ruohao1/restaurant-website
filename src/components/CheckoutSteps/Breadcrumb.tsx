"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";

const steps: { [key: string]: number } = {
  orderType: 0,
  coordinates: 1,
  recap: 2,
  payment: 3,
  confirmation: 4,
};

// Define reverse mapping to get step names from indices
const stepNames = Object.keys(steps);

const CheckoutBreadcrumb: React.FC = () => {
  const { step: currentStep, setStep } = useCheckout();

  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("CheckoutPage.steps");

  // Ensure the component only renders on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Or a loading spinner, if preferred

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {stepNames.map((step, index) => {
          return (
            <BreadcrumbItem key={step}>
              {index === currentStep ? (
                <BreadcrumbPage>{t(step)}</BreadcrumbPage>
              ) : (
                <span className="cursor-pointer" onClick={() => setStep(index)}>
                  {t(step)}
                </span>
              )}
              {index < stepNames.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CheckoutBreadcrumb;
