import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * 1. CHECK AUTH STATUS ON PAGE LOAD
   * - Requires BOTH token and user
   * - Prevents showing LOG OUT when user is not logged in
   */
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  /**
   * 2. LOCAL LOGOUT (SAFE CLEANUP)
   */
  const handleLocalLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  /**
   * 3. LOGOUT HANDLER (API + LOCAL FALLBACK)
   */
  const handleLogout = async () => {
    setLoading(true);

    const token = localStorage.getItem("authToken");
    let userEmail = null;

    try {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const userObj = JSON.parse(userJson);
        userEmail = userObj.email;
      }
    } catch (err) {
      console.error("Failed to parse user data", err);
    }

    // If token is missing, just log out locally
    if (!token) {
      handleLocalLogout();
      return;
    }

    try {
      const response = await fetch(
        "https://laternaerp.smerp.io/api/v1/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      // Even if API fails, log out locally for UX & safety
      handleLocalLogout();

    } catch (error) {
      console.error("Logout network error:", error);
      handleLocalLogout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-1 flex flex-row items-center justify-between relative">

        {/* Social Icons */}
        <div className="flex space-x-4 text-sm text-orange-500 z-10">
          <a href="https://x.com/laternabooks" className="hover:text-orange-600">
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com/laterna.ventures"
            className="hover:text-orange-600"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com/company/laterna-ventures-ltd/"
            className="hover:text-orange-600"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/laternabooks/"
            className="hover:text-orange-600"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="relative z-10 flex space-x-4 text-white">
          {!isLoggedIn ? (
            <>
              <Link to="/register">
                <button className="py-1 px-3 bg-orange-500 rounded hover:bg-orange-600 transition">
                  REGISTER
                </button>
              </Link>

              <Link to="/login">
                <button className="py-1 px-3 bg-orange-500 rounded hover:bg-orange-600 transition">
                  LOG IN
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`py-1 px-3 rounded transition ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Logging out..." : "LOG OUT"}
            </button>
          )}
        </div>

        <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-orange-500 clip-path-slant z-0" />
      </div>
    </section>
  );
};

export default Topbar;
