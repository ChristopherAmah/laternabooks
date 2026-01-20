import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Accessing environment variables
const CHECKOUT_API = import.meta.env.VITE_CHECKOUT_API_URL;
const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const defaultCartStructure = {
    cart: {
        order_id: null,
        name: "N/A",
        amount_total: 15.00,
        amount_tax: 1.00,
        amount_untaxed: 14.00,
        amount_shipping: 1.00,
        amount_discount: 1.00,
        currency: { name: "NGN", symbol: "₦" },
        lines: [
            { id: 101, product_id: 1, product_name: "Premium Wireless Headset", quantity: 1, qty: 1, price_unit: 10.00, subtotal: 10.00 },
            { id: 102, product_id: 2, product_name: "USB-C Fast Charger", quantity: 2, qty: 2, price_unit: 2.00, subtotal: 4.00 }
        ],
    },
    available_countries: [
        { id: 163, name: "Nigeria", code: "NG" },
        { id: 233, name: "United States", code: "US" },
        { id: 75, name: "France", code: "FR" },
    ],
};

const initialAddressState = {
    name: "Christopher Amah",
    email: "christopheramah0@gmail.com",
    phone: "08105938812",
    street: "123 Main St",
    city: "Lagos",
    zip: "100001",
    country_id: 163,
};

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, readOnly = false }) => (
    <div className="flex flex-col space-y-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border border-gray-300 p-2.5 rounded-lg focus:ring-orange-500 focus:border-orange-500 ${readOnly ? 'bg-gray-100' : ''}`}
            required
            readOnly={readOnly}
        />
    </div>
);

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passedCartData = location.state?.cartData;
    const cartData = passedCartData || defaultCartStructure;
    const cart = cartData.cart || defaultCartStructure.cart;
    const availableCountries = cartData.available_countries || defaultCartStructure.available_countries;
    const symbol = cart.currency.symbol;

    // --- STATE MANAGEMENT ---
    const [billingData, setBillingData] = useState(initialAddressState);
    const [shippingData, setShippingData] = useState(initialAddressState);
    const [shippingSameAsBilling, setShippingSameAsBilling] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatCurrency = (amount) => `${symbol}${Number(amount).toFixed(2)}`;

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingData(prev => ({ ...prev, [name]: value }));
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingData(prev => ({ ...prev, [name]: value }));
    };

    const getCountryCode = (countryId) => {
        const country = availableCountries.find(c => c.id.toString() === countryId.toString());
        return country ? country.code : '';
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const billingPayload = { ...billingData, country_code: getCountryCode(billingData.country_id) };
        const shippingPayload = shippingSameAsBilling 
            ? billingPayload 
            : { ...shippingData, country_code: getCountryCode(shippingData.country_id) };

        const payload = {
            billing_address: billingPayload,
            shipping_address: shippingPayload,
            shipping_same_as_billing: shippingSameAsBilling,
            cart: {
                order_id: cart.order_id,
                lines: cart.lines.map(line => ({
                    product_id: line.product_id,
                    qty: line.qty,
                    price_unit: line.price_unit,
                    subtotal: line.subtotal 
                })),
                amount_total: cart.amount_total,
                amount_shipping: cart.amount_shipping,
                amount_discount: cart.amount_discount,
            },
        };

        try {
            const response = await fetch(CHECKOUT_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                setError(result.message || "Checkout failed.");
                setLoading(false);
                return;
            }

            // Launch Paystack payment using Environment Variable
            const handler = window.PaystackPop.setup({
                key: PAYSTACK_KEY, 
                email: billingData.email,
                amount: cart.amount_total * 100, // Paystack expects kobo
                currency: cart.currency.name,
                ref: `order_${cart.order_id || Math.floor(Math.random() * 1000000)}`,
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Full Name",
                            variable_name: "full_name",
                            value: billingData.name
                        }
                    ]
                },
                callback: function (response) {
                    alert(`Payment successful! Reference: ${response.reference}`);
                    navigate('/'); 
                },
                onClose: function () {
                    alert('Payment window closed.');
                }
            });
            handler.openIframe();

        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <form onSubmit={handleCheckout} className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Proceed to Checkout</h1>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* BILLING SECTION */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Billing Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Full Name" name="name" value={billingData.name} onChange={handleBillingChange} />
                                <InputField label="Email Address" name="email" type="email" value={billingData.email} onChange={handleBillingChange} />
                                <InputField label="Phone Number" name="phone" value={billingData.phone} onChange={handleBillingChange} />
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-700">Country</label>
                                    <select name="country_id" value={billingData.country_id} onChange={handleBillingChange} className="border border-gray-300 p-2.5 rounded-lg">
                                        {availableCountries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <InputField label="Street Address" name="street" value={billingData.street} onChange={handleBillingChange} />
                                </div>
                                <InputField label="City" name="city" value={billingData.city} onChange={handleBillingChange} />
                                <InputField label="ZIP / Postal Code" name="zip" value={billingData.zip} onChange={handleBillingChange} />
                            </div>
                        </div>

                        {/* TOGGLE CHECKBOX */}
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center">
                            <input
                                id="shipping_toggle"
                                type="checkbox"
                                checked={shippingSameAsBilling}
                                onChange={(e) => setShippingSameAsBilling(e.target.checked)}
                                className="h-5 w-5 text-orange-600 rounded"
                            />
                            <label htmlFor="shipping_toggle" className="ml-3 font-medium text-gray-700">
                                Shipping address is the same as billing
                            </label>
                        </div>

                        {/* SHIPPING SECTION */}
                        {!shippingSameAsBilling && (
                            <div className="bg-orange-50/50 p-6 rounded-xl shadow-lg border border-orange-100 animate-in fade-in duration-300">
                                <h2 className="text-2xl font-bold text-orange-900 mb-6 border-b border-orange-200 pb-4">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Recipient Name" name="name" value={shippingData.name} onChange={handleShippingChange} />
                                    <InputField label="Recipient Phone" name="phone" value={shippingData.phone} onChange={handleShippingChange} />
                                    <div className="md:col-span-2">
                                        <InputField label="Street Address" name="street" value={shippingData.street} onChange={handleShippingChange} />
                                    </div>
                                    <InputField label="City" name="city" value={shippingData.city} onChange={handleShippingChange} />
                                    <InputField label="ZIP" name="zip" value={shippingData.zip} onChange={handleShippingChange} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                {cart.lines.map((line, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        <div className="flex-1 pr-4">
                                            <p className="font-semibold text-gray-800">{line.product_name || line.name}</p>
                                            <p className="text-gray-500 text-xs">Qty: {line.quantity || line.qty}</p>
                                        </div>
                                        <span className="font-medium text-gray-900">
                                            {formatCurrency(line.subtotal || (line.price_unit * line.qty))}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(cart.amount_untaxed)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(cart.amount_shipping)}</span></div>
                                <div className="flex justify-between text-red-600"><span>Discount</span><span>-{formatCurrency(cart.amount_discount)}</span></div>
                            </div>
                            <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between items-center text-lg font-bold">
                                <span>Total</span><span className="text-orange-600">{formatCurrency(cart.amount_total)}</span>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 py-3 rounded-lg text-white bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 font-medium"
                            >
                                {loading ? 'Processing...' : `Place Order`}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;