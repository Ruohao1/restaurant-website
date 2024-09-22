"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Logo from "../logo";
import { useTranslation } from "@/app/i18n/client";

interface NavBarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  lng: string;
}

const Navbar: React.FC<NavBarProps> = ({ isOpen, setIsOpen, lng }) => {
  const { t } = useTranslation();

  return (
    <nav
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col justify-between w-96 h-screen bg-blue-500 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-center">
        <Logo></Logo>
      </div>
      <div className="flex flex-col">
        <p>oui</p>
      </div>
    </nav>
  );
};

export default Navbar;
