"use client";

import { useEffect, useState } from "react";
import Logo from "../logo";
import Burger from "./burger";
import NavBar from "./navBar";

interface HeaderProps {
  lng: string;
}

const Header: React.FC<HeaderProps> = ({ lng }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.scrollY;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={`fixed top-0 z-99 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } transition-all duration-300 ease-in
      `}
    >
      <div
        className={`${
          isOpen ? "hidden" : "flex justify-center"
        } relative w-screen h-12 z-99 bg-gray-500 transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-center">
          <Logo />
        </div>
      </div>

      <NavBar isOpen={isOpen} lng={lng} />
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
