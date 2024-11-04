"use client";

import {
  CheckoutBreadcrumb,
  Coordinates,
  OrderType,
  Recap,
  //   Confirmation,
} from "@/components/CheckoutSteps";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define step mappings
const steps: { [key: string]: number } = {
  orderType: 0,
  coordinates: 1,
  recap: 2,
  payment: 3,
  confirmation: 4,
};

// Define reverse mapping to get step names from indices
const stepNames = Object.keys(steps);

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

  const [orderType, setOrderType] = useState<"delivery" | "pickup">();
  const [coordinates, setCoordinates] = useState({});

  const searchParams = useSearchParams();

  // Get the current step from the query parameter
  const stepParam = searchParams.get("step");
  const currentStep =
    stepParam && steps[stepParam] !== undefined ? steps[stepParam] : 0;

  // Function to go to the next step
  const nextStep = () => {
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < stepNames.length) {
      router.push(`/checkout?step=${stepNames[nextStepIndex]}`);
    }
  };

  // Function to go to the previous step
  const prevStep = () => {
    const prevStepIndex = currentStep - 1;
    if (prevStepIndex >= 0) {
      router.push(`/checkout?step=${stepNames[prevStepIndex]}`);
    }
  };

  useEffect(() => {
    // Redirect to the first step if the step is not valid
    if (!stepParam || !stepNames.includes(stepParam)) {
      router.push("/checkout?step=orderType");
    }
  }, [stepParam, router]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Breadcrumb Navigation */}
      <CheckoutBreadcrumb currentStep={currentStep} />

      {/* Step Components */}
      {currentStep === 0 && (
        <OrderType
          orderType={orderType}
          setOrderType={setOrderType}
          nextStep={nextStep}
        />
      )}
      {currentStep === 1 && (
        <Coordinates
          orderType={orderType}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {currentStep === 2 && (
        <Recap
          orderType={orderType}
          coordinates={coordinates}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {/* {currentStep === 3 && <ConfirmationStep />} */}
    </div>
  );
};

export default CheckoutPage;
