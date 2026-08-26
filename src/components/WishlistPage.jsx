import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaCartPlus, FaHeartBroken } from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import placeholderImg from "../assets/guitar.jpg";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  /* ---------------- EMPTY STATE ---------------- */
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex flex-col items-center justify-center px-6 text-center">

        <div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl shadow-xl border border-white/40 max-w-md w-full">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white/80 backdrop-blur-lg rounded-3xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
            >

              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                <img
                  src={product.image_url || placeholderImg}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

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
              <div className="p-6 flex flex-col flex-grow">

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
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <FaCartPlus size={14} />
                      Add
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