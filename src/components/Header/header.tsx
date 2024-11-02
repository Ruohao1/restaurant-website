"use client";

import { useEffect, useState } from "react";
import Logo from "../logo";
import Burger from "./burger";
import NavBar from "./navBar";
import { HEADER_HEIGHT } from "@/constants/components/header";

interface HeaderProps {
  isHomePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHomePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const [isTop, setIsTop] = useState(isHomePage);
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
      setPosition(scrollPosition);
      setIsOpen(position === scrollPosition);

      // Dynamically check if we're within the hero section or beyond
      setIsTop(scrollPosition < heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", calculateHeroHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position, heroHeight]);

  return (
    <header
      className={`fixed h-${HEADER_HEIGHT} top-0 z-50 w-full 
          transition-all duration-300 ease-in-out ${
            isTop ? "bg-transparent" : "bg-white shadow-md"
          } `}
    >
      <div
        className={`relative w-full h-full flex items-center justify-between ${
          isTop ? "lg:justify-end" : ""
        } px-4 lg:px-8`}
      >
        {/* Logo */}
        <Logo
          border
          className={`${isTop ? "hidden" : ""} h-5/6 w-full lg:w-16 `}
          link
        />

        <nav className={`lg:flex lg:right-0 top-0 space-x-8 z-50`}>
          <NavBar isOpen={isOpen} dark={isTop} />
        </nav>
        {/* Burger icon for small screens */}
        <div className="lg:hidden relative right-0 -top-1/4">
          <Burger isOpen={isOpen} setIsOpen={setIsOpen} dark={isTop} />
        </div>
      </div>
    </header>
  );
};

export default Header;
