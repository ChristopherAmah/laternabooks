import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaCartPlus, FaHeartBroken } from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import placeholderImg from "../assets/guitar.jpg";

const isInStock = (product) =>
  product.inStock === true || product.in_stock === true || Number(product.stock) > 0;

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  /* ---------------- EMPTY STATE ---------------- */
  if (wishlist.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 px-4 text-center sm:px-6">

        <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-xl sm:p-12">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-orange-50 rounded-full">
            <FaHeartBroken size={40} className="text-orange-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mb-8">
            Save items you love and they’ll appear here.
          </p>

          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN PAGE ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 px-4 py-10 sm:px-6 sm:py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col md:mb-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              My Wishlist
            </h1>
            <p className="text-gray-500 mt-2">
              {wishlist.length} saved item{wishlist.length > 1 && "s"}
            </p>
          </div>

          <Link
            to="/products"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition"
          >
            Continue Shopping →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white/80 backdrop-blur-lg rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
            >

              {/* IMAGE */}
              <div className="relative h-28 overflow-hidden bg-gradient-to-br from-gray-50 to-white sm:h-56 md:h-64">
                <img
                  src={product.image_url || placeholderImg}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    !isInStock(product) ? "grayscale opacity-60" : ""
                  }`}
                />

                {!isInStock(product) && (
                  <div className="absolute left-0 top-4 bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white shadow-md">
                    Sold Out
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-red-500 shadow-md hover:bg-red-500 hover:text-white transition-all"
                  title="Remove from wishlist"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex flex-grow flex-col p-3 sm:p-6">

                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {product.description || "No description available."}
                </p>

                <div className="mt-auto">

                  {/* Price */}
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent mb-4">
                    ₦{product.price?.toLocaleString()}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/productdetail/${product.id}`}
                      className="flex-1 text-center py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={!isInStock(product)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isInStock(product)
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:scale-[1.02] active:scale-95"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      title={isInStock(product) ? "Add to cart" : "Out of stock"}
                    >
                      <FaCartPlus size={14} />
                      {isInStock(product) ? "Add" : "Sold Out"}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;