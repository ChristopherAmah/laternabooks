import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import LaternaLogo from '../assets/laterna.png';
import allinonall from '../assets/allinonall.jpeg';
import egoistheenemy from '../assets/egoistheenemy.jpeg';
import airpure from '../assets/airpure.jpeg';
import firedearth from '../assets/firedearth.jpg';
import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaPinterestP,
  FaLinkedinIn,
  FaInstagram,
  FaSearch,
  FaShoppingCart,
  FaHeart,
} from 'react-icons/fa';
import dreamCount from '../assets/dreamcount.jpeg';
import guitar from '../assets/guitar.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [mobileDropdown, setMobileDropdown] = useState(null);

  // Cart drawer state
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems] = useState([
    { id: 1, title: 'Dream Count', image: dreamCount, price: '₦5,000' },
    { id: 2, title: 'Guitar', image: guitar, price: '₦15,000' },
  ]); // mock data

  // Updated navLinks
  const navLinks = [
    { to: '/', label: 'HOME' },
    {
      label: 'BOOKS',
      dropdownContent: {
        type: 'multi-column',
        columns: [
          {
            title: 'Categories',
            items: [
              { label: 'AUDIO BOOKS', href: '/' },
              { label: 'BIBLE REFERENCES', href: '/' },
              { label: 'BIBLES', href: '/' },
              { label: 'BUSINESS BOOKS', href: '/' },
              { label: 'CHRISTIAN BOOKS', href: '/' },
              { label: 'CHRISTIAN MOVIES', href: '/' },
              { label: 'EDUCATIONAL BOOKS', href: '/' },
              { label: 'JOURNALS', href: '/' },
            ],
          },
          {
            title: 'Best Selling Products',
            items: [
              { title: 'All in on all', image: allinonall, href: '/' },
              { title: 'Ego is the enemy', image: egoistheenemy, href: '/' },
            ],
            type: 'image-list',
          },
        ],
      },
    },
    {
      label: 'LIFESTYLE',
      dropdownContent: {
        type: 'multi-column',
        columns: [
          {
            title: 'Categories',
            items: [
              { label: 'CHRISTIAN MOVIES', href: '/' },
              { label: 'FRAGRANCES', href: '/' },
              { label: 'LIFE & STYLE', href: '/' },
            ],
          },
          {
            title: 'Best Selling Products',
            items: [
              { title: 'Air Pure', image: airpure, href: '/' },
              { title: 'Fired Earth', image: firedearth, href: '/' },
            ],
            type: 'image-list',
          },
        ],
      },
    },
    {
      label: 'GIFT ITEMS',
      dropdownContent: {
        type: 'multi-column',
        columns: [
          {
            title: 'Categories',
            items: [
              { label: 'CHRISTMAS DECORATIONS', href: '/' },
              { label: 'EDUCATIONAL TOYS', href: '/' },
              { label: 'GIFT ITEMS', href: '/' },
              { label: 'GIFT WRAP', href: '/' },
              { label: 'GREETING CARDS', href: '/' },
              { label: 'PENCIL CASES', href: '/' },
              { label: 'STATIONERY & OFFICE SUPPLIES', href: '/' },
              { label: 'WALL DECOR', href: '/' },
            ],
          },
          {
            title: 'Best Selling Products',
            items: [
              { title: 'Confetti', image: guitar, href: '/' },
              { title: 'Toy car', image: dreamCount, href: '/' },
            ],
            type: 'image-list',
          },
        ],
      },
    },
    {
      label: 'AUDIO-VISUALS',
      dropdownContent: {
        type: 'multi-column',
        columns: [
          {
            title: 'Categories',
            items: [
              { label: 'BLUETOOTH DEVICE & ACCESSORIES', href: '/' },
              { label: 'MOVIES', href: '/' },
              { label: 'MESSAGES', href: '/' },
              { label: 'MUSIC & VIDEOS', href: '/' },
              { label: 'MUSICAL INSTRUMENTS', href: '/' },
            ],
          },
          {
            title: 'Best Selling Products',
            items: [
              { title: 'Guitar', image: guitar, href: '/' },
              { title: 'Art of War (Audio)', image: dreamCount, href: '/' },
            ],
            type: 'image-list',
          },
        ],
      },
    },
    { to: '/shop', label: 'SHOP' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav className="left-0 right-0 bg-white/90 backdrop-blur-sm z-50 sticky border-b border-gray-100 shadow-sm">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-16 h-16">
        {/* Logo */}
        <div>
          <Link to="/" className="block">
            <img
              src={LaternaLogo}
              alt="logo"
              className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
          {isMenuOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
        </button>

        {/* Desktop nav items */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group h-full flex items-center">
              {link.to ? (
                <Link
                  to={link.to}
                  onClick={() => setActiveLink(link.to)}
                  className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-600 py-3 px-2 after:transition-all ${
                    activeLink === link.to
                      ? 'text-orange-600 after:w-full'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <span className="text-sm font-medium text-gray-500 cursor-default py-3 px-2">
                  {link.label}
                </span>
              )}

              {/* Multi-column Dropdown */}
              {link.dropdownContent && link.dropdownContent.type === 'multi-column' && (
                <div className="absolute left-0 top-full mt-0 bg-white shadow-lg rounded-md hidden group-hover:grid z-20 w-[800px] grid-cols-4 gap-4 p-6 border border-gray-100">
                  {link.dropdownContent.columns.map((column, colIndex) => (
                    <div key={colIndex}>
                      <h4 className="font-bold text-gray-800 mb-3 border-b pb-2 border-gray-200">
                        {column.title}
                      </h4>
                      {column.type === 'product-list' ? (
                        <ul className="space-y-2 text-sm">
                          {column.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex justify-between items-center text-gray-700">
                              <Link to={item.href} className="hover:text-orange-600">
                                {item.title}
                              </Link>
                              <span className="text-gray-500 line-through text-xs">{item.originalPrice}</span>
                              <span className="text-orange-600 font-semibold">{item.salePrice}</span>
                            </li>
                          ))}
                        </ul>
                      ) : column.type === 'image-list' ? (
                        <div className="space-y-3">
                          {column.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={item.href}
                              className="flex items-center gap-2 hover:text-orange-600"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-auto object-cover rounded"
                              />
                              <span className="text-sm text-gray-700">{item.title}</span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2 text-sm">
                          {column.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                to={item.href}
                                className="block text-gray-700 hover:text-orange-600"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Get in touch buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <span className="bg-orange-500 p-3 rounded-full text-white">
            <FaSearch className="cursor-pointer hover:text-orange-700" />
          </span>

          {/* Cart with badge */}
          <span
            className="bg-orange-500 p-3 rounded-full text-white relative cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <FaShoppingCart className="hover:text-orange-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </span>

          <span className="bg-orange-500 p-3 rounded-full text-white">
            <FaHeart className="cursor-pointer hover:text-orange-700" />
          </span>
        </div>
      </div>

      {/* Cart Drawer */}
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setCartOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-5 flex flex-col transform transition-transform duration-300 ${
            cartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
            <button onClick={() => setCartOpen(false)}>
              <HiX className="text-2xl text-gray-600 hover:text-red-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-orange-600">{item.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4">
            <button className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
              Checkout
            </button>
          </div>
        </div>
      </>

      {/* Mobile menu items */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-3">
            {navLinks.map((link, index) => (
              <div key={index}>
                {link.to ? (
                  <Link
                    to={link.to}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveLink(link.to);
                    }}
                    className="w-full text-left text-sm font-medium text-gray-700 flex justify-between items-center py-2"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    className="w-full text-left text-sm font-medium text-gray-700 flex justify-between items-center py-2"
                    onClick={() =>
                      link.dropdownContent && link.dropdownContent.type === 'multi-column'
                        ? setMobileDropdown(mobileDropdown === link.label ? null : link.label)
                        : null
                    }
                    aria-expanded={link.dropdownContent ? mobileDropdown === link.label : undefined}
                    aria-controls={link.dropdownContent ? `dropdown-${index}` : undefined}
                  >
                    {link.label}
                    {link.dropdownContent && (
                      <span className="text-gray-500 text-xs">
                        {mobileDropdown === link.label ? '▲' : '▼'}
                      </span>
                    )}
                  </button>
                )}

                {/* Mobile Dropdown */}
                {link.dropdownContent &&
                  link.dropdownContent.type === 'multi-column' &&
                  mobileDropdown === link.label && (
                    <div id={`dropdown-${index}`} className="pl-4 border-l border-gray-200 ml-2">
                      {link.dropdownContent.columns.map((column, colIndex) => (
                        <div key={colIndex} className="mb-4 last:mb-0">
                          <h5 className="font-bold text-gray-800 text-sm mb-2">{column.title}</h5>
                          {column.type === 'product-list' ? (
                            <ul className="space-y-1 text-xs">
                              {column.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex justify-between items-center text-gray-700">
                                  <Link
                                    to={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="hover:text-orange-600"
                                  >
                                    {item.title}
                                  </Link>
                                  <span className="text-gray-500 line-through text-[10px]">
                                    {item.originalPrice}
                                  </span>
                                  <span className="text-orange-600 font-semibold">{item.salePrice}</span>
                                </li>
                              ))}
                            </ul>
                          ) : column.type === 'image-list' ? (
                            <div className="space-y-2">
                              {column.items.map((item, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  to={item.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-2 hover:text-orange-600"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-12 h-auto object-cover rounded"
                                  />
                                  <span className="text-xs text-gray-700">{item.title}</span>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-1 text-xs">
                              {column.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    to={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-gray-600 hover:text-orange-600"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
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
