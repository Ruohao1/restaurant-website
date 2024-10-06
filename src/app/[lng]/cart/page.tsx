import { useTranslation } from "@/app/i18n";
import Link from "next/link";

interface CartProps {
  lng: string;
}

const Cart: React.FC<CartProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("cart")}</h1>
      <p>
        <Link href={`/${lng}/menu`}>{t("menu")}</Link>
      </p>
      <p>
        <Link href={`/${lng}/checkout`}>{t("checkout")}</Link>
      </p>
    </div>
  );
};

export default Cart;
