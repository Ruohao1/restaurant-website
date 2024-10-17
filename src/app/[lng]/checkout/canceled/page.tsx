import { useTranslation } from "@/app/i18n";

interface CancelProps {
  lng: string;
}

const Cancel: React.FC<CancelProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <div>
      <h1>{t("Cancel")}</h1>
    </div>
  );
};

export default Cancel;
