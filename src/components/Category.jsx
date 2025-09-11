import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const limit = 40; // how many products per page

  // Fetch products from API with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://41.78.157.87:32771/api/v1/products?page=${page}&limit=${limit}`,
          {
            headers: {
              // Uncomment if your API requires token
              // Authorization: "Bearer YOUR_API_TOKEN",
            },
          }
        );

        console.log("API response:", res.data);

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

  if (loading) {
    return <p className="p-4">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          {/* Products Grid */}
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
                      : "https://via.placeholder.com/200"
                  }
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                {product.price && (
                  <p className="text-gray-600 mt-1">₦{product.price}</p>
                )}
                <a
                  href={`/products/${product.id}`}
                  className="mt-3 inline-block text-blue-500 hover:underline"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {pages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
              disabled={page === pages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
