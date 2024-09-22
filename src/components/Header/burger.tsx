import { Dispatch, SetStateAction } from "react";

interface BurgerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Burger: React.FC<BurgerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`flex flex-col items-center justify-center w-8 h-8 absolute top-0 bg-transparent cursor-pointer m-2 z-2`}
    >
      <div
        className={`w-8 h-1 bg-black rounded transition-all duration-300 ease-in-out origin-center ${
          isOpen ? "rotate-45 translate-y-2" : "rotate-0"
        }`}
      />
      <div
        className={`w-8 h-1 bg-black rounded transition-all duration-300 ease-in-out ${
          isOpen ? "my-1 opacity-0" : "my-[0.375rem] opacity-1"
        }`}
      />
      <div
        className={`w-8 h-1 bg-black rounded transition-all duration-300 ease-in-out origin-center ${
          isOpen ? "-rotate-45 -translate-y-2" : "rotate-0"
        }`}
      />
    </div>
  );
};

export default Burger;
