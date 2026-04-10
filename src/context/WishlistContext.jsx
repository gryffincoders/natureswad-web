// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedData = localStorage.getItem('@Natureswad_Wishlist');
    return savedData ? JSON.parse(savedData) : [];
  });

  // --- DRAWER STATE ---
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  useEffect(() => {
    localStorage.setItem('@Natureswad_Wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlistItem = (item) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);
  const getWishlistCount = () => wishlistItems.length;
  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, toggleWishlistItem, isInWishlist, getWishlistCount, clearWishlist,
      isWishlistOpen, openWishlist, closeWishlist // <-- Export Drawer Controls
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}