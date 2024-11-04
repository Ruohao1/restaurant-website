"use client";

import { Link, useRouter } from "@/i18n/routing"; // Import the useRouter hook from the routing module
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface GoToCartButtonProps {
  className?: string; // Accept className as a prop
}

const GoToCartButton: React.FC<GoToCartButtonProps> = ({ className }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/cart"); // Navigate to the cart page
  };

  const { cart } = useCart();

  const isEmpty = cart.length === 0;

  return (
    <Link href="/cart" className={isEmpty ? "hidden md:block lg:block" : ""}>
      <span
        onClick={isEmpty ? handleClick : () => {}}
        aria-label="Go to Cart"
        className={`fixed bottom-8 left-8 p-3 ${
          isEmpty ? "bg-teal-100" : "bg-teal-500"
        } text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-200 z-50 ${className} md:relative md:bottom-auto md:left-auto md:rounded-lg md:p-2 flex items-center space-x-2`}
      >
        <ShoppingCart className="h-8 w-8" />{" "}
        {/* Icon with larger size for mobile */}
      </span>
    </Link>
  );
};

export default GoToCartButton;
