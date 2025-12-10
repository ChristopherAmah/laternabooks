import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import laterna from '../assets/laterna.png';

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ⭐ Use proxy instead of backend to bypass CORS
      const API_URL = "http://localhost:3001/api/login";

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (res.ok && data.result && data.result.status === "success") {
        // Retrieve JWT token
        const authToken =
          data.result.token || data.result.session_token;

        if (authToken) {
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("user", JSON.stringify(data.result));
        }

        navigate("/profile");
      } else {
        const errorMessage =
          data?.result?.message ||
          data?.result?.error ||
          data?.error ||
          "Login failed. Check your credentials.";

        setError(errorMessage);
      }
    } catch (err) {
      console.error("Network or Fetch Error:", err);
      setError("Cannot connect to the server. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-xl p-8 md:p-10 w-full max-w-sm border border-gray-200"
      >
        <div className="flex justify-center mb-5">
          <img src={laterna} alt="App Logo" className="h-12" />
        </div>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-orange-600 tracking-tight">
          Welcome Back
        </h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center mb-5 border border-red-200 font-medium">
            ⚠️ {error}
          </p>
        )}

        <div className="space-y-5">
          <div>
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 transition duration-150 ease-in-out focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              placeholder="e.g., john.doe@example.com"
              disabled={loading}
            />
          </div>

          <div>
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-800 transition duration-150 ease-in-out focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              placeholder="••••••••"
              disabled={loading}
            />
            <div className="text-right mt-1">
              <a
                href="#"
                className="text-sm text-orange-600 hover:text-orange-500 font-medium"
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 mt-8 rounded-lg font-semibold tracking-wide hover:bg-orange-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 font-medium text-orange-600 hover:text-orange-500"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
