"use client";

import { useEffect, useState } from "react";
import Logo from "../logo";
import Burger from "./burger";
import NavBar from "./navBar";
import { usePathname } from "next/navigation";
import { HEADER_HEIGHT } from "@/constants/components/header";

interface HeaderProps {
  lng: string;
}

const Header: React.FC<HeaderProps> = ({ lng }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(0);
  // const [visible, setVisible] = useState(true);
  const isHomePage = usePathname() === `/${lng}`;
  const [isTop, setIsTop] = useState(isHomePage); // Track if header is at the top of the hero
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
      // setVisible(position > scrollPosition); // Detect scroll direction (up or down)
      setPosition(scrollPosition);

      setIsOpen(position == scrollPosition);
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
          lng={lng}
        />

        <nav className={`lg:flex lg:right-0 top-0 space-x-8 z-50`}>
          <NavBar isOpen={isOpen} lng={lng} dark={isTop} />
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
