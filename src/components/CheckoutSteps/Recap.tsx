import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";

const Recap: React.FC = () => {
  const { cart } = useCart();
  const { step, orderType, details, nextStep, prevStep } = useCheckout();

  const handleClick = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

    if (res.status === 400) {
      const { error } = await res.json();
      console.error(error);
      return;
    }
    const url = await res.json().then((data) => data.url);

    console.log(url);

    if (res.status === 200) {
      nextStep();
      window.location.href = url;
    }
  };

  if (step !== 2) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Recap</h2>
      <p>Order Type: {orderType}</p>
      <p>Details: {JSON.stringify(details)}</p>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button variant="default" onClick={handleClick}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default Recap;
