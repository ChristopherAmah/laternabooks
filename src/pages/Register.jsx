import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import hero from '../assets/hero2.jpg';
import laterna from '../assets/laterna.png';

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (form.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        setLoading(false);
        return;
    }
    
    try {
      const res = await fetch(
        "http://41.78.157.87:32771/api/v1/portal/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form), 
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully! Redirecting...");
        setForm({ name: "", email: "", phone: "", password: "", street: "", city: "", state: "", country: "" }); 
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const apiError = data?.message || data?.error || "Registration failed.";
        setError(apiError);
      }
    } catch (err) {
      setError("Cannot connect to server. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-0">
      {/* Main Card Container */}
      <div className="flex w-full overflow-hidden bg-white border border-gray-100 min-h-[85vh]">
        
        {/* Left Panel (Hero Image) */}
        <div className="hidden lg:block w-1/2 relative ">
          <div className="absolute"></div>
          <img 
            src={hero} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          {/* Brand Overlay */}
          {/* <div className="absolute top-10 left-10">
             <img src={laterna} alt="Logo" className="h-10 brightness-0 invert" />
          </div> */}
        </div>

        {/* Right Panel (Registration Form) */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-orange-500 mb-2 uppercase tracking-tight">
              Create Account
            </h2>
            <p className="mb-8 text-gray-600">
              Already a member?{" "}
              <Link to="/login" className="font-medium text-orange-500 hover:text-orange-700 transition">
                Sign in here
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Feedback Messages */}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm border border-green-100 flex items-center gap-2">
                  <span>✅</span> {success}
                </div>
              )}

              {/* Basic Info Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
                />
              </div>

              <input
                type="password"
                name="password"
                placeholder="Password (min 8 chars)"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
              />

              {/* Address Section Divider */}
              <div className="pt-4 pb-2">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest border-b border-gray-100 pb-2">Address Details</p>
              </div>

              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={form.street}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
                />
              </div>

              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-0 focus:border-orange-500 outline-none transition"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-orange-700 transition shadow-lg disabled:bg-gray-300 mt-6 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Sign Up"}
              </button>

              <div className="text-center pt-4">
                <Link to='/products' className="inline-block opacity-50 hover:opacity-100 transition">
                  <img src={laterna} alt="Logo" className="h-6 mx-auto" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;