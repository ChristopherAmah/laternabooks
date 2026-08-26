import React, { useEffect, useState, useMemo } from "react";
import placeholderImg from "../assets/guitar.jpg";
import { FaHeart } from "react-icons/fa";
import { FaBars, FaCartPlus, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { api } from "../utils/api";

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
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ---------------- ADD TO CART API ---------------- */
  const addToCartAPI = async (product) => {
    // PREVENT ACTION IF OUT OF STOCK
    if (!product.inStock) {
      alert("Sorry, this item is currently out of stock.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

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
        const data = await api.get("/categories");
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

      try {
        const data = await api.post("/allproduct", {
          params: { page, limit: 20 },
        });

        const rawProducts = data.products || [];

        const structured = rawProducts.map((p) => {
          // Calculate stock status: check numeric stock OR boolean flag
          const hasStock = (p.stock > 0) || (p.in_stock === true);
          
          return {
            id: p.id,
            name: p.name || "Unknown Product",
            price: p.price || 0,
            image_url: p.image_url || placeholderImg,
            description: p.description || "No description",
            stock_count: p.stock || 0,
            category_ids: p.category_ids || [],
            inStock: hasStock,
          };
        });

        setProducts(structured);
        setTotalPages(data.pagination?.pages || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

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

    if (selectedCategoryIds.length > 0) {
      filteredList = filteredList.filter((p) =>
        p.category_ids.some((categoryId) => selectedCategoryIds.includes(categoryId))
      );
    }

    return filteredList;
  }, [search, searchActive, inStock, stockActive, products, selectedCategoryIds]);

  const toggleCategory = (cat) => {
    setSelectedCategoryIds((currentIds) =>
      currentIds.includes(cat.id)
        ? currentIds.filter((categoryId) => categoryId !== cat.id)
        : [...currentIds, cat.id]
    );
    setPage(1);
  };

  const categoryOptions = categories.length === 0 ? (
    <p className="text-gray-400 text-sm">Loading categories...</p>
  ) : (
    categories.map((cat) => (
      <label key={cat.id} className="flex items-center py-1.5 cursor-pointer">
        <input
          type="checkbox"
          checked={selectedCategoryIds.includes(cat.id)}
          onChange={() => toggleCategory(cat)}
          className="rounded text-orange-600"
        />
        <span className="ml-2 text-sm text-gray-600">{cat.name}</span>
      </label>
    ))
  );

  const productsToDisplay = derivedFilteredProducts;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4 md:hidden">
        <button
          type="button"
          onClick={() => setIsCategoryMenuOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
          aria-label="Open product filters"
        >
          <FaBars aria-hidden="true" />
          Filters{selectedCategoryIds.length > 0 ? ` (${selectedCategoryIds.length})` : ""}
        </button>
      </div>

      {isCategoryMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Product filters">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsCategoryMenuOpen(false)}
            aria-label="Close product filters"
          />
          <aside className="absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-700">Filters</h3>
              <button
                type="button"
                onClick={() => setIsCategoryMenuOpen(false)}
                className="p-2 text-gray-600"
                aria-label="Close product filters"
              >
                <FaXmark size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 space-y-5 overflow-y-auto pr-2">
              <div>
                <label htmlFor="mobile-product-search" className="mb-2 block text-sm font-bold text-gray-700">
                  Search
                </label>
                <input
                  id="mobile-product-search"
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSearchActive(true);
                  }}
                  className="w-full rounded-lg border p-2 text-sm"
                />
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => {
                    setInStock(e.target.checked);
                    setStockActive(true);
                  }}
                  className="rounded text-orange-600"
                />
                <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
              </label>
              <div className="border-t pt-4">
                <h4 className="mb-2 text-sm font-bold text-gray-700">Categories</h4>
                {categoryOptions}
              </div>
            </div>
          </aside>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="hidden bg-transparent p-5 md:block md:w-1/4 md:space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 border-b pb-2">Category</h3>
            <div className="max-h-[32rem] overflow-y-auto pr-2">
              {categoryOptions}
            </div>
          </div>

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

        {/* Products Grid */}
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
                    className="bg-white rounded-xl hover:shadow-xl transition flex flex-col relative overflow-hidden"
                  >
                    {/* Out of Stock Badge */}
                    {!product.inStock && (
                      <div className="absolute top-3 left-0 z-10 bg-red-600 text-white text-[10px] px-3 py-1 rounded-r-full font-bold uppercase shadow-md">
                        Sold Out
                      </div>
                    )}

                    <div className="relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className={`w-full h-48 object-cover transition-all duration-300 ${
                          !product.inStock ? "grayscale opacity-60" : ""
                        }`}
                        onError={(e) => (e.target.src = placeholderImg)}
                      />
                      <button
                        onClick={() => addToWishlist(product)}
                        className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition"
                      >
                        <FaHeart className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h2>
                      <p className="text-xs text-gray-500 flex-1 mt-1 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center mt-4">
                        <span className="font-bold text-orange-600 text-lg">
                          ₦{product.price.toLocaleString()}
                        </span>
                        
                        <button
                          onClick={() => addToCartAPI(product)}
                          disabled={!product.inStock}
                          className={`p-2.5 rounded-full transition-all ${
                            product.inStock
                              ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                          title={product.inStock ? "Add to Cart" : "Out of Stock"}
                        >
                          <FaCartPlus size={18} />
                        </button>
                      </div>

                      <Link to={`/productdetail/${product.id}`} className="mt-4">
                        <button className="w-full py-2 bg-orange-50 text-orange-700 rounded-lg font-medium hover:bg-orange-100 transition">
                          See Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-6 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-5 py-2 bg-white border border-orange-200 text-orange-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 transition"
                >
                  Previous
                </button>

                <span className="text-sm font-medium text-gray-600">
                  Page <span className="text-orange-600">{page}</span> of {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-5 py-2 bg-white border border-orange-200 text-orange-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 transition"
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
