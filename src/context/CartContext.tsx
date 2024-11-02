// src/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of a cart item
export interface CartItem {
  id: number;
  stripe_price_id?: string | null;
  name: string;
  price: number;
  quantity: number;
}

// Define the shape of the context
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getItemById: (id: number) => CartItem | undefined;
  getItemCount: () => number;
  total: number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider component that provides the cart state
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (id: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      // Remove the item if quantity reaches zero
      return prevCart.filter((item) => item.id !== id);
    });
  };

  // Function to get an item by its ID
  const getItemById = (id: number) => {
    return cart.find((item) => item.id === id);
  };

  // Function to get the total count of items in the cart
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Calculate the total price of the items in the cart
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getItemById,
        getItemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
