import { Dispatch, SetStateAction } from "react";

interface BurgerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dark?: boolean;
}

const Burger: React.FC<BurgerProps> = ({ isOpen, setIsOpen, dark }) => {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex flex-col items-center justify-center w-8 h-8 absolute right-0 transform top-0 -translate-y-1/2 bg-transparent cursor-pointer m-4 mr/* -0 z-50"
    >
      <div
        className={`w-8 h-1 ${
          dark ? `bg-gray-300` : "bg-gray-800"
        } rounded transition-transform duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-1" : ""
        }`}
      />
      <div
        className={`w-8 h-1 ${
          dark ? `bg-gray-300` : "bg-gray-800"
        } rounded transition-transform duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "my-2"
        }`}
      />
      <div
        className={`w-8 h-1 ${
          dark ? `bg-gray-300` : "bg-gray-800"
        } rounded transition-transform duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-1" : ""
        }`}
      />
    </div>
  );
};

export default Burger;
