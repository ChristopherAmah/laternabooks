import React, { useEffect, useState, useMemo } from "react";
import placeholderImg from "../assets/guitar.jpg";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { API_BASE } from "../utils/api";

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

  /* ---------------- ADD TO CART ---------------- */
  const addToCartAPI = (product) => {
    if (!product.inStock) {
      alert("Sorry, this item is currently out of stock.");
      return;
    }

    addToCart(product);
    console.log("Added to cart locally:", product);
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
        ? `${API_BASE}/category?category_id=${selectedCategoryId}&page=${page}`
        : `${API_BASE_URL}/api/v2/products?page=${page}`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

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
            inStock: hasStock,
          };
        });

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
