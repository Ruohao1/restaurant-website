import { useTranslation } from "@/app/i18n";
import Logo from "../logo";
import config from "@/constants/config";

interface FooterProps {
  lng: string;
}

const Footer: React.FC<FooterProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <footer className="flex flex-col w-full items-center justify-center">
      <div className="flex w-full justify-around">
        <div>
          <Logo />
        </div>
        <div>
          <h1>{t("browse-title")}</h1>
        </div>
        <div>
          <h1>{t("contacts-title")}</h1>
          <a href={`tel:+${config.phone}`}>{config.phone}</a>
        </div>
        <div>
          <h1>{t("address-title")}</h1>
          <a href={config.addressUrl} target="_blank">
            {config.address}
          </a>
        </div>
      </div>

      <div>
        <p>
          Site officiel - Tous droits réservés - Conception & réalisation :
          Cédric LIN
        </p>
      </div>
    </footer>
  );
};

export default Footer;
