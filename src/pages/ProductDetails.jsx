import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg"; 
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useStore } from "../context/StoreContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;
    let isMounted = true;

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/product_details/${productId}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductDetails();
    return () => { isMounted = false; };
  }, [productId]);

  if (loading) return <div className="flex justify-center items-center h-screen font-sans text-gray-700">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center items-center h-screen text-gray-500">Product not found</div>;

  return (
    <div className="min-h-screen  p-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 md:p-12 transition-transform transform hover:scale-[1.01]">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-orange-600 hover:text-orange-800 mb-8 font-semibold transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image */}
          <div className="relative bg-gray-50 rounded-xl p-6 flex justify-center items-center h-[450px] lg:h-[550px] overflow-hidden shadow-inner hover:shadow-lg transition-shadow">
            <img
              src={product.image_url || placeholderImg}
              alt={product.name}
              className="max-h-full max-w-full object-contain transform transition-transform hover:scale-105"
              onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg; }}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-6 mb-6">
                <span className="text-3xl font-bold text-orange-600">
                  ₦{(product.base_price || 0).toLocaleString()}
                </span>
                <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${
                  product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-700 mb-2 text-lg">Description</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* Attributes */}
              {product.attributes?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-700 mb-3 text-lg">Product Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {product.attributes.map((attr, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-gray-500">{attr.name || "Spec"}:</span>
                        <span className="text-gray-800 font-medium">{attr.value || "N/A"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className={`mt-6 w-full py-4 rounded-xl flex items-center justify-center gap-3 text-white font-bold transition-all duration-300 ${
                product.inStock 
                ? "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl" 
                : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <FaShoppingCart />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;