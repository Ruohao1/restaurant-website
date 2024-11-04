import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CoordinatesProps {
  orderType?: "delivery" | "pickup";
  coordinates: object;
  setCoordinates: (coords: object) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Coordinates: React.FC<CoordinatesProps> = ({
  orderType,
  coordinates,
  setCoordinates,
  nextStep,
  prevStep,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {orderType === "delivery"
          ? "Enter Delivery Address"
          : "Pick-Up Details"}
      </h2>
      <Input
        placeholder="Enter your address or pick-up details"
        onChange={(e) =>
          setCoordinates({ ...coordinates, address: e.target.value })
        }
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

export default Coordinates;
