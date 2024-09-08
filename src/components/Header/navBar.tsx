import { useTranslation } from "@/app/i18n";
import Link from "next/link";

interface NavBarProps {
  lng: string;
}

const NavBar: React.FC<NavBarProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);
  return (
    <nav>
      <ul>
        <li>
          <Link href={`${lng}/menu`}>{t("menu-title")}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
