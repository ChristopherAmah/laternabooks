// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi"; // icons for actions

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      fetch(`http://41.78.157.87:32771/api/v1/products?search=${query}`)
        .then((res) => res.json())
        .then((data) => setProducts(data.products || []))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [query]);

  // Dummy handlers (replace with your cart/wishlist logic)
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    // TODO: integrate with CartContext or backend
  };

  const handleAddToWishlist = (product) => {
    console.log("Added to wishlist:", product);
    // TODO: integrate with WishlistContext or backend
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Search results for: <span className="text-orange-600">{query}</span>
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h2 className="font-semibold text-gray-800">{product.name}</h2>
              <p className="text-orange-600 font-bold mb-3">
                ₦{product.price}
              </p>

              {/* Action buttons */}
              <div className="flex justify-between items-center mt-auto space-x-2">
                {/* View Details */}
                <Link
                  to={`/products/${product.id}`}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  <FiEye /> Details
                </Link>

                {/* Add to Wishlist */}
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="flex items-center gap-1 text-sm text-pink-600 hover:underline"
                >
                  <FiHeart /> Wishlist
                </button>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-1 text-sm text-green-600 hover:underline"
                >
                  <FiShoppingCart /> Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
