import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import LaternaLogo from '../assets/laterna.png';
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

  // Updated navLinks with routes for dropdowns (replace '/' with actual routes)
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
              { label: 'Business', href: '/' }, // Update to '/books/business'
              { label: 'Computer', href: '/' }, // Update to '/books/computer'
              { label: 'Crime Books', href: '/' }, // Update to '/books/crime'
              { label: 'Cooking & Food', href: '/' }, // Update to '/books/cooking'
              { label: 'Love & Romance', href: '/' }, // Update to '/books/romance'
            ],
          },
          {
            title: 'Top Rated Products',
            items: [
              { title: 'Zero Oil Cook', originalPrice: '$100.00', salePrice: '$80.00', href: '/' }, // Update href
              { title: 'Corporate', originalPrice: '$120.00', salePrice: '$90.00', href: '/' }, // Update href
              { title: 'Web Designing', originalPrice: '$150.00', salePrice: '$100.00', href: '/' }, // Update href
            ],
            type: 'product-list',
          },
          {
            title: 'Best Selling Products',
            items: [
              { title: 'Just Listen', image: dreamCount, href: '/' }, // Update href
              { title: 'Downloadable Prod', image: dreamCount, href: '/' }, // Update href
            ],
            type: 'image-list',
          },
        ],
      },
    },
    {
      label: 'MULTIMEDIA',
      dropdownContent: {
        type: 'multi-column',
        columns: [
          {
            title: 'Categories',
            items: [
              { label: 'Audio', href: '/' }, // Update to '/multimedia/audio'
              { label: 'Music & Video', href: '/' }, // Update to '/multimedia/video'
            ],
          },
          {
            title: 'Top Rated Products',
            items: [
              { title: 'Guitar', originalPrice: '$100.00', salePrice: '$80.00', href: '/' }, // Update href
              { title: 'Grand Piano', originalPrice: '$120.00', salePrice: '$90.00', href: '/' }, // Update href
              { title: 'Art of War (Audio)', originalPrice: '$150.00', salePrice: '$100.00', href: '/' }, // Update href
            ],
            type: 'product-list',
          },
          {
            title: 'Best Selling Products',
            items: [
              { title: 'Guitar', image: guitar, href: '/' }, // Update href
              { title: 'Art of War (Audio)', image: dreamCount, href: '/' }, // Update href
            ],
            type: 'image-list',
          },
        ],
      },
    },
    { to: '/', label: 'GIFT ITEMS' }, // Update to '/gift-items'
    { to: '/', label: 'FRAGRANCES' }, // Update to '/fragrances'
    { to: '/shop', label: 'SHOP' },
    { to: '/', label: 'ABOUT' }, // Update to '/about'
    { to: '/', label: 'CONTACT' }, // Update to '/contact'
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
          <span className="bg-orange-500 p-3 rounded-full text-white">
            <FaShoppingCart className="cursor-pointer hover:text-orange-700" />
          </span>
          <span className="bg-orange-500 p-3 rounded-full text-white">
            <FaHeart className="cursor-pointer hover:text-orange-700" />
          </span>
        </div>
      </div>

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