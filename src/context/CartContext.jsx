// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Cart Items State
  const [cartItems, setCartItems] = useState(() => {
    const savedData = localStorage.getItem('@Natureswad_Cart');
    return savedData ? JSON.parse(savedData) : [];
  });

  // 2. Sliding Drawer State (NEW)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    localStorage.setItem('@Natureswad_Cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return Number(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  const addToCart = (newItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === newItem.id && item.weight === newItem.weight);
      if (existing) {
        return prev.map(item =>
          item.id === newItem.id && item.weight === newItem.weight
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (itemId, itemWeight) => {
    setCartItems(prev => prev.filter(item => !(item.id === itemId && item.weight === itemWeight)));
  };

  const updateQuantity = (itemId, itemWeight, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item =>
      item.id === itemId && item.weight === itemWeight ? { ...item, quantity: newQty } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
      isCartOpen, openCart, closeCart // <-- Export the drawer controls!
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}