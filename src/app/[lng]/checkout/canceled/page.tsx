import { useTranslation } from "@/app/i18n";

interface CanceledProps {
  lng: string;
}

const Canceled: React.FC<CanceledProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("Cancel")}</h1>
    </div>
  );
};

export default Canceled;
