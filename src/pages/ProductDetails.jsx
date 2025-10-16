import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
// NOTE: Assuming useStore provides a function like addToCart
import { useStore } from '../context/StoreContext'; 

// --- Constants ---
const PLACEHOLDER_IMAGE = "https://placehold.co/600x800/F97316/FFFFFF?text=Product+Image";
const FAKE_PRODUCT_DATA = {
    id: 12345,
    name: 'Luxury Scented Diffuser Set',
    price: 390000,
    description: 'Experience tranquility with our premium, long-lasting diffuser set. Features hand-poured essential oils and natural reed sticks. Perfect for enhancing any living space or gifting.',
    rating: 4.5,
    reviews: 78,
    image_url: PLACEHOLDER_IMAGE, // Replace with your actual image URL logic
    variants: [
        { type: 'Color', options: [
            { label: 'Cashmere', value: 'cashmere', hex: '#E6C3A7' },
            { label: 'Ocean Fresh', value: 'ocean_fresh', hex: '#A7C3E6' },
            { label: 'Citrus Zing', value: 'citrus_zing', hex: '#E6E6A7' }
        ]},
        { type: 'Size', options: [
            { label: '50ML', value: '50ml' },
            { label: '70ML', value: '70ml' },
            { label: '100ML', value: '100ml' }
        ]}
    ]
};

const ProductDetail = () => {
    const { productId } = useParams();
    const { addToCart } = useStore(); 
    const [product, setProduct] = useState(null);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // --- Data Fetching Effect ---
    useEffect(() => {
        // In a real app, this would fetch product data using productId
        // Example API call:
        // fetch(`http://41.78.157.87:32771/api/v1/products/${productId}`)
        
        // Simulating data fetch delay
        setTimeout(() => {
            setProduct(FAKE_PRODUCT_DATA);
            // Initialize selected variants to the first option of each type
            const initialVariants = FAKE_PRODUCT_DATA.variants.reduce((acc, variant) => {
                acc[variant.type] = variant.options[0]?.value;
                return acc;
            }, {});
            setSelectedVariants(initialVariants);
            setIsLoading(false);
        }, 500);
    }, [productId]);

    const handleVariantChange = (type, value) => {
        setSelectedVariants(prev => ({ ...prev, [type]: value }));
    };

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
            quantity: quantity,
            variants: selectedVariants // Attach selected options
        };

        // Call the store function
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

    // --- Rendering the Product Detail Layout ---
    return (
        <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="bg-white rounded-xl shadow-2xl p-6 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Left Column: Product Image (70% height on mobile, 100% on desktop) */}
                    <div className="flex justify-center items-center">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-xl border border-gray-100"
                            onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                        />
                    </div>
                    
                    {/* Right Column: Details, Options, and Actions */}
                    <div className="flex flex-col space-y-6">
                        {/* Title and Rating */}
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                {/* Rating Stars */}
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

                        {/* Price Block */}
                        <div className="border-b pb-4">
                            <span className="text-4xl font-extrabold text-orange-600">
                                ₦{product.price ? product.price.toLocaleString() : 'N/A'}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes.</p>
                        </div>

                        {/* Variants/Options */}
                        <div className="space-y-6">
                            {product.variants.map((variant) => (
                                <div key={variant.type} className="flex flex-col space-y-3">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {variant.type}: <span className="font-normal text-gray-600">{selectedVariants[variant.type]}</span>
                                    </h3>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {variant.options.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleVariantChange(variant.type, option.value)}
                                                className={`
                                                    py-2 px-4 rounded-full border-2 text-sm font-medium transition duration-150
                                                    ${selectedVariants[variant.type] === option.value 
                                                        ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-md'
                                                        : 'border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-gray-50'
                                                    }
                                                    ${variant.type === 'Color' ? 'w-10 h-10 p-0 flex items-center justify-center' : ''}
                                                `}
                                                title={option.label}
                                            >
                                                {variant.type === 'Color' ? (
                                                    <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: option.hex }}></div>
                                                ) : (
                                                    option.label
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quantity and Action Buttons */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            
                            {/* Quantity Control */}
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

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="flex items-center justify-center gap-3 bg-orange-600 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-orange-700 transition duration-300 w-full sm:flex-grow"
                            >
                                <FaShoppingCart /> Add to Cart
                            </button>

                            {/* Wishlist Button */}
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
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
