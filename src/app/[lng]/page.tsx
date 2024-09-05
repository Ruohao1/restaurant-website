import Link from "next/link";
import { useTranslation } from "../i18n";
import { LanguageSwitcher } from "@/components/languageSwitcher";

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
      <h1>{t("title")}</h1>
      <Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
      <LanguageSwitcher lng={lng} />
    </>
  );
};

export default Page;
