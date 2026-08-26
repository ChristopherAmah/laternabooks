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

  /* ---------------- ADD TO CART API ---------------- */
  const addToCartAPI = async (product) => {
    if (!product.inStock) {
      alert("Sorry, this item is currently out of stock.");
      return;
    }

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

      const data = await res.json();
      addToCart(product);
      console.log("Added to cart:", data);
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Could not add item to cart");
    }
  };

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${API_BASE_URL}/api/v2/products?page=1`);
        const data = await res.json();

        const structured = (data.products || []).slice(0, 8).map((p) => {
          const hasStock = (p.stock > 0) || (p.in_stock === true);

          return {
            id: p.id,
            name: p.name || "Unknown Product",
            price: p.price || 0,
            image_url: p.image_url || placeholderImg,
            description: p.description || "No description",
            stock_count: p.stock || 0,
            inStock: hasStock,
          };
        });

        setProducts(structured);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-gray-100 py-10 sm:py-14 px-4 sm:px-6 lg:px-16">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Featured Products
        </h2>

        <Link to="/products" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-5 py-3 sm:py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition text-sm sm:text-base">
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
              className="bg-white rounded-xl hover:shadow-xl transition flex flex-col relative overflow-hidden"
            >
              {/* Out of Stock Badge */}
              {!product.inStock && (
                <div className="absolute top-3 left-0 z-10 bg-red-600 text-white text-[10px] px-3 py-1 rounded-r-full font-bold uppercase shadow-md">
                  Sold Out
                </div>
              )}

              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className={`w-full h-40 sm:h-48 object-cover transition-all duration-300 ${
                    !product.inStock ? "grayscale opacity-60" : ""
                  }`}
                  onError={(e) => (e.target.src = placeholderImg)}
                />

                {/* Wishlist */}
                <button
                  onClick={() => addToWishlist(product)}
                  className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition"
                >
                  <FaHeart className="text-gray-400 hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 flex-1 mt-1 line-clamp-2">
                  {product.description}
                </p>

                {/* Price + Cart */}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-orange-600 text-lg">
                    ₦{product.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => addToCartAPI(product)}
                    disabled={!product.inStock}
                    className={`p-2.5 rounded-full transition-all ${
                      product.inStock
                        ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    title={product.inStock ? "Add to Cart" : "Out of Stock"}
                  >
                    <FaCartPlus size={18} />
                  </button>
                </div>

                {/* Details Button */}
                <Link to={`/productdetail/${product.id}`} className="mt-4">
                  <button className="w-full py-2 bg-orange-50 text-orange-700 rounded-lg font-medium hover:bg-orange-100 transition">
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