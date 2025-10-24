import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import laterna from '../assets/laterna.png'
import { Link } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://41.78.157.87:32771/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user info or token
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/products"); // Redirect to homepage
        window.location.reload(); // Refresh UI so Topbar updates
      } else {
        setError(data?.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        // Enhanced styling maintained
        className="bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-xl p-8 md:p-10 w-full max-w-sm border border-gray-200"
      >
        <img src={laterna} alt="" className="text-center mb-5 px-6 ml-5"/>
        <h2 
          // Color changed from indigo to orange
          className="text-3xl font-extrabold text-center mb-8 text-orange-600 tracking-tight"
        >
          Welcome Back
        </h2>

        {error && (
          // Error message style remains the same
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center mb-5 border border-red-200">
            {error}
          </p>
        )}

        <div className="mb-5">
          <label 
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="login-input"
          >
            Email or Username
          </label>
          <input
            id="login-input"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            // Focus ring color changed from indigo to orange
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 transition duration-150 ease-in-out focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
            placeholder="e.g., john.doe@example.com"
          />
        </div>

        <div className="mb-6">
          <label 
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="password-input"
          >
            Password
          </label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            // Focus ring color changed from indigo to orange
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 transition duration-150 ease-in-out focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          <div className="text-right mt-1">
            <a href="#" className="text-sm text-orange-600 hover:text-orange-500 font-medium">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          // Button color changed from indigo to orange
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-orange-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Sign In
        </button>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? 
          <Link to="/register">
            <a href="#" className="ml-1 font-medium text-orange-600 hover:text-orange-500">
            Register
          </a>
          </Link>
          
        </p>
      </form>
    </div>
  );
};

export default Login;