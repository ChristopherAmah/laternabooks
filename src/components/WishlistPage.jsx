import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaCartPlus, FaHeartBroken } from 'react-icons/fa';
import { useStore } from '../context/StoreContext';
import placeholderImg from "../assets/guitar.jpg";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <FaHeartBroken size={80} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-2 mb-6">Looks like you haven't saved anything yet.</p>
        <Link 
          to="/products" 
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition shadow-lg"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          My Wishlist <span className="text-orange-500">({wishlist.length})</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image_url || placeholderImg} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-red-50 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 shadow-sm"
                  title="Remove from wishlist"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {product.name}
                  </h2>
                </div>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {product.description || "No description available."}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">
                    ₦{product.price?.toLocaleString()}
                  </span>
                  
                  <div className="flex gap-2">
                    <Link 
                      to={`/productdetail/${product.id}`}
                      className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                      VIEW
                    </Link>
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition shadow-md shadow-orange-100"
                    >
                      <FaCartPlus /> ADD
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