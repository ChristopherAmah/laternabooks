import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import hero from '../assets/hero2.jpg';
import laterna from '../assets/laterna.png';

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
      const API_URL = "http://localhost:3001/api/login";
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, keepLoggedIn }),
      });

      const data = await res.json();

      if (res.ok && data.result && data.result.status === "success") {
        const authToken = data.result.token || data.result.session_token;
        if (authToken) {
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("user", JSON.stringify(data.result));
        }
        navigate("/products");
      } else {
        setError(data?.result?.message || data?.error || "Login failed.");
      }
    } catch (err) {
      setError("Cannot connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Main Card Container */}
      <div className="flex w-full overflow-hidden bg-white border border-gray-100  min-h-[70vh]">
        
        {/* Left Panel (Hero Image) */}
        <div className="hidden lg:block w-1/2 relative bg-blue-50">
          <div className="absolute z-10"></div>
          <img 
            src={hero} 
            alt="Pet Food Hero" 
            className="w-full h-full object-cover"
          />
          {/* Brand Overlay */}
          {/* <div className="absolute top-10 left-10 z-20">
             <img src={laterna} alt="Logo" className="h-10 brightness-0 invert" />
          </div> */}
        </div>

        {/* Right Panel (Login Form) */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-4xl font-bold text-orange-500 mb-2 uppercase tracking-tight">
              Login
            </h2>
            <p className="mb-10 text-gray-500 font-medium">
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
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 text-gray-800 transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none"
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
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 text-gray-800 transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none"
                />
              </div>
              
              {/* Actions Row */}
              <div className="flex items-center justify-between px-1">
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
                className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold tracking-widest uppercase hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 disabled:bg-gray-300 flex items-center justify-center gap-2"
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
                  <img src={laterna} alt="Laterna" className="h-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition" />
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