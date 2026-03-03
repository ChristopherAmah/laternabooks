import { useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const PriceChecker = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef(null);

  // Auto-reset timer
  useEffect(() => {
    let timer;
    if (showResult || error) {
      timer = setTimeout(() => {
        setShowResult(false);
        setProduct(null);
        setBarcode("");
        setError("");
        inputRef.current?.focus();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showResult, error]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!barcode) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/price-checker/search`, {
        method: "POST", // STRICT POST METHOD
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params: { barcode: barcode.trim() },
        }),
      });

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();

      // SMERP returns data inside result
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
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-gray-400 font-bold tracking-widest text-xs mb-8 uppercase">
          Inventory Price Check
        </h1>

        {!showResult ? (
          <form onSubmit={handleSearch} className="space-y-4">
            <input
              ref={inputRef}
              type="text"
              autoFocus
              placeholder="Scan Barcode Here"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl py-4 px-4 text-center text-2xl font-bold focus:border-orange-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !barcode}
              className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all disabled:opacity-50"
            >
              {loading ? "SEARCHING..." : "CHECK PRICE"}
            </button>
            {error && <p className="text-red-500 font-medium animate-bounce">{error}</p>}
          </form>
        ) : (
          <div className="py-6 animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-5xl font-black text-green-600">
              ₦{product.price.toLocaleString()}
            </p>
            <p className="text-gray-400 text-xs mt-10 uppercase tracking-tighter">
              Ready for next scan in 5s
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChecker;