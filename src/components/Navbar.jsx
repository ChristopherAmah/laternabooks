import React, { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';

import LaternaLogo from '../assets/laterna.png';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const { cartCount, wishlistCount } = useStore();
  const location = useLocation(); // Hook to listen to URL changes
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navLinks = [
    { to: '/home', label: 'HOME' },
    { to: '/category', label: 'CATEGORIES' },
    { to: '/products', label: 'SHOP' },
    { to: '/aboutus', label: 'ABOUT' },
    { to: '/contactus', label: 'CONTACT' },
  ];

  const handleMobileSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("authToken") && localStorage.getItem("user")));
  }, [location.pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    const email = storedUser ? JSON.parse(storedUser).email : null;

    try {
      if (token && email) {
        await fetch(`${import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:3001/api" : "/api")}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("session_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setIsMenuOpen(false);
      setIsLoggingOut(false);
      navigate("/login");
    }
  };

  return (
    <nav className="left-0 right-0 bg-white z-50 sticky border-b border-gray-100 shadow-sm">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-16 h-16">
        
        {/* Logo */}
        <div>
          <Link to="/home" className="block">
            <img
              src={LaternaLogo}
              alt="logo"
              className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Link
            to="/cart"
            className="relative p-2 text-gray-700 transition hover:text-orange-600"
            aria-label="Shopping cart"
          >
            <FaShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 transition hover:text-orange-600"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
          </button>
        </div>

        {/* Desktop nav items */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group h-full flex items-center">
              {link.to ? (
                <Link
                  to={link.to}
                  className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-600 py-3 px-2 after:transition-all ${
                    location.pathname === link.to 
                      ? 'text-orange-600 after:w-full'
                      : 'text-gray-500 hover:text-orange-700'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-500 cursor-default py-3 px-2">
                  {link.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Action Icons */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Search */}
          <span
            className="bg-orange-500 p-3 rounded-full text-white cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <FaSearch className="hover:text-orange-700" />
          </span>

          {searchOpen && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                  setSearchOpen(false);
                  setSearchQuery("");
                }
              }}
              placeholder="Search products..."
              className="absolute bg-white right-0 top-12 w-64 px-3 py-2 mt-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoFocus
            />
          )}

          {/* Cart Link */}
          <Link
            to="/cart" 
            className="bg-orange-500 p-3 rounded-full text-white relative cursor-pointer"
          >
            <FaShoppingCart className="hover:text-orange-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount} 
              </span>
            )}
          </Link>

          {/* Wishlist Link (Desktop) */}
          <Link 
            to="/wishlist" 
            className="bg-orange-500 p-3 rounded-full text-white relative cursor-pointer hover:bg-orange-600 transition"
          >
            <FaHeart className="hover:text-orange-700" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Profile Link */}
          <Link
            to="/profile"
            className="bg-orange-500 p-3 rounded-full text-white cursor-pointer hover:bg-orange-600 relative"
          >
            <FaUser className="hover:text-orange-700" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-3 py-3 shadow-xl transition-all duration-300 sm:px-6 md:hidden">
          {/* Mobile Search */}
          <div className="mb-3 flex items-center space-x-2 rounded-lg bg-gray-100 p-1.5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMobileSearch()}
              placeholder="Search products..."
              className="flex-grow rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              onClick={handleMobileSearch}
              className="rounded-lg bg-orange-600 p-2.5 text-white transition hover:bg-orange-700"
            >
              <FaSearch size={16} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="mb-3 flex flex-col space-y-0.5 border-b border-gray-200 pb-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-lg px-2 py-2 text-sm font-semibold transition-colors sm:text-base ${
                  location.pathname === link.to 
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex flex-wrap justify-between gap-y-2 pt-2">
            {/* Cart Button */}
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="relative flex w-[48%] items-center justify-center space-x-1.5 rounded-lg bg-orange-500 p-2.5 text-white shadow-lg transition hover:bg-orange-600"
            >
              <FaShoppingCart size={16} />
              <span className="text-xs font-bold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount} 
                </span>
              )}
            </Link>

            {/* Wishlist Button (Mobile) */}
            <Link 
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="relative flex w-[48%] items-center justify-center space-x-1.5 rounded-lg bg-red-500 p-2.5 text-white shadow-lg transition hover:bg-red-600"
            >
              <FaHeart size={16} />
              <span className="text-xs font-bold">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-red-600">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Profile Button */}
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="relative flex w-full items-center justify-center space-x-1.5 rounded-lg bg-orange-500 p-2.5 text-white shadow-lg transition hover:bg-orange-600"
            >
              <FaUser size={16} />
              <span className="text-xs font-bold">Profile</span>
            </Link>
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="relative flex w-full items-center justify-center space-x-1.5 rounded-lg border border-red-200 bg-red-50 p-2.5 text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSignOutAlt size={16} />
                <span className="text-xs font-bold">{isLoggingOut ? "Logging out" : "Log out"}</span>
              </button>
            )}
          </div>

          {/* Social Icons */}
          <div className="mt-5 flex justify-center space-x-5 border-t pt-3">
            <FaTwitter className="cursor-pointer text-gray-500 transition hover:text-blue-400" size={16} />
            <FaFacebookF className="cursor-pointer text-gray-500 transition hover:text-blue-600" size={16} />
            <FaInstagram className="cursor-pointer text-gray-500 transition hover:text-pink-600" size={16} />
          </div>
        </div>
      )}

      <style>
        {`.clip-path-slant { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%) }`}
      </style>
    </nav>
  );
};

export default Navbar;