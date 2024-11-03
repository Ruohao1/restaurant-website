"use client";
import { CartItem, useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { getMenuComposition } from "@/lib/utils";

interface AddToCartButtonProps {
  menu: {
    id: number;
    code: string | null;
    name: string;
    description: string | null;
    menu_food: {
      food: {
        id: number;
        name: string;
      } | null;
      food_types: {
        id: number;
        title: string;
      } | null;
      quantity: number;
    }[];
    price: number;
    image: string | null;
    stripe_price_id: string | null;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ menu }) => {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  async function handleAddToCart() {
    setLoading(true);

    const desc = getMenuComposition(menu);
    console.log(
      "Menu composition:",
      desc + (menu.description ? "(" + menu.description + ")" : "")
    );

    const item: CartItem = {
      id: menu.id,
      stripe_price_id: menu.stripe_price_id,
      name: menu.name,
      description:
        desc + (menu.description ? " (" + menu.description + ")" : ""),
      price: menu.price,
      quantity: 1,
    };

    addToCart(item);

    setLoading(false);
  }

  return (
    <Button
      className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      aria-label="Add to cart"
      onClick={handleAddToCart}
      disabled={loading}
    >
      {loading ? "Adding to cart..." : <ShoppingCartIcon className="h-5 w-5" />}
    </Button>
  );
};

export default AddToCartButton;
