import React, { useEffect, useState } from "react";
import placeholderImg from "../assets/guitar.jpg";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const API_BASE_URL = "https://laternaerp.smerp.io";

const HomeProducts = () => {
  const { addToCart, addToWishlist } = useStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCartAPI = async (product) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/v1/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      addToCart(product);
    } catch {
      alert("Could not add item to cart");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/v2/products?page=1`);
        const data = await res.json();

        setProducts(
          (data.products || []).slice(0, 8).map((p) => ({
            id: p.id,
            name: p.name || "Unknown Product",
            price: p.price || 0,
            image_url: p.image_url || placeholderImg,
            description: p.description || "No description",
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-gray-100 py-10 sm:py-14 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Featured Products
        </h2>

        <Link to="/products" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-5 py-3 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm sm:text-base">
            See All Products
          </button>
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover rounded-t-xl"
                  onError={(e) => (e.target.src = placeholderImg)}
                />

                <button
                  onClick={() => addToWishlist(product)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow active:scale-95"
                >
                  <FaHeart />
                </button>
              </div>

              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  {product.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 flex-1">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-orange-600 text-sm sm:text-base">
                    ₦{product.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => addToCartAPI(product)}
                    className="p-2 sm:p-2.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 active:scale-95"
                  >
                    <FaCartPlus size={14} />
                  </button>
                </div>

                <Link to={`/productdetail/${product.id}`}>
                  <button className="mt-3 sm:mt-4 w-full py-2 text-xs sm:text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 active:scale-95">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeProducts;