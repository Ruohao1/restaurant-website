"use client";

import config from "@/constants/config";
import Logo from "../logo";
import { useTranslation } from "@/app/i18n/client";

interface NavBarProps {
  isOpen: boolean;
  lng: string;
}

const Navbar: React.FC<NavBarProps> = ({ isOpen, lng }) => {
  const { t } = useTranslation();

  return (
    <nav
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex w-[28rem] h-screen bg-blue-500 transition-transform fixed top-0 duration-300 ease-in-out`}
    >
      <div className="container m-5 flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex justify-center ">
            <Logo></Logo>
          </div>
          <div>
            <ul>
              <li>
                <a href="/">{t("home")}</a>
              </li>
              <li>
                <a href={`${lng}/menu`}>{t("menus")}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <p>{t(config.address)}</p>
          <p>{t(config.phone)}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
