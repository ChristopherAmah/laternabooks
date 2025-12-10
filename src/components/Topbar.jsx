import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaPinterestP,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Check Login Status on Mount
  useEffect(() => {
    // 💡 FIX: Check for the presence of the AUTH TOKEN, as it is the primary indicator of a logged-in state needed for authorized API calls.
    const token = localStorage.getItem("authToken"); 
    if (token) setIsLoggedIn(true);
  }, []);

  // 2. Handle Logout Logic
  const handleLogout = async () => {
    setLoading(true);

    // 💡 FIX: Use the correct keys stored in localStorage by the Login component.
    const token = localStorage.getItem("authToken");
    
    // We attempt to retrieve the user object to get the email/login if needed by the API
    let userEmail = null;
    try {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            const userObj = JSON.parse(userJson);
            // Assuming the login field is 'email' in the stored user object
            userEmail = userObj.email; 
        }
    } catch (e) {
        console.error("Error parsing user data:", e);
    }
    
    if (!token) {
        // If no token, we can just clear local storage and log out locally.
        console.warn("No authentication token found. Performing local logout.");
        handleLocalLogout();
        return;
    }
    
    // 💡 API CALL: Logout
    try {
      const response = await fetch(
        "http://41.78.157.87:32771/api/v1/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 💡 Use authToken from local storage
            Authorization: `Bearer ${token}`, 
          },
          // 💡 Conditional body: Only send the email if your API requires it for logout
          body: JSON.stringify({ email: userEmail }), 
        }
      );

      if (response.ok) {
        // Successful API logout (server revokes token)
        handleLocalLogout();
      } else {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        console.error("Logout failed:", errorData);
        // Even if API fails (e.g., token already expired), for UX, we perform local cleanup.
        if (response.status === 401) {
            alert("Session expired. Logging out locally.");
            handleLocalLogout();
        } else {
            alert(`Logout failed on server: ${errorData.message || response.statusText}. Logging out locally.`);
            handleLocalLogout();
        }
      }
    } catch (error) {
      console.error("Network error during logout:", error);
      alert("Network error. Logging out locally for safety.");
      handleLocalLogout(); // Force local logout on network error
    } finally {
      setLoading(false);
    }
  };

  // 3. Centralized Local Cleanup Function
  const handleLocalLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken"); // 💡 Use the correct key: 'authToken'
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home
  }


  return (
    <section className="bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex flex-col md:flex-row items-center justify-between relative">
        {/* Social Icons (No Change) */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm text-orange-500 mb-2 md:mb-0 z-10">
          <a href="#" className="hover:text-orange-600"><FaTwitter /></a>
          <a href="#" className="hover:text-orange-600"><FaFacebookF /></a>
          <a href="#" className="hover:text-orange-600"><FaGooglePlusG /></a>
          <a href="#" className="hover:text-orange-600"><FaPinterestP /></a>
          <a href="#" className="hover:text-orange-600"><FaLinkedinIn /></a>
          <a href="#" className="hover:text-orange-600"><FaInstagram /></a>
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