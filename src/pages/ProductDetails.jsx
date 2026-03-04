import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useStore } from "../context/StoreContext";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

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
        const response = await fetch(
          `${API_BASE}/product_details/${productId}`
        );
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductDetails();
    return () => (isMounted = false);
  }, [productId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-500" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-50">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50">
        Product not found
      </div>
    );

  const {
    name,
    base_price,
    in_stock,
    description,
    image_url,
    attributes,
    sku,
  } = product;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-orange-600 mb-10 font-medium transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Shop
        </button>

        <div className="backdrop-blur-lg rounded-3xl border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-8 md:p-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* IMAGE SECTION */}
            <div className="relative rounded-2xl flex items-center justify-center p-10 shadow-inner h-[450px] lg:h-[550px] overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-50" />
              <img
                src={image_url || placeholderImg}
                alt={name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImg;
                }}
              />
            </div>

            {/* PRODUCT INFO */}
            <div className="flex flex-col justify-between">

              <div>
                <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">
                  SKU: {sku}
                </p>

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {name}
                </h1>

                <div className="flex items-center gap-6 mb-8">
                  <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                    ₦{(base_price || 0).toLocaleString()}
                  </span>

                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      in_stock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {in_stock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                    Description
                  </h3>

                  {description ? (
                    <div
                      className="text-gray-600 leading-relaxed prose prose-orange max-w-none"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  ) : (
                    <p className="text-gray-400 italic">
                      No description available.
                    </p>
                  )}
                </div>

                {/* Attributes */}
                {attributes && attributes.length > 0 && (
                  <div className="mb-10">
                    <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                      Specifications
                    </h3>

                    <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden">
                      {attributes.map((attr, i) => (
                        <div
                          key={i}
                          className="flex justify-between px-5 py-3 bg-white hover:bg-gray-50 transition"
                        >
                          <span className="text-gray-500 text-sm">
                            {attr.name || "Attribute"}
                          </span>
                          <span className="text-gray-900 font-medium text-sm">
                            {attr.value || "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ADD TO CART */}
              <div className="sticky bottom-6">
                <button
                  onClick={() => addToCart(product)}
                  disabled={!in_stock}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 text-white font-semibold text-lg transition-all duration-300 ${
                    in_stock
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-xl hover:scale-[1.02] active:scale-95"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart />
                  {in_stock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;