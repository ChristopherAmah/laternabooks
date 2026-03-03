import { useState, useEffect } from "react";

const PROXY_URL = "http://localhost:3001/api/price-checker"; 
// 🔁 Change this to your deployed proxy URL in production

const PriceChecker = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);

  /* ---------------- AUTO RESET AFTER 5s ---------------- */
  useEffect(() => {
    let timer;

    if (showResult) {
      timer = setTimeout(() => {
        setShowResult(false);
        setProduct(null);
        setBarcode("");
        setError("");
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [showResult]);

  /* ---------------- FETCH PRODUCT (VIA PROXY) ---------------- */
  const fetchProduct = async () => {
    if (!barcode) return;

    setLoading(true);
    setError("");
    setProduct(null);

    try {
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params: { barcode },
        }),
      });

      if (!response.ok) {
        throw new Error("Proxy request failed");
      }

      const data = await response.json();

      if (data?.result?.success) {
        setProduct({
          name: data.result.name,
          price: data.result.price,
        });
        setShowResult(true);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error("Price check error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-10 text-center">
        <h1 className="text-[16px] font-semibold mb-6">PRICE CHECKER</h1>

        {/* INPUT STATE */}
        {!showResult && (
          <>
            <input
              type="text"
              placeholder="Enter barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              onClick={fetchProduct}
              disabled={loading}
              className="w-full bg-orange-600 text-white py-2 rounded-full disabled:opacity-60"
            >
              {loading ? "Checking..." : "Check Price"}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        )}

        {/* RESULT STATE */}
        {showResult && product && (
          <div className="py-10">
            <h2 className="text-lg font-medium">{product.name}</h2>
            <p className="text-3xl font-bold text-green-600 mt-4">
              ₦{product.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Resetting in 5 seconds…
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChecker;