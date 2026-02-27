import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useStore } from "../context/StoreContext";

// Use .env value or fallback
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

    let isMounted = true; // prevent state update after unmount

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE}/product_details/${productId}`
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(
            `Server Error ${response.status}: ${errText}`
          );
        }

        const p = await response.json();

        if (!isMounted) return;

        setProduct({
          id: p?.id ?? null,
          name: p?.name || "Unknown Product",
          base_price: Number(p?.base_price) || 0,
          description:
            p?.description && p.description !== false
              ? p.description
              : "No description provided.",
          image_url:
            p?.image_url && p.image_url !== false
              ? `https://laternaerp.smerp.io${p.image_url}`
              : placeholderImg,
          inStock:
            p?.in_stock === true ||
            (typeof p?.qty_available === "number" &&
              p.qty_available > 0),
          attributes: Array.isArray(p?.attributes)
            ? p.attributes
            : [],
        });
      } catch (err) {
        console.error("❌ Error fetching product details:", err);
        if (isMounted) {
          setError(
            "Failed to load product details. Please check your connection and try again."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductDetails();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-orange-600 hover:text-orange-800 transition mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="overflow-hidden rounded-lg shadow-lg bg-gray-50 flex items-center justify-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="max-h-[500px] object-contain transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImg;
              }}
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-800 border-b pb-4">
              {product.name}
            </h1>

            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-orange-600">
                ₦{product.base_price.toLocaleString()}
              </p>

              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  product.inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.inStock
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Attributes */}
            {product.attributes.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Specifications
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {product.attributes.map((attr, idx) => (
                    <li key={idx}>
                      <span className="font-medium">
                        {attr?.name || "Attribute"}:
                      </span>{" "}
                      {attr?.value || "-"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 flex items-center justify-center text-white font-bold rounded-lg shadow-md transition-all duration-300 ${
                  product.inStock
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <FaShoppingCart className="mr-3" size={20} />
                {product.inStock
                  ? "Add to Cart"
                  : "Currently Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;