import React, { useState } from 'react';
import { useStore } from '../context/StoreContext'; 
import { FaShoppingCart, FaTrashAlt, FaPlus, FaMinus, FaTag } from 'react-icons/fa';
// 💡 IMPORTANT: Add useNavigate for state passing
import { Link, useNavigate } from 'react-router-dom';

// Placeholder image URL for cart items
const PLACEHOLDER_IMAGE = "https://placehold.co/80x80/F97316/FFFFFF?text=Item";

// Function to upgrade HTTP → HTTPS to avoid mixed content errors
const getSecureImageUrl = (url) => {
    if (!url) return PLACEHOLDER_IMAGE;
    if (typeof window !== 'undefined' && window.location.protocol === 'https:' && url.startsWith('http://')) {
        return url.replace('http://', 'https://');
    }
    return url;
};

const CartPage = () => {
    const { 
        cartItems, 
        cartCount, 
        removeFromCart,
        incrementQuantity, 
        decrementQuantity, 
    } = useStore(); 

    // Initialize useNavigate hook
    const navigate = useNavigate();

    // Calculate total price
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 2500; // Fixed shipping fee
    // Assuming 5% tax for simplicity on the cart total
    const estimatedTaxRate = 0.05; 
    const estimatedTax = cartTotal * estimatedTaxRate; 

    // Coupon code logic (as before)
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');

    const applyCoupon = () => {
        const code = couponCode.trim().toUpperCase();
        let discountAmount = 0;

        if (code === 'DISCOUNT10') {
            discountAmount = cartTotal * 0.1; 
            setCouponMessage('✅ 10% discount applied!');
        } else if (code === 'FREESHIP') {
            discountAmount = shipping; // Removes shipping fee
            setCouponMessage('✅ Free shipping applied!');
        } else if (code === 'SAVE500') {
            discountAmount = 500; 
            setCouponMessage('✅ ₦500 discount applied!');
        } else if (code === '') {
            setCouponMessage('Please enter a coupon code.');
        } else {
            setCouponMessage('❌ Invalid coupon code.');
        }

        setDiscount(discountAmount);
    };

    const totalAfterDiscount = Math.max(cartTotal + shipping + estimatedTax - discount, 0);


    // 1. --- FUNCTION TO HANDLE CHECKOUT NAVIGATION AND DATA PACKAGING ---
    const handleProceedToCheckout = () => {
        // Prepare the 'lines' structure for the CheckoutPage
        const cartLines = cartItems.map(item => ({
            id: item.id,
            
            // Keys used for DISPLAY in CheckoutPage
            product_name: item.name,    
            quantity: item.quantity,    
            
            // Keys required by the CheckoutPage's API payload (to match the backend format)
            product_id: item.id,       
            qty: item.quantity,         // <-- Added/Confirmed for API payload
            price_unit: item.price,     // <-- Added/Confirmed for API payload
            
            subtotal: item.price * item.quantity,
        }));
        
        // 2. Prepare the final data object (matches the CheckoutPage prop structure)
        const finalCartData = {
            cart: {
                // You might need a way to generate a real order ID here
                order_id: Math.floor(Math.random() * 1000000), // Placeholder ID
                name: `ORDER-${new Date().getTime()}`,
                amount_total: totalAfterDiscount,
                amount_tax: estimatedTax,
                amount_untaxed: cartTotal, // Total before tax/shipping/discount
                amount_shipping: shipping, // Total shipping before potential discount
                amount_discount: discount,
                currency: {
                    name: "NGN",
                    symbol: "₦"
                },
                lines: cartLines,
            },
            // Note: You may need a separate mechanism to fetch available countries, 
            // or include them in the global context/route data.
            available_countries: [
                { id: 163, name: "Nigeria", code: "NG" },
                { id: 233, name: "United States", code: "US" },
                { id: 75, name: "France", code: "FR" },
                { id: 13, name: "Australia", code: "AU" },
            ],
        };
        
        // 3. Navigate and pass the state
        navigate('/checkout', { state: { cartData: finalCartData } });
    };
    // ------------------------------------------------------------------


    const CartItemRow = ({ item }) => (
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-100 hover:bg-orange-50/50 transition duration-150 rounded-lg p-2">
            {/* ... Item details (omitted for brevity) ... */}
            <div className="flex items-center flex-grow mb-3 sm:mb-0 sm:w-2/5">
                <img
                    src={getSecureImageUrl(item.image_url)}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl shadow-md mr-4"
                    onError={(e) => { 
                        e.target.src = PLACEHOLDER_IMAGE;
                        e.target.onerror = null; 
                    }}
                />
                <div className="min-w-0">
                    <Link to={`/product/${item.id}`} className="text-base font-semibold text-gray-800 hover:text-orange-600 transition line-clamp-2">
                        {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">Item ID: {item.id}</p>
                </div>
            </div>

            {/* Price */}
            <div className="hidden sm:block sm:w-1/5 text-center text-gray-700 font-medium">
                ₦{item.price?.toLocaleString()}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-start sm:justify-center sm:w-1/5 space-x-2 w-full mb-3 sm:mb-0">
                <button
                    onClick={() => decrementQuantity(item.id)}
                    className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 disabled:opacity-50 transition"
                    disabled={item.quantity <= 1}
                    title="Decrease quantity"
                >
                    <FaMinus size={12} />
                </button>
                <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                <button
                    onClick={() => incrementQuantity(item.id)}
                    className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                    title="Increase quantity"
                >
                    <FaPlus size={12} />
                </button>
            </div>

            {/* Subtotal + Remove */}
            <div className="flex items-center justify-between sm:justify-center sm:w-1/5 text-right font-bold w-full">
                <span className="sm:hidden text-gray-500 font-medium">Subtotal:</span>
                <span className="text-lg text-orange-600">₦{(item.price * item.quantity)?.toLocaleString()}</span>
                
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                    title="Remove item"
                >
                    <FaTrashAlt size={16} />
                </button>
            </div>
        </div>
    );

    if (cartCount === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center bg-gray-50 rounded-xl m-10">
                <FaShoppingCart className="text-orange-400 size-20 mx-auto mb-6" />
                <h1 className="text-xl lg:text-3xl font-bold text-gray-800 mb-2">Your Shopping Cart is Empty</h1>
                <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* ... Cart Header (omitted for brevity) ... */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
                <FaShoppingCart className="mr-3 text-orange-600" />
                Your Shopping Cart 
                <span className="ml-4 text-base px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-extrabold">
                    {cartCount} Items
                </span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="hidden sm:flex justify-between py-3 border-b-2 border-orange-500 font-bold text-sm text-gray-600 uppercase">
                        <span className="sm:w-2/5">Product</span>
                        <span className="sm:w-1/5 text-center">Price</span>
                        <span className="sm:w-1/5 text-center">Quantity</span>
                        <span className="sm:w-1/5 text-center">Subtotal</span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {cartItems.map((item) => (
                            <CartItemRow key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="sticky top-20 bg-gray-50 p-6 rounded-2xl shadow-xl border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Order Summary</h2>
                        
                        {/* Coupon Code Input (omitted for brevity) */}
                        <div className="mb-4">
                            <label className="flex items-center font-semibold text-gray-700 mb-2">
                                <FaTag className="text-orange-500 mr-2" /> Coupon Code
                            </label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter coupon code"
                                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                                />
                                <button
                                    onClick={applyCoupon}
                                    className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition"
                                >
                                    Apply
                                </button>
                            </div>
                            {couponMessage && (
                                <p className={`mt-2 text-sm ${couponMessage.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}>
                                    {couponMessage}
                                </p>
                            )}
                        </div>

                        {/* Summary Details */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cartCount} items)</span>
                                <span>₦{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>₦{shipping.toLocaleString()}</span>
                            </div>
                            {estimatedTax > 0 && (
                                <div className="flex justify-between text-gray-600">
                                    <span>Estimated Tax ({estimatedTaxRate * 100}%)</span>
                                    <span>₦{estimatedTax.toLocaleString()}</span>
                                </div>
                            )}
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600 font-semibold border-b pb-2">
                                    <span>Discount</span>
                                    <span>-₦{discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-2">
                                <span>Total:</span>
                                <span className="text-orange-600">₦{totalAfterDiscount.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* 4. Update button to call the navigation function */}
                        <button 
                            className="w-full mt-6 py-4 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all shadow-md shadow-orange-300"
                            onClick={handleProceedToCheckout}
                        >
                            Proceed to Checkout
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4">
                            Taxes and final shipping calculated at checkout.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;