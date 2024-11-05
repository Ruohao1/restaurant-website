import { useRouter } from "@/i18n/routing";
import { createContext, useContext, useEffect, useState } from "react";

interface Details {
  address: string;
  phone: string;
  email: string;
}

// Define the types for your context
interface CheckoutContextType {
  step: number;
  setStep: (step: number) => void; // Add setStep to the context type
  orderType: "delivery" | "takeaway" | undefined;
  setOrderType: (orderType: "delivery" | "takeaway") => void;
  details: Details | undefined;
  setDetails: (details: Details) => void;
  nextStep: () => void;
  prevStep: () => void;
  tagToStep: { [key: string]: number };
  stepTag: string;
}

// Create the context
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// Custom hook to use the CheckoutContext
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};

// Provider component that manages the checkout state
const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(0);
  const [orderType, setOrderType] = useState<"delivery" | "takeaway">();
  const [details, setDetails] = useState<Details>();

  // Function to move to the next step
  const nextStep = () => setStep((prevStep) => prevStep + 1);

  // Function to move to the previous step
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  // Mapping of step tags to step indices
  const tagToStep = {
    orderType: 0,
    details: 1,
    recap: 2,
    payment: 3,
    confirmation: 4,
  };

  // Get the current step tag based on the step index
  const stepTag = Object.keys(tagToStep)[step];
  const router = useRouter();

  useEffect(() => {
    router.push("/checkout?step=" + stepTag);
  }, [router, stepTag]);

  return (
    <CheckoutContext.Provider
      value={{
        step,
        setStep,
        orderType,
        setOrderType,
        details,
        setDetails,
        nextStep,
        prevStep,
        tagToStep,
        stepTag,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
