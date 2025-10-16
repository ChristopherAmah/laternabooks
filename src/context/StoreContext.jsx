import React, { createContext, useState, useContext } from 'react';

// Placeholder image URL for cart items (still needed for rendering if items are added)
const PLACEHOLDER_IMAGE = "https://placehold.co/50x50/F97316/FFFFFF?text=Item";

// Create the context
const StoreContext = createContext();

// Custom hook to use the store context easily
export const useStore = () => {
  return useContext(StoreContext);
};

// Create the provider component
export const StoreProvider = ({ children }) => {
  // Initialize cartItems with an empty array so the count starts at 0
  const [cartItems, setCartItems] = useState([]); 
  
  // Wishlist still manages count 
  const [wishlistCount, setWishlistCount] = useState(0);

  // Cart Count is derived from the items array length
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Function to add item (takes a product object)
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Otherwise, add new item
        // Ensure that new item has a default quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove item (removes entire product from cart)
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Function to increment quantity
  const incrementQuantity = (itemId) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrement quantity
  const decrementQuantity = (itemId) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === itemId) {
          // Decrement quantity, ensuring it doesn't go below 1.
          return { ...item, quantity: Math.max(1, item.quantity - 1) }; 
        }
        return item;
      })
    );
  };
  
  // Functions for wishlist (remains count-based for now)
  const addToWishlist = (quantity = 1) => {
    setWishlistCount(prev => prev + quantity);
  };

  const removeFromWishlist = (quantity = 1) => {
    setWishlistCount(prev => Math.max(0, prev - quantity));
  };

  const value = {
    cartCount,
    wishlistCount,
    cartItems, // Export the actual item array
    addToCart,
    removeFromCart,
    incrementQuantity, // Export new functions
    decrementQuantity, // Export new functions
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
