import { Button } from "@/components/ui/button";
import { useCheckout } from "@/context/CheckoutContext";
import { usePathname } from "@/i18n/routing";

const OrderType: React.FC = () => {
  const { step, orderType, setOrderType, nextStep } = useCheckout();

  const PaymentSuccess: React.FC = () => {
    const pathname = usePathname();
    console.log(pathname);

    return <Button>payment success</Button>;
    // return (
    //   <Button
    //     onClick={() => {
    //       window.location.href = "/checkout?step=payment?success=true";
    //     }}
    //   >
    //     payment success
    //   </Button>
    // );
  };

  if (step !== 0) return null;

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
          variant={orderType === "takeaway" ? "default" : "outline"}
          onClick={() => {
            setOrderType("takeaway");
            nextStep();
          }}
          className="w-full"
        >
          Pick-Up
        </Button>
      </div>
      <PaymentSuccess />
    </div>
  );
};

export default OrderType;
