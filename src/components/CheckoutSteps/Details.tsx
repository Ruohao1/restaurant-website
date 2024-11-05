import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckout } from "@/context/CheckoutContext";

const Details: React.FC = () => {
  const { step, orderType, details, setDetails, nextStep, prevStep } =
    useCheckout();

  if (step !== 1) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {orderType === "delivery"
          ? "Enter Delivery Address"
          : "Pick-Up Details"}
      </h2>
      <Input
        placeholder="Enter your address or pick-up details"
        onChange={(e) => setDetails({ ...details!, address: e.target.value })}
      />
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button variant="default" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Details;
