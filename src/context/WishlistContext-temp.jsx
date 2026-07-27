import React, { createContext, useContext, useEffect, useState } from "react";
import { Auth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { loggedInUser } = useContext(Auth);

  useEffect(() => {
    if (!loggedInUser) {
      setWishlist([]);
      return;
    }

    const allWishLists = JSON.parse(localStorage.getItem("wishlists")) || {};
    setWishlist(allWishLists[loggedInUser.email] || []);
  }, [loggedInUser]);

  useEffect(() => {
    if (!loggedInUser) return;

    const allWishLists = JSON.parse(localStorage.getItem("wishlists")) || {};
    allWishLists[loggedInUser.email] = wishlist;

    localStorage.setItem("wishlists", JSON.stringify(allWishLists));
  }, [wishlist, loggedInUser]);

  const isWishlisted = (productId) => wishlist.some((p) => p.id === productId);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      isWishlisted(product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product],
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
