import { useTranslation } from "@/app/i18n/";
import CheckoutButton from "@/components/Stripe/CheckoutButton";

interface CartProps {
  params: { lng: string };
}

const Cart: React.FC<CartProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("Cart")}</h1>

      <CheckoutButton lng={lng} />
    </div>
  );
};

export default Cart;
