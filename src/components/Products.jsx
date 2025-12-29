import React, { useEffect, useState, useMemo } from "react";
import placeholderImg from "../assets/guitar.jpg";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

const API_BASE_URL = "http://41.78.157.87:32771";

const Products = () => {
  const { addToCart, addToWishlist } = useStore();

  const [products, setProducts] = useState([]); // Base list of products
  // Removed filteredProducts state, as it will be derived.
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [inStock, setInStock] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [stockActive, setStockActive] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // --- Category Fetch ---
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

  // --- Product Fetch ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      // Note: You had a 'http://localhost:3001' URL used when a category was selected.
      // I am assuming the category endpoint should also point to your API_BASE_URL (41.78...)
      // I've kept the original URL structure for now but you may need to adjust the category URL.
      let apiUrl = selectedCategoryId
        ? `http://localhost:3001/api/category?category_id=${selectedCategoryId}&page=${page}`
        : `${API_BASE_URL}/api/v2/products?page=${page}`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        // Ensure data.products exists and is an array before mapping
        const rawProducts = data.products || [];

        const structured = rawProducts.map((p) => ({
          id: p.id,
          name: p.name || "Unknown Product",
          price: p.price || 0,
          image_url: p.image_url || placeholderImg,
          description: p.description || "No description",
          // Use a reasonable stock check
          inStock: p.stock > 0 || p.in_stock === true, 
        }));

        setProducts(structured); // Set the base list of products
        if (data.pages) setTotalPages(data.pages);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategoryId, page]);


  // --- Filtering Logic (Derived State) ---
  // Use useMemo to calculate the filtered list only when dependencies change, 
  // preventing the infinite loop and optimizing performance.
  const derivedFilteredProducts = useMemo(() => {
    let filteredList = products; // Start with the fetched products

    // 1. Apply Search Filter
    if (searchActive && search) {
      filteredList = filteredList.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 2. Apply Stock Filter
    if (stockActive && inStock) {
      filteredList = filteredList.filter((p) => p.inStock);
    }

    return filteredList;
  }, [search, searchActive, inStock, stockActive, products]); // Dependencies: only the filters and the base list

  
  const toggleCategory = (cat) => {
    setSelectedCategoryId(selectedCategoryId === cat.id ? null : cat.id);
    setPage(1);
  };
  
  // Use derivedFilteredProducts for rendering
  const productsToDisplay = derivedFilteredProducts;


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* <h1 className="text-3xl font-bold text-orange-500 text-center mb-8 tracking-wide">
        PRODUCTS
      </h1> */}

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
                    id={cat.name}
                    checked={selectedCategoryId === cat.id}
                    onChange={() => toggleCategory(cat)}
                    className="rounded text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor={cat.name} className="ml-2 text-sm text-gray-600">
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Stock filter */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 border-b pb-2">Status</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                checked={inStock}
                onChange={(e) => {
                  setInStock(e.target.checked);
                  setStockActive(true);
                }}
                className="rounded text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="inStock" className="ml-2 text-sm text-gray-600">
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : productsToDisplay.length === 0 ? (
            <p className="text-center text-gray-500">No products found matching filters.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-300">
                {productsToDisplay.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl  hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image_url || placeholderImg}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => (e.target.src = placeholderImg)}
                      />
                      <button
                        onClick={() => addToWishlist(product)}
                        className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:bg-opacity-100 transition-all duration-300 z-10"
                        title="Add to Wishlist"
                      >
                        <FaHeart size={18} />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h2 className="text-md font-semibold text-gray-800 line-clamp-2">{product.name}</h2>
                      <p className="text-sm text-gray-500 flex-1 line-clamp-3 mt-1">
                        {product.description || "No description"}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-orange-600 text-lg">
                          ₦{product.price?.toLocaleString()}
                        </p>
                        <button
                          onClick={() => addToCart(product)}
                          className="p-2 bg-orange-500 cursor-pointer text-white rounded-full shadow-lg hover:bg-orange-600 transition"
                          title="Add to Cart"
                        >
                          <FaCartPlus size={16} />
                        </button>
                      </div>

                      <Link to={`/productdetail/${product.id}`}>
                        <button className="mt-4 w-full py-2 cursor-pointer bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-200 border border-orange-200">
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
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-orange-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-orange-200 rounded disabled:opacity-50"
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