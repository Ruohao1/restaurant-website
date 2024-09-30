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
  const [isTop, setIsTop] = useState(true); // Track if header is at the top of the hero
  const [heroHeight, setHeroHeight] = useState(0); // Store hero section height

  useEffect(() => {
    // Function to calculate hero section height
    const calculateHeroHeight = () => {
      const heroSection = document.querySelector("#hero");
      if (heroSection) {
        setHeroHeight(heroSection.clientHeight);
      }
    };

    // Calculate hero height on initial load and on window resize
    calculateHeroHeight();
    window.addEventListener("resize", calculateHeroHeight);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setVisible(position > scrollPosition); // Detect scroll direction (up or down)
      setPosition(scrollPosition);

      // Dynamically check if we're within the hero section or beyond
      setIsTop(scrollPosition < heroHeight); // Use dynamic heroHeight instead of hardcoded value
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", calculateHeroHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position, heroHeight]);

  return (
    <>
      <header
        className={`fixed h-16 top-0 z-50 w-full 
          transition-transform duration-300 ease-in-out ${
            isTop ? "bg-transparent" : "bg-white shadow-md"
          } `}
      >
        <div className="relative w-full h-full flex items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Logo
            border
            className={`${isTop ? "hidden" : ""} h-full w-full lg:w-16 `}
          />

          <nav className={`lg:flex top-0 space-x-8 z-50`}>
            <NavBar isOpen={isOpen} lng={lng} />
          </nav>
          {/* Burger icon for small screens */}
          <div className="lg:hidden relative right-0 -top-1/4">
            <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
