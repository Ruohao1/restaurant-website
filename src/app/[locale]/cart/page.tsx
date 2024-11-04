"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import GoToMenuButton from "@/components/Navigation/GoToMenuButton";
import { Link } from "@/i18n/routing";

const CartPage: React.FC = () => {
  const t = useTranslations("CartPage");
  const {
    cart,
    total,
    removeFromCart,
    clearCart,
    increaseQuantity: addOneToCart,
    decreaseQuantity: removeOneFromCart,
  } = useCart();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Payment successful. Clearing cart...");
      clearCart(); // Only clear on successful payment
    }
    if (query.get("canceled")) {
      console.log("Payment canceled. Cart remains unchanged.");
    }
  }, [clearCart]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mt-8 text-3xl font-bold text-gray-800 mb-6">
        {t("title")}
      </h1>
      <GoToMenuButton />
      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">{t("empty-cart")}</p>
      ) : (
        <div className="space-y-6">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm text-gray-500">{item.price} €</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeOneFromCart(item.id)}
                    className="p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    aria-label="Decrease quantity"
                  >
                    <MinusIcon className="h-5 w-5" />
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addOneToCart(item.id)}
                    className="p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    aria-label="Increase quantity"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:text-red-600 transition duration-200"
                    aria-label="Remove item"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-800">
              {t("total")}: {total.toFixed(2)} €
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-4 mt-4">
            <button
              onClick={clearCart}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              {t("clear")}
            </button>
            <Button
              // onClick={handleCheckout}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
            >
              {/* {loading ? t("loading") : t("checkout")} */}
              <Link href="/checkout">{t("command")}</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
