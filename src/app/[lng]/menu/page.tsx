import { useTranslation } from "@/app/i18n";

interface MenuPageProps {
  params: {
    lng: string;
  };
}

const MenuPage: React.FC<MenuPageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng);
  return (
    <>
      <h1>{t("menu")}</h1>
    </>
  );
};

export default MenuPage;
