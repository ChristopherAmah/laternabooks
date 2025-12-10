import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import laterna from "../assets/laterna.png";
// Optional: import an icon library for better visual feedback (e.g., react-icons/fa)

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    city: "",
    state: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // 💡 New loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Start loading

    // 1. Basic client-side validation (Optional, but good practice)
    if (form.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        setLoading(false);
        return;
    }
    
    // 2. API Call Execution
    try {
      const res = await fetch(
        "http://41.78.157.87:32771/api/v1/portal/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // The form data structure matches the API's expected JSON payload
          body: JSON.stringify(form), 
        }
      );

      const data = await res.json();

      if (res.ok) {
        // 3. Success Handling
        setSuccess("Account created successfully! Redirecting to login...");
        // Clear form after successful registration
        setForm({ name: "", email: "", phone: "", password: "", street: "", city: "", state: "", country: "" }); 
        setTimeout(() => navigate("/login"), 2000);
      } else {
        // 4. Error Handling
        // Log the full response data for debugging
        console.error("API Registration Error:", data); 
        
        // Use a more specific error message from the API if available
        const apiError = data?.message || data?.error || JSON.stringify(data);
        setError(`Registration failed: ${apiError}`);
      }
    } catch (err) {
      // 5. Network Error Handling
      console.error("Network or Fetch Error:", err);
      setError("Cannot connect to the server. Check your network or the API status.");
    } finally {
      setLoading(false); // Stop loading regardless of result
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-xl p-8 md:p-10 w-full max-w-lg border border-gray-200"
      >
        <img src={laterna} alt="Logo" className="h-10 text-center mb-5 px-6 justify-center items-center mx-auto" />
        <h2 className="text-3xl font-extrabold text-center mb-8 text-orange-600 tracking-tight">
          Register
        </h2>

        {/* --- Feedback Messages --- */}
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center mb-5 border border-red-200 font-medium">
            ⚠️ {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center mb-5 border border-green-200 font-medium">
            ✅ {success}
          </p>
        )}

        {/* --- Form Fields --- */}
        <div className="space-y-5">
            {/* Full Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                    placeholder="e.g., Gbolahan Folarin"
                    disabled={loading}
                />
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                    placeholder="e.g., folaringbolahan4@gmail.com"
                    disabled={loading}
                />
            </div>
            
            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                    type="tel" // Use type="tel" for phone numbers
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                    placeholder="e.g., 09037564449"
                    disabled={loading}
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8} // Add basic length constraint
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                    placeholder="••••••••"
                    disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters.</p>
            </div>
            
            {/* --- Address Fields Group --- */}
            <div className="pt-3 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-3">Address Details</h3>
                <div className="space-y-5">
                    {/* Street */}
                    <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={form.street}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                            placeholder="e.g., Mutiu Ojomu Close, Lakowe, Phase II"
                            disabled={loading}
                        />
                    </div>
                    
                    {/* City & State (Grouped) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                                placeholder="e.g., Lakowe"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                                placeholder="e.g., Lagos"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                            placeholder="e.g., Nigeria"
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </div>


        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 mt-8 rounded-lg font-semibold hover:bg-orange-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="ml-1 font-medium text-orange-600 hover:text-orange-500"
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;