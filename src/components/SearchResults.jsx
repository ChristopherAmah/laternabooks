// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      fetch(`https://laternaerp.smerp.io/api/v1/products?search=${query}`)
        .then((res) => res.json())
        .then((data) => setProducts(data.products || []))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [query]);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const handleAddToWishlist = (product) => {
    console.log("Added to wishlist:", product);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
          Search results for:{" "}
          <span className="text-orange-600">{query}</span>
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col"
              >
                {/* Product Image + Wishlist Button */}
                <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist button */}
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-pink-50 transition"
                  >
                    <FiHeart
                      size={18}
                      className="text-pink-600 hover:text-pink-700"
                    />
                  </button>
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow p-4">
                  <h2 className="font-semibold text-gray-800 text-sm md:text-base mb-1 line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="text-orange-600 font-bold mb-3">
                    ₦{product.price}
                  </p>

                  {/* Action buttons */}
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100 text-sm text-gray-600">
                    <Link
                      to={`/products/${product.id}`}
                      className="hover:text-orange-600 transition font-medium"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-1 hover:text-green-600 transition"
                    >
                      <FiShoppingCart size={16} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <img
              src="/no-results.svg"
              alt="No results"
              className="w-48 mb-6 opacity-80"
            />
            <p className="text-gray-600 text-lg">
              No products found for{" "}
              <span className="text-orange-600 font-medium">"{query}"</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
