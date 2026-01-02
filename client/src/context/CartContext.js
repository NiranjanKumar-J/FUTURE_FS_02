import React, { createContext, useState } from 'react';
import { useToast } from './ToastContext'; // ✅ Import Hook

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { showToast } = useToast(); // ✅ Get the function

  // Add Item
  const addToCart = (product) => {
    setCart([...cart, product]);
    showToast(`${product.name} Added to Cart! 🛒`, 'success'); // ✨ TOAST MAGIC
  };

  // Remove Item
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
    showToast("Item Removed from Cart 🗑️", 'error'); // ✨ TOAST MAGIC
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};