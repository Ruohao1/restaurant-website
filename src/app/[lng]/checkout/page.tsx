import { useTranslation } from "@/app/i18n";

interface DonatePageProps {
  params: {
    lng: string;
  };
}

const Checkout: React.FC<DonatePageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("checkout")}</h1>
    </div>
  );
};

export default Checkout;
