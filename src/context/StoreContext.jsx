import React, { createContext, useState, useContext, useEffect } from "react";

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  // 1. Initialize states from LocalStorage to prevent data loss on refresh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [notification, setNotification] = useState(null);

  // 2. Sync states to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  // --- Cart Logic ---
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        showNotification("Quantity updated in cart");
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showNotification("Added to cart");
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    showNotification("Item removed from cart");
  };

  const incrementQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  // --- Wishlist Logic ---
  // Derived count for the Navbar badge
  const wishlistCount = wishlist.length;

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isExisting = prevWishlist.find((item) => item.id === product.id);
      
      if (isExisting) {
        // Toggle feature: If it exists, remove it
        showNotification("Removed from wishlist");
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        // Add new item
        showNotification("Added to wishlist");
        return [...prevWishlist, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showNotification("Removed from wishlist");
  };

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        cartCount,
        wishlist,        // Expose the actual array
        wishlistCount,   // Expose the count for the UI
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        addToWishlist,   // Now accepts a product object
        removeFromWishlist,
        notification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};