import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import hero from '../assets/hero2.jpg';
import laterna from '../assets/laterna.png';
import { API_BASE } from "../utils/api";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Pointing to your Local Proxy
      const API_URL = `${API_BASE}/login`;
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, keepLoggedIn }),
      });

      const data = await res.json();

      // Based on your response: { "status": "success", "access_token": "..." }
      if (res.ok && data.status === "success") {
        
        // 1. Capture the access_token
        const authToken = data.access_token; 
        
        if (authToken) {
          // 2. Store specific auth details in LocalStorage
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("user_name", data.name);
          
          // 3. Store the full object for profile access
          localStorage.setItem("user", JSON.stringify(data));
          
          // 4. Redirect to shop
          navigate("/products");
        } else {
          setError("Session could not be established. Please try again.");
        }
      } else {
        // Handle API-side errors (wrong password, user not found, etc.)
        setError(data?.message || data?.error || "Invalid login credentials.");
      }
    } catch (err) {
      console.error("Login Connection Error:", err);
      setError("Cannot connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-3 py-6 sm:px-6">
      {/* Main Card Container */}
      <div className="flex min-h-full w-full max-w-7xl overflow-hidden bg-white sm:min-h-[70vh]">
        
        {/* Left Panel (Hero Image) */}
        <div className="hidden lg:block w-1/2 relative">
          <img 
            src={hero} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-orange-500/10 mix-blend-multiply"></div>
        </div>

        {/* Right Panel (Login Form) */}
        <div className="flex w-full flex-col justify-center p-5 sm:p-8 md:p-12 lg:w-1/2 lg:p-16">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="mb-2 text-3xl font-bold uppercase tracking-tight text-orange-500 sm:text-4xl">
              Login
            </h2>
            <p className="mb-7 text-gray-500 font-medium sm:mb-10">
              Not a member yet?{" "}
              <Link to="/register" className="text-orange-600 hover:text-orange-700 underline underline-offset-4 transition">
                Register now
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-2 animate-pulse">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Email/Username Input */}
              <div className="relative group">
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                  placeholder="Email or Username"
                  disabled={loading}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 sm:px-5 sm:py-4"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  disabled={loading}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 sm:px-5 sm:py-4"
                />
              </div>
              
              {/* Actions Row */}
              <div className="flex flex-col gap-3 px-1 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="h-4 w-4 text-orange-600 border-gray-300 rounded-md focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition">Keep me logged in</span>
                </label>
                <a href="#" className="text-sm font-semibold text-gray-400 hover:text-orange-600 transition">
                  Forgot Password?
                </a>
              </div>
              
              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 py-3 font-bold uppercase tracking-widest text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 active:scale-95 disabled:bg-gray-400 sm:py-4"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Login"
                )}
              </button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-tighter"><span className="px-4 bg-white text-gray-400 font-bold">Or start shopping</span></div>
              </div>

              {/* Brand Link */}
              <div className="flex justify-center transition-transform hover:scale-105">
                <Link to='/products'>
                  <img src={laterna} alt="Laterna Logo" className="h-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
