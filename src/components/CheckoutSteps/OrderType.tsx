import { Button } from "@/components/ui/button";

interface OrderTypeStepProps {
  orderType?: "delivery" | "pickup";
  setOrderType: (type: "delivery" | "pickup") => void;
  nextStep: () => void;
}

const OrderType: React.FC<OrderTypeStepProps> = ({
  orderType,
  setOrderType,
  nextStep,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Order Type</h2>
      <div className="space-y-4">
        <Button
          variant={orderType === "delivery" ? "default" : "outline"}
          onClick={() => {
            setOrderType("delivery");
            nextStep();
          }}
          className="w-full"
        >
          Delivery
        </Button>
        <Button
          variant={orderType === "pickup" ? "default" : "outline"}
          onClick={() => {
            setOrderType("pickup");
            nextStep();
          }}
          className="w-full"
        >
          Pick-Up
        </Button>
      </div>
    </div>
  );
};

export default OrderType;
