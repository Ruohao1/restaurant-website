import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface RecapProps {
  orderType?: "delivery" | "pickup";
  coordinates: object;
  nextStep: () => void;
  prevStep: () => void;
}

const Recap: React.FC<RecapProps> = ({
  orderType,
  coordinates,
  nextStep,
  prevStep,
}) => {
  const cart = useCart();
  console.log(cart);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Recap</h2>
      <p>Order Type: {orderType}</p>
      <p>Coordinates: {JSON.stringify(coordinates)}</p>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button variant="default" onClick={nextStep}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default Recap;
