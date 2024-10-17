import { useTranslation } from "@/app/i18n";

interface CanceledProps {
  params: { lng: string };
}

const Canceled: React.FC<CanceledProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("Cancel")}</h1>
    </div>
  );
};

export default Canceled;
