import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useStore } from "../context/StoreContext";

const API_BASE_URL = "http://localhost:3001/api/product_details";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/${productId}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        if (!data.result) throw new Error("Invalid API response format");

        const p = data.result;
        setProduct({
          id: p.id,
          name: p.name || "Unknown Product",
          base_price: p.base_price || 0,
          description: p.description || "No description",
          image_url: p.image_url ? `http://41.78.157.87:32771${p.image_url}` : placeholderImg,
          inStock: p.in_stock !== false,
          attributes: p.attributes || [],
        });
      } catch (err) {
        console.error("❌ Error fetching product details:", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProductDetails();
  }, [productId]);

  if (loading) return <div className="text-center p-10 text-xl">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-600">{error}</div>;
  if (!product) return <div className="text-center p-10">Product not found.</div>;

  const handleAddToCart = () => addToCart(product);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-orange-600 hover:text-orange-800 transition mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => (e.target.src = placeholderImg)}
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-800 border-b pb-4">{product.name}</h1>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-orange-600">
                ₦{product.base_price.toLocaleString()}
              </p>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            {product.attributes.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {product.attributes.map((attr, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{attr.name}:</span> {attr.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3 flex items-center justify-center text-white font-bold rounded-lg shadow-md transition-all duration-300 ${product.inStock ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400 cursor-not-allowed"}`}
              >
                <FaShoppingCart className="mr-3" size={20} />
                {product.inStock ? "Add to Cart" : "Currently Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
