import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

const Topbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. CHECK AUTH STATUS
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    setIsLoggedIn(!!(token && user));
  }, []);

  // 2. LOCAL LOGOUT (CLEANUP)
  const handleLocalLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("session_token"); // Clean up session token too
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login after logout
  };

  // 3. LOGOUT HANDLER (VIA PROXY)
  const handleLogout = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    const email = user ? JSON.parse(user).email : null;

    // If no token, just clear local state
    if (!token) {
      handleLocalLogout();
      setLoading(false);
      return;
    }

    try {
      // Point to your LOCAL PROXY, not the external ERP directly
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pass the JWT token
        },
        body: JSON.stringify({ email }),
      });

      // We clear local data regardless of whether the server call was 200 OK
      // This ensures the user isn't "stuck" logged in if the server is down
      handleLocalLogout();
    } catch (error) {
      console.error("Logout error:", error);
      handleLocalLogout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hidden bg-white md:block">
      <div className="relative mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 py-2 sm:px-6 lg:px-8">
        
        {/* Social Icons */}
        <div className="z-10 flex gap-3 text-xs text-orange-500 sm:gap-4 sm:text-sm">
          <a href="https://x.com/laternabooks" target="_blank" rel="noreferrer" className="hover:text-orange-600"><FaTwitter /></a>
          <a href="https://www.facebook.com/laterna.ventures" target="_blank" rel="noreferrer" className="hover:text-orange-600"><FaFacebookF /></a>
          <a href="https://www.linkedin.com/company/laterna-ventures-ltd/" target="_blank" rel="noreferrer" className="hover:text-orange-600"><FaLinkedinIn /></a>
          <a href="https://www.instagram.com/laternabooks/" target="_blank" rel="noreferrer" className="hover:text-orange-600"><FaInstagram /></a>
        </div>

        {/* Auth Buttons */}
        <div className="relative z-10 flex gap-2 text-white sm:gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/register">
                <button className="py-1 px-3 bg-orange-500 rounded hover:bg-orange-600 transition text-xs font-bold">
                  REGISTER
                </button>
              </Link>
              <Link to="/login">
                <button className="py-1 px-3 bg-orange-500 rounded hover:bg-orange-600 transition text-xs font-bold">
                  LOG IN
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`py-1 px-3 rounded transition text-xs font-bold ${
                loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "LOGGING OUT..." : "LOG OUT"}
            </button>
          )}
        </div>

        {/* Slant Decor */}
        <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-orange-500 clip-path-slant z-0" />
      </div>
    </section>
  );
};

export default Topbar;
