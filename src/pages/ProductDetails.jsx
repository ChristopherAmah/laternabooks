// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // Get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://41.78.157.87:32771/api/v1/products/${id}`);
        console.log("Product API response:", res.data);

        setProduct(res.data); // adjust if API wraps inside {product: {...}}
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="p-4">Loading product...</p>;
  }

  if (!product) {
    return <p className="p-4">Product not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
        <img
          src={
            product.image_url && product.image_url !== ""
              ? product.image_url
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description || "No description available"}</p>
        {product.price && (
          <p className="text-xl font-semibold text-green-600">₦{product.price}</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
