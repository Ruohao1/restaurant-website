import Link from "next/link";
import { useTranslation } from "../../i18n";

// Define the type for the incoming props, which will include `lng` as a parameter
interface PageProps {
  params: {
    lng: string; // language code, like 'en', 'fr', etc.
  };
}

const Page: React.FC<PageProps> = async ({ params: { lng } }) => {
  // `useTranslation` is assumed to return a Promise with an object that has the `t` function for translations
  const { t } = await useTranslation(lng, "common");

  return (
    <>
      <h1>{t("second-title")}</h1>
      {/* Link to the home page, passing the language code */}
      <Link href={`/${lng}`}>{t("back-to-home")}</Link>
    </>
  );
};

export default Page;
