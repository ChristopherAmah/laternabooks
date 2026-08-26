import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Accessing environment variables
const CHECKOUT_API = import.meta.env.VITE_CHECKOUT_API_URL;
const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const COURIERPLUS_PROXY_BASE = import.meta.env.VITE_COURIERPLUS_PROXY_BASE || 'http://localhost:3001/api/courierplus';
const API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : '/api');
const ORDER_CONFIRM_API = import.meta.env.VITE_ORDER_CONFIRM_API_URL || `${API_BASE}/shop/order/confirm`;

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
    street2: "",
    city: "Lagos",
    zip: "100001",
    state_id: "Lagos",
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
    const [selectedShippingArea, setSelectedShippingArea] = useState('Lagos Island');
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('standard');
    const [courierPlusTariff, setCourierPlusTariff] = useState(null);
    const [courierPlusLoading, setCourierPlusLoading] = useState(false);
    const [courierPlusError, setCourierPlusError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const shippingAreas = [
        { id: 'Lagos Island', label: 'Lagos Island', amount: 3000 },
        { id: 'FCT', label: 'FCT', amount: 8000 },
        { id: 'Victoria Island', label: 'Victoria Island', amount: 2000 },
        { id: 'Ojo', label: 'Ojo', amount: 5500 },
        { id: 'Abule Egba', label: 'Abule Egba', amount: 5500 },
        { id: 'Ado-Ekiti', label: 'Ado-Ekiti', amount: 8500 },
        { id: 'Agege', label: 'Agege', amount: 5500 },
        { id: 'Ajah', label: 'Ajah', amount: 5500 },
        { id: 'Ajao Estate', label: 'Ajao Estate', amount: 4500 },
        { id: 'Akute', label: 'Akute', amount: 8000 },
        { id: 'Akure', label: 'Akure', amount: 8500 },
        { id: 'Badagry', label: 'Badagry', amount: 8000 },
        { id: 'Ikeja', label: 'Ikeja', amount: 3000 },
        { id: 'Mile 2', label: 'Mile 2', amount: 5000 },
        { id: 'Maryland', label: 'Maryland', amount: 3500 },
        { id: 'Surulere', label: 'Surulere', amount: 4500 },
        { id: 'Ogba', label: 'Ogba', amount: 5500 },
        { id: 'Ikorodu', label: 'Ikorodu', amount: 6000 },
        { id: 'Lekki Phase1', label: 'Lekki Phase 1', amount: 3000 },
        { id: 'Owerri', label: 'Owerri', amount: 5500 },
        { id: 'Port Harcourt', label: 'Port Harcourt', amount: 9000 },
        { id: 'Aba', label: 'Aba', amount: 9000 },
        { id: 'Other', label: 'Other / Rest', amount: 9000 },
    ];

    const selectedShippingOption = shippingAreas.find(area => area.id === selectedShippingArea) || shippingAreas[0];
    const isCourierPlus = selectedDeliveryMethod === 'courierplus';
    const isPickup = selectedDeliveryMethod === 'pickup';
    const courierPlusAmountWithVat = courierPlusTariff ? Number(courierPlusTariff.amountDue) + Number(courierPlusTariff.vat) : 0;
    const shippingAmount = isPickup ? 0 : isCourierPlus ? (courierPlusTariff ? courierPlusAmountWithVat : selectedShippingOption.amount) : selectedShippingOption.amount;
    const totalAmount = Number(cart.amount_untaxed || 0) + shippingAmount - Number(cart.amount_discount || 0);

    const formatCurrency = (amount) => `${symbol}${Number(amount).toFixed(2)}`;

    const carrierIdByMethod = {
        standard: 3,
        courierplus: 3,
        pickup: 3,
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingData(prev => ({ ...prev, [name]: value }));
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingData(prev => ({ ...prev, [name]: value }));
    };

    const handleShippingAreaChange = (e) => {
        setSelectedShippingArea(e.target.value);
    };

    const fetchCourierPlusTariff = async () => {
        setCourierPlusLoading(true);
        setCourierPlusError(null);
        try {
            const tariffPayload = {
                originStateCode: 'LA',
                destinationStateCode: 'LA',
                measureWeight: '5',
                dimensionWidth: '0',
                dimensionHeight: '0',
                dimensionLength: '0',
                productTypeCode: 'ECM',
                zoneType: 'domestic',
                originTownCode: 'Lagos',
                destinationTownCode: 'Lagos',
                acknowledgeCopy: 'no',
                insured: 'no',
                declaredValue: '1000',
            };

            const response = await fetch(`${COURIERPLUS_PROXY_BASE}/tariff/get-tariff`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tariffPayload),
            });

            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Unable to fetch CourierPlus tariff.');
            }

            const tariff = result.data?.tafiff;
            if (!tariff) {
                throw new Error('CourierPlus tariff response was invalid.');
            }

            setCourierPlusTariff(tariff);
        } catch (err) {
            setCourierPlusTariff(null);
            setCourierPlusError(err.message || 'Failed to fetch CourierPlus tariff.');
        } finally {
            setCourierPlusLoading(false);
        }
    };

    useEffect(() => {
        if (isCourierPlus) {
            fetchCourierPlusTariff();
        } else {
            setCourierPlusTariff(null);
            setCourierPlusError(null);
        }
    }, [isCourierPlus]);

    const getCountryCode = (countryId) => {
        const country = availableCountries.find(c => c.id.toString() === countryId.toString());
        return country ? country.code : '';
    };

    const normalizeAddress = (address, fallback = {}) => ({
        name: address.name || fallback.name || '',
        email: address.email || fallback.email || '',
        phone: address.phone || fallback.phone || '',
        street: address.street || fallback.street || '',
        street2: address.street2 || fallback.street2 || '',
        city: address.city || fallback.city || '',
        zip: address.zip || fallback.zip || '',
        state_id: address.state_id || fallback.state_id || '',
        country_id: Number(address.country_id || fallback.country_id || 0),
    });

    const buildOrderConfirmPayload = () => {
        const normalizedBilling = normalizeAddress(billingData);
        const normalizedShipping = shippingSameAsBilling
            ? { ...normalizedBilling }
            : normalizeAddress(shippingData, normalizedBilling);

        return {
            payment_method: 'bank',
            products: cart.lines.map(line => ({
                product_id: Number(line.product_id),
                qty: Number(line.qty || line.quantity || 0),
            })),
            billing: normalizedBilling,
            shipping: normalizedShipping,
            carrier_id: carrierIdByMethod[selectedDeliveryMethod] || 3,
        };
    };

    const submitConfirmedOrder = async () => {
        const response = await fetch(ORDER_CONFIRM_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildOrderConfirmPayload()),
        });

        const result = await response.json();

        if (!response.ok || result?.result?.status !== 'success') {
            throw new Error(
                result?.error?.message ||
                result?.message ||
                result?.result?.message ||
                'Order confirmation failed after payment.'
            );
        }

        return result;
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        const billingPayload = { ...billingData, country_code: getCountryCode(billingData.country_id) };
        const shippingPayload = {
            ...shippingSameAsBilling ? billingPayload : { ...shippingData, country_code: getCountryCode(shippingData.country_id) },
            shipping_area: selectedShippingOption.label,
        };

        const payload = {
            billing_address: billingPayload,
            shipping_address: shippingPayload,
            shipping_same_as_billing: shippingSameAsBilling,
            delivery_method: selectedDeliveryMethod,
            cart: {
                order_id: cart.order_id,
                lines: cart.lines.map(line => ({
                    product_id: line.product_id,
                    qty: line.qty,
                    price_unit: line.price_unit,
                    subtotal: line.subtotal
                })),
                amount_total: Number(cart.amount_untaxed || 0) + shippingAmount - Number(cart.amount_discount || 0),
                amount_shipping: shippingAmount,
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
                amount: totalAmount * 100, // Paystack expects kobo
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
                    (async () => {
                        try {
                            setLoading(true);
                            const confirmationResult = await submitConfirmedOrder();
                            const orderReference = confirmationResult?.result?.order_overview?.order_reference;

                            setSuccessMessage(
                                orderReference
                                    ? `Payment successful and order ${orderReference} was confirmed.`
                                    : 'Payment successful and your order was confirmed.'
                            );

                            navigate('/', {
                                state: {
                                    paymentReference: response.reference,
                                    orderConfirmation: confirmationResult?.result,
                                },
                            });
                        } catch (confirmationError) {
                            setError(
                                `Payment was successful, but we could not confirm the order automatically. ${confirmationError.message}`
                            );
                        } finally {
                            setLoading(false);
                        }
                    })();
                },
                onClose: function () {
                    alert('Payment window closed.');
                }
            });
            handler.openIframe();

        } catch {
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
                {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{successMessage}</div>}

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
                                <div className="md:col-span-2">
                                    <InputField label="Street Address 2" name="street2" value={billingData.street2} onChange={handleBillingChange} placeholder="Apartment, suite, unit, floor" />
                                </div>
                                <InputField label="City" name="city" value={billingData.city} onChange={handleBillingChange} />
                                <InputField label="ZIP / Postal Code" name="zip" value={billingData.zip} onChange={handleBillingChange} />
                                <InputField label="State" name="state_id" value={billingData.state_id} onChange={handleBillingChange} />
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="shipping_area" className="text-sm font-medium text-gray-700">Shipping Area</label>
                                    <select
                                        id="shipping_area"
                                        name="shipping_area"
                                        value={selectedShippingArea}
                                        onChange={handleShippingAreaChange}
                                        className="border border-gray-300 p-2.5 rounded-lg"
                                    >
                                        {shippingAreas.map(area => (
                                            <option key={area.id} value={area.id}>
                                                {area.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                <div className="flex flex-col space-y-1 pt-4">
                    <label className="text-sm font-medium text-gray-700">Delivery Method</label>
                    <select
                        id="delivery_method"
                        name="delivery_method"
                        value={selectedDeliveryMethod}
                        onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                        className="border border-gray-300 p-2.5 rounded-lg"
                    >
                        <option value="standard">Standard Shipping</option>
                        <option value="courierplus">CourierPlus (Tariff + VAT)</option>
                        <option value="pickup">Pickup (Free)</option>
                    </select>
                </div>
                {isCourierPlus && courierPlusError && (
                    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 mt-4 text-sm text-orange-800">
                        <p>{courierPlusError}</p>
                    </div>
                )}
                {isCourierPlus && courierPlusLoading && (
                    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 mt-4 text-sm text-orange-800">
                        <p>Fetching CourierPlus tariff...</p>
                    </div>
                )}
            </div>
        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={shippingSameAsBilling}
                                    onChange={(e) => setShippingSameAsBilling(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                Shipping address is the same as billing
                            </label>
                        </div>

                        {/* SHIPPING SECTION */}
                        {!shippingSameAsBilling && (
                            <div className="bg-orange-50/50 p-6 rounded-xl shadow-lg border border-orange-100 animate-in fade-in duration-300">
                                <h2 className="text-2xl font-bold text-orange-900 mb-6 border-b border-orange-200 pb-4">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Recipient Name" name="name" value={shippingData.name} onChange={handleShippingChange} />
                                    <InputField label="Recipient Email" name="email" type="email" value={shippingData.email} onChange={handleShippingChange} />
                                    <InputField label="Recipient Phone" name="phone" value={shippingData.phone} onChange={handleShippingChange} />
                                    <div className="md:col-span-2">
                                        <InputField label="Street Address" name="street" value={shippingData.street} onChange={handleShippingChange} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <InputField label="Street Address 2" name="street2" value={shippingData.street2} onChange={handleShippingChange} placeholder="Apartment, suite, unit, floor" />
                                    </div>
                                    <InputField label="City" name="city" value={shippingData.city} onChange={handleShippingChange} />
                                    <InputField label="ZIP" name="zip" value={shippingData.zip} onChange={handleShippingChange} />
                                    <InputField label="State" name="state_id" value={shippingData.state_id} onChange={handleShippingChange} />
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium text-orange-900">Country</label>
                                        <select name="country_id" value={shippingData.country_id} onChange={handleShippingChange} className="border border-orange-200 p-2.5 rounded-lg bg-white">
                                            {availableCountries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-md sticky top-4 border border-gray-100">
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
                                <div className="flex justify-between"><span>Shipping ({isPickup ? 'Pickup' : isCourierPlus ? 'CourierPlus' : selectedShippingOption.label})</span><span>{formatCurrency(shippingAmount)}</span></div>
                                {isCourierPlus && courierPlusTariff && (
                                    <>
                                        <div className="flex justify-between"><span>CourierPlus amount due</span><span>{formatCurrency(courierPlusTariff.amountDue)}</span></div>
                                        <div className="flex justify-between"><span>CourierPlus VAT</span><span>{formatCurrency(courierPlusTariff.vat)}</span></div>
                                    </>
                                )}
                                <div className="flex justify-between text-red-600"><span>Discount</span><span>-{formatCurrency(cart.amount_discount)}</span></div>
                            </div>
                            <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between items-center text-lg font-bold">
                                <span>Total</span><span className="text-orange-600">{formatCurrency(totalAmount)}</span></div>
                            <button
                                type="submit"
                                disabled={loading || (isCourierPlus && (!courierPlusTariff || courierPlusError))}
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
