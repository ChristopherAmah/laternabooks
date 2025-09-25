import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const { addToCart } = useContext(CartContext);

  const limit = 40;
  const API_BASE = "http://41.78.157.87:32771/api/v1";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/products?page=${page}&limit=${limit}`
        );

        if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
          setPages(res.data.pages || 1);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded p-4 hover:shadow-lg transition"
            >
              <img
                src={
                  product.image_url && product.image_url !== ""
                    ? product.image_url
                    : "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold line-clamp-2">
                {product.name}
              </h2>
              {product.price && (
                <p className="text-gray-600 mt-1">₦{product.price}</p>
              )}
              <div className="flex justify-between items-center mt-3">
                <Link
                  to={`/products/${product.id}`}
                  className="text-orange-500 hover:underline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                >
                  <FiShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
