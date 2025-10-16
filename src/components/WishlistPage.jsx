import React from "react";
import { useCartWishlist } from "../context/CartWishlistContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCartWishlist();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <p className="text-orange-600">{item.price}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
