"use client";
import { CartItem, useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface AddToCartButtonProps {
  product: Menu;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { cart, addOneToCart } = useCart();

  async function handleAddToCart() {
    setLoading(true);

    const item: CartItem = {
      id: product.stripe_price_id!,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    addOneToCart(item);

    setLoading(false);
  }

  // Observe changes in the cart
  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

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
