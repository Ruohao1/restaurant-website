import { useTranslation } from "@/app/i18n";

interface DonatePageProps {
  lng: string;
}

const Checkout: React.FC<DonatePageProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("checkout")}</h1>
    </div>
  );
};

export default Checkout;
