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
  }, [position]);

  return (
    <header
      className={`fixed top-0 z-50 w-full ${
        visible ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300 ease-in-out bg-white shadow-md`}
    >
      <div className="relative w-full h-16 flex items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Full NavBar for large screens */}
        <nav className="hidden lg:flex space-x-8">
          <NavBar isOpen={false} lng={lng} />
        </nav>

        {/* Burger icon for small screens */}
        <div className="lg:hidden">
          <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* Slide-in Navbar for small screens */}
      {isOpen && <NavBar isOpen={isOpen} lng={lng} />}
    </header>
  );
};

export default Header;
