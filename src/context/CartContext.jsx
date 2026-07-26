import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { loggedInUser } = useContext(Auth);
  useEffect(() => {
    if (!loggedInUser) {
      setItems([]);
      return;
    }

    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};

    setItems(allCarts[loggedInUser.email] || []);
  }, [loggedInUser]);

  useEffect(() => {
    if (!loggedInUser) return;

    const allCarts = JSON.parse(localStorage.getItem("carts")) || {};

    allCarts[loggedInUser.email] = items;

    localStorage.setItem("carts", JSON.stringify(allCarts));
  }, [items, loggedInUser]);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { product, qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = items.reduce(
    (sum, i) => sum + i.qty * Number(i.product.price),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
