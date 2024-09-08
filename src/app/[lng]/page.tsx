import Link from "next/link";
import { useTranslation } from "../i18n";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";

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
      <Header lng={lng} />
      <div className="h-screen"></div>
      <h1>{t("title")}</h1>
      <Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.626573047063!2d2.1403975773346384!3d48.99866347135141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6605cd63babbf%3A0x1156126e5ee6c63c!2sYamayoshi..!5e0!3m2!1sen!2sfr!4v1725649926549!5m2!1sen!2sfr"
        className="w-full h-[32rem] z-0"
        loading="lazy"
      ></iframe>
      <Footer lng={lng} />
    </>
  );
};

export default Page;
