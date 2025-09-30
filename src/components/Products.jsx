import React, { useEffect, useState } from "react";
import placeholderImg from "../assets/guitar.jpg";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [inStock, setInStock] = useState(false);
  const [categories, setCategories] = useState([]); // distinct categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://41.78.157.87:32771/api/v1/products?page=${page}`
        );
        const data = await res.json();
        const prods = data.products || [];
        setProducts(prods);
        setPages(data.pages || 1);

        // Build categories (use product.name’s first word as placeholder category)
        const cats = [
          ...new Set(prods.map((p) => p.name.split(" ")[0].toUpperCase())),
        ];
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (inStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.name.split(" ")[0].toUpperCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, search, priceRange, inStock, selectedCategories]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-8 tracking-wide">
        PRODUCTS
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full md:w-1/4 space-y-6">
          <h2 className="text-xl font-bold border-b pb-2">Filters</h2>

          {/* Search */}
          <div>
            <label className="block mb-1 font-semibold">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-semibold">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-1/2 px-2 py-1 border rounded"
                placeholder="Min"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-1/2 px-2 py-1 border rounded"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              <span>Only show in-stock</span>
            </label>
          </div>

          {/* Categories */}
          {/* <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div> */}
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-300">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 p-4 flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={product.image_url || placeholderImg}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => (e.target.src = placeholderImg)}
                    />
                  </div>
                  <div className="mt-3 flex-1 flex flex-col">
                    <h2 className="text-md font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500 flex-1">
                      {product.description || "No description"}
                    </p>
                    <p className="mt-2 font-bold text-orange-600 text-lg">
                      ₦{product.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-semibold text-gray-700">
              Page {page} of {pages}
            </span>
            <button
              disabled={page === pages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
