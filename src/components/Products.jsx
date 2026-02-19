import React, { useEffect, useState, useMemo } from "react";
import placeholderImg from "../assets/guitar.jpg";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const API_BASE_URL = "https://laternaerp.smerp.io";

const Products = () => {
  const { addToCart, addToWishlist } = useStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [inStock, setInStock] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [stockActive, setStockActive] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ---------------- ADD TO CART API ---------------- */
  const addToCartAPI = async (product) => {
    try {
      const token = localStorage.getItem("token"); // adjust if needed

      const res = await fetch(`${API_BASE_URL}/api/v1/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await res.json();

      // sync local cart UI
      addToCart(product);

      console.log("Added to cart:", data);
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Could not add item to cart");
    }
  };

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/categories`);
        const data = await res.json();
        if (data.categories) setCategories(data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const apiUrl = selectedCategoryId
        ? `http://localhost:3001/api/category?category_id=${selectedCategoryId}&page=${page}`
        : `${API_BASE_URL}/api/v2/products?page=${page}`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        const rawProducts = data.products || [];

        const structured = rawProducts.map((p) => ({
          id: p.id,
          name: p.name || "Unknown Product",
          price: p.price || 0,
          image_url: p.image_url || placeholderImg,
          description: p.description || "No description",
          inStock: p.stock > 0 || p.in_stock === true,
        }));

        setProducts(structured);
        if (data.pages) setTotalPages(data.pages);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategoryId, page]);

  /* ---------------- FILTER LOGIC ---------------- */
  const derivedFilteredProducts = useMemo(() => {
    let filteredList = products;

    if (searchActive && search) {
      filteredList = filteredList.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (stockActive && inStock) {
      filteredList = filteredList.filter((p) => p.inStock);
    }

    return filteredList;
  }, [search, searchActive, inStock, stockActive, products]);

  const toggleCategory = (cat) => {
    setSelectedCategoryId(selectedCategoryId === cat.id ? null : cat.id);
    setPage(1);
  };

  const productsToDisplay = derivedFilteredProducts;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="bg-transparent p-5 w-full md:w-1/4 space-y-6">
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 border-b pb-2">Category</h3>
            {categories.length === 0 ? (
              <p className="text-gray-400 text-sm">Loading categories...</p>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategoryId === cat.id}
                    onChange={() => toggleCategory(cat)}
                    className="rounded text-orange-600"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    {cat.name}
                  </label>
                </div>
              ))
            )}
          </div>

          {/* Search */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 border-b pb-2">Search</h3>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSearchActive(true);
              }}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Stock */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 border-b pb-2">Status</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => {
                  setInStock(e.target.checked);
                  setStockActive(true);
                }}
                className="rounded text-orange-600"
              />
              <label className="ml-2 text-sm text-gray-600">
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : productsToDisplay.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productsToDisplay.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl hover:shadow-xl transition flex flex-col"
                  >
                    <div className="relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => (e.target.src = placeholderImg)}
                      />
                      <button
                        onClick={() => addToWishlist(product)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full"
                      >
                        <FaHeart />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-500 flex-1">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-orange-600">
                          ₦{product.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => addToCartAPI(product)}
                          className="p-2 bg-orange-500 text-white rounded-full"
                        >
                          <FaCartPlus />
                        </button>
                      </div>

                      <Link to={`/productdetail/${product.id}`}>
                        <button className="mt-4 w-full py-2 bg-orange-100 text-orange-700 rounded-lg">
                          See Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-orange-200 rounded"
                >
                  Previous
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-orange-200 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
