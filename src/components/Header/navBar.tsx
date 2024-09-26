"use client";

import config from "@/constants/config";
import Logo from "../logo";
import { useTranslation } from "@/app/i18n/client";

interface NavBarProps {
  isOpen: boolean;
  lng: string;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen, lng }) => {
  const { t } = useTranslation();

  return (
    <nav
      className={`${
        isOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0 lg:flex lg:flex-row"
      } fixed lg:static lg:flex lg:items-center top-0 left-0 lg:left-auto lg:w-auto h-screen lg:h-auto w-64 lg:w-auto bg-gray-100 lg:bg-transparent transition-transform duration-300 ease-in-out z-40 lg:space-x-8`}
    >
      <div className="container p-5 lg:p-0 lg:flex lg:items-center lg:justify-between">
        {/* Logo for small screens */}
        <div className="lg:hidden flex justify-center mb-6">
          <Logo />
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6 lg:space-y-0 lg:flex lg:space-x-8 text-lg lg:text-sm text-gray-800">
          <li>
            <a href="/" className="hover:text-blue-600">
              {t("home")}
            </a>
          </li>
          <li>
            <a href={`/${lng}/menu`} className="hover:text-blue-600">
              {t("menus")}
            </a>
          </li>
          <li>
            <a href={`/${lng}/reservation`} className="hover:text-blue-600">
              {t("reservation")}
            </a>
          </li>
        </ul>

        {/* Contact Info for small screens */}
        <div className="mt-auto lg:hidden">
          <p className="text-sm text-gray-500">{config.address}</p>
          <p className="text-sm text-gray-500">{config.phone}</p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
