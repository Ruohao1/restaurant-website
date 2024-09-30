import { useTranslation } from "@/app/i18n";
import Logo from "../logo";
import config from "@/constants/config";

interface FooterProps {
  lng: string;
}

const Footer: React.FC<FooterProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <footer className="w-full bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-8 md:space-y-0">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Logo className="w-24 h-24" />
            <p className="text-gray-400 mt-4 text-sm text-center md:text-left">
              {t("browse-title")}
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h1 className="text-lg font-bold">{t("contacts-title")}</h1>
            <a href={`tel:+${config.phone}`} className="block mt-2">
              {config.phone}
            </a>
            <a href={config.addressUrl} target="_blank" className="block mt-1">
              {config.address}
            </a>
          </div>

          {/* Social Media */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src="/icons/facebook.svg" alt="Facebook" className="w-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src="/icons/instagram.svg" alt="Instagram" className="w-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img src="/icons/twitter.svg" alt="Twitter" className="w-6" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal Mentions */}
            <a
              href="/legal-mentions"
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              {t("legal-mentions")}
            </a>

            {/* Copyright Info */}
            <p className="text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} {config.name}.{" "}
              {t("all-rights-reserved")}
            </p>

            {/* Portfolio Link */}
            <p className="text-sm text-gray-400 text-center">
              {t("site-official")} - {t("all-rights-reserved")} -{" "}
              {t("design-by")}
              <a
                href="https://portfolio-mu-murex-26.vercel.app/"
                className="text-gray-300 hover:text-white ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cédric LIN
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
