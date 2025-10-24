import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useStore } from '../context/StoreContext';

// --- Constants ---
const PLACEHOLDER_IMAGE = "https://placehold.co/600x800/F97316/FFFFFF?text=Product+Image";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useStore(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fetch Product from API ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`http://41.78.157.87:32771/api/product_details/${productId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {}
          }),
        });

        const data = await response.json();

        if (data.result) {
          // Format product data to fit UI
          const p = data.result;
          setProduct({
            id: p.id,
            name: p.name,
            price: p.base_price || 0,
            description: p.description || "No description available.",
            image_url: p.image_url || PLACEHOLDER_IMAGE,
            in_stock: p.in_stock,
            attributes: p.attributes || [],
            website_url: p.website_url,
            rating: 4.5, // Mocked, since API doesn't return this
            reviews: 25, // Mocked
          });
        } else {
          setProduct(null);
        }

      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (type) => {
    setQuantity(prev => {
      if (type === 'increment') return prev + 1;
      if (type === 'decrement' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity,
    };

    addToCart(itemToAdd);
    console.log("Added to cart:", itemToAdd);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Product Not Found</h2>
        <p className="text-gray-600 mt-2">The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.image_url || PLACEHOLDER_IMAGE}
              alt={product.name}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-xl border border-gray-100"
              onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? '' : 'text-gray-300'} size={14} />
                  ))}
                </div>
                <span>{product.rating} / 5</span>
                <span className="text-gray-400">|</span>
                <span className="text-orange-600 font-medium cursor-pointer hover:underline">
                  {product.reviews} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-b pb-4">
              <span className="text-4xl font-extrabold text-orange-600">
                ₦{product.price ? product.price.toLocaleString() : 'N/A'}
              </span>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes.</p>
            </div>

            {/* Stock Status */}
            <div>
              {product.in_stock ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-full w-full sm:w-auto overflow-hidden shadow-sm">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition rounded-l-full"
                >
                  –
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center text-lg font-semibold border-none focus:ring-0"
                />
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition rounded-r-full"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-3 bg-orange-600 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-orange-700 transition duration-300 w-full sm:flex-grow disabled:bg-gray-400"
                disabled={!product.in_stock}
              >
                <FaShoppingCart /> Add to Cart
              </button>

              <button
                title="Add to Wishlist"
                className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-300 shadow-md sm:w-16 sm:h-16 flex items-center justify-center"
              >
                <FaHeart size={20} />
              </button>
            </div>

            {/* Description */}
            <div className="pt-4 mt-6 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
