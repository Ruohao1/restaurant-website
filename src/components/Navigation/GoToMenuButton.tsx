import { useRouter } from "@/i18n/routing"; // Import the useRouter hook from the routing module
import { SquareMenu } from "lucide-react"; // Import the Menu icon from Lucide

interface GoToMenuButtonProps {
  className?: string; // Accept className as a prop
}

const GoToMenuButton: React.FC<GoToMenuButtonProps> = ({ className }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/menu"); // Navigate to the menu page
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Go to Menu"
      className={`fixed bottom-8 left-8 p-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-200 z-50 ${className} md:relative md:bottom-auto md:left-auto md:rounded-lg md:p-2 flex items-center space-x-2`}
    >
      <SquareMenu className="h-8 w-8" />{" "}
      {/* Icon with larger size for mobile */}
    </button>
  );
};

export default GoToMenuButton;
