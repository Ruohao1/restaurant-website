"use client";

import { useState } from "react";
import Logo from "../logo";
import Burger from "./burger";
import NavBar from "./navBar";
import config from "@/constants/config";

interface HeaderProps {
  lng: string;
}

const Header: React.FC<HeaderProps> = ({ lng }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 z-99">
      <div
        className={`${
          isOpen ? "hidden" : "flex"
        } relative w-screen h-12 z-99 bg-gray-500`}
      ></div>

      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} lng={lng} />
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
