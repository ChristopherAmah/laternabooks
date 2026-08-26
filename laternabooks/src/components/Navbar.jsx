import React, { useState } from 'react';
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

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition"
        >
          {isMenuOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
        </button>

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
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 sm:px-6 shadow-xl transition-all duration-300">
          {/* Mobile Search */}
          <div className="flex items-center space-x-2 mb-4 p-2 bg-gray-100 rounded-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMobileSearch()}
              placeholder="Search products..."
              className="flex-grow p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-200"
            />
            <button 
              onClick={handleMobileSearch}
              className="p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              <FaSearch size={16} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-1 border-b border-gray-200 pb-3 mb-3">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-lg font-medium py-3 px-2 rounded-lg transition-colors ${
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
          <div className="flex flex-wrap justify-between gap-y-3 pt-3">
            {/* Cart Button */}
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition w-[48%] justify-center relative shadow-lg"
            >
              <FaShoppingCart size={20} />
              <span className="font-bold text-sm">Cart</span>
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
              className="flex items-center space-x-2 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition w-[48%] justify-center relative shadow-lg"
            >
              <FaHeart size={20} />
              <span className="font-bold text-sm">Wishlist</span>
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
              className="flex items-center space-x-2 p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition w-full justify-center relative shadow-lg"
            >
              <FaUser size={20} />
              <span className="font-bold text-sm">Profile</span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mt-8 border-t pt-4">
            <FaTwitter className="text-gray-500 hover:text-blue-400 cursor-pointer transition" size={20} />
            <FaFacebookF className="text-gray-500 hover:text-blue-600 cursor-pointer transition" size={20} />
            <FaInstagram className="text-gray-500 hover:text-pink-600 cursor-pointer transition" size={20} />
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