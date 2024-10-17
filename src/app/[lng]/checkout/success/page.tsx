import { useTranslation } from "@/app/i18n";

interface SuccessProps {
  params: { lng: string };
}

const Success: React.FC<SuccessProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("Success")}</h1>
    </div>
  );
};

export default Success;
