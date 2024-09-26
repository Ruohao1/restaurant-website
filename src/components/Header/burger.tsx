import { Dispatch, SetStateAction } from "react";

interface BurgerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Burger: React.FC<BurgerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex flex-col items-center justify-center w-8 h-8 absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent cursor-pointer m-2 z-50"
    >
      <div
        className={`w-8 h-1 bg-black rounded transition-transform duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-1" : ""
        }`}
      />
      <div
        className={`w-8 h-1 bg-black rounded transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "my-2"
        }`}
      />
      <div
        className={`w-8 h-1 bg-black rounded transition-transform duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-1" : ""
        }`}
      />
    </div>
  );
};

export default Burger;
