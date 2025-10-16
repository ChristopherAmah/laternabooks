import React, { useEffect, useState } from "react";
import placeholderImg from "../assets/guitar.jpg";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStore } from '../context/StoreContext'; 

const Products = () => {
  // Destructure the functions from the global store
  const { addToCart, addToWishlist } = useStore(); 

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]); 
  const [inStock, setInStock] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSeeDetails = (productId) => {
    console.log(`Navigating to details page for product ${productId}`);
    // Implement your navigation logic here
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://41.78.157.87:32771/api/v1/products?page=${page}`
        );
        const data = await res.json();
        const prods = data.products || [];
        // Map products to ensure they have a consistent structure expected by the context
        const structuredProds = prods.map(p => ({
            id: p.id,
            name: p.name || 'Unknown Product',
            price: p.price || 0,
            image_url: p.image_url || placeholderImg,
            description: p.description || '',
            stock: p.stock || 0,
        }));
        setProducts(structuredProds);
        setPages(data.pages || 1);

        const cats = [
          ...new Set(structuredProds.map((p) => p.name.split(" ")[0].toUpperCase())),
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

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Assuming price is a number field in the product object
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
        {/* Sidebar Filters (omitted for brevity) */}
        <div className="bg-white p-5 rounded-xl shadow-md w-full md:w-1/4 space-y-6">
          {/* ... Filter content ... */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 border-b pb-2">Category</h3>
            {categories.map((cat) => (
              <div key={cat} className="flex items-center">
                <input
                  type="checkbox"
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor={cat} className="ml-2 text-sm text-gray-600">
                  {cat}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 border-b pb-2">Search</h3>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 border-b pb-2">Status</h3>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="inStock"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
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
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found matching filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-300">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-0 flex flex-col overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image_url || placeholderImg}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => (e.target.src = placeholderImg)}
                    />
                    
                    {/* Wishlist Icon */}
                    <button
                      onClick={() => addToWishlist(1)} 
                      className="absolute top-2 right-2 p-2 bg-white cursor-pointer bg-opacity-75 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:bg-opacity-100 transition-all duration-300 z-10"
                      title="Add to Wishlist"
                    >
                      <FaHeart size={18} />
                    </button>

                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-md font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500 flex-1 line-clamp-3 mt-1">
                      {product.description || "No description"}
                    </p>
                    
                    {/* Price and Cart Button Side-by-Side */}
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-orange-600 text-lg">
                          ₦{product.price?.toLocaleString()}
                        </p>

                        <button
                          onClick={() => addToCart(product)} 
                          className="p-2 bg-orange-500 text-white rounded-full cursor-pointer shadow-lg hover:bg-orange-600 transition-colors duration-200"
                          title="Add to Cart"
                        >
                          <FaShoppingCart size={18} />
                        </button>
                    </div>

                    {/* See Details Button */}
                    <Link to={'/productdetail'}>
                    <button
                      onClick={() => handleSeeDetails(product.id)}
                      className="mt-4 w-full py-2 bg-orange-100 text-orange-700 cursor-pointer rounded-lg font-medium hover:bg-orange-200 transition-colors duration-200 border border-orange-200"
                    >
                      See Details
                    </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination (omitted for brevity) */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Pagination buttons logic (assuming you will implement this later) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;