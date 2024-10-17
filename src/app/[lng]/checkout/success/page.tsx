import { useTranslation } from "@/app/i18n";

interface SuccessProps {
  lng: string;
}

const Success: React.FC<SuccessProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("Success")}</h1>
    </div>
  );
};

export default Success;
