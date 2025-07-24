import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import LaternaLogo from '../assets/laterna.png';
import { FaTwitter, FaFacebookF, FaGooglePlusG, FaPinterestP, FaLinkedinIn, FaInstagram, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';



const Tesst = () => {
  const [activeLink, setActiveLink] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleDropdown = (label) =>
    setOpenDropdown(openDropdown === label ? null : label);

  const navLinks = [
    {
      href: '#home',
      label: 'HOME',
      links: ['Business', 'Cooking', 'Tech'],
    },
    {
      href: '#',
      label: 'BOOKS',
      links: ['Consulting', 'Training', 'Support'],
    },
    {
      href: '#',
      label: 'FEATURES',
      links: ['Blog', 'Docs', 'Guides'],
    },
    {
      href: '#',
      label: 'BOOKS',
      links: ['Blog', 'Docs', 'Guides'],
    },
    {
      href: '#',
      label: 'PAGES',
      links: ['Blog', 'Docs', 'Guides'],
    },
    {
      href: '#',
      label: 'BLOG',
      links: ['Blog', 'Docs', 'Guides'],
    },
    {
      
      label: 'CONTACT',
      links: ['Blog', 'Docs', 'Guides'],
    },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
          <div>
            <img src={LaternaLogo} alt="logo"className='rounded-lg relative z-10 hover:scale-[1.02]
            transition-transform duration-300' />
          </div>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center gap-8">
            {navLinks.map(({ label, links }) => (
              <div key={label} className="relative group">
                <button className="text-gray-700 font-medium hover:text-orange-600">
                  {label}
                </button>
                <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md hidden group-hover:block z-10 min-w-max">
                {links.map((sublink, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => setActiveLink(sublink)}
                    className={`block text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-600 py-3 px-4 after:transition-all
                    ${activeLink === sublink ? 'text-orange-600 after:w-full' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {sublink}
                  </a>
                ))}
              </div>
              </div>
            ))}
            <div className="hidden md:flex flex items-center space-x-3">
              <span className='bg-orange-500 p-3 rounded-full text-white'><FaSearch className="cursor-pointer hover:text-orange-700" /></span>
              <span className='bg-orange-500 p-3 rounded-full text-white'><FaShoppingCart className="cursor-pointer hover:text-orange-700" /></span>
              <span className='bg-orange-500 p-3 rounded-full text-white'><FaHeart className="cursor-pointer hover:text-orange-700" /></span>
            </div>
          </div>

          {/* Mobile Icon */}
          <div className="md:hidden">
            <button onClick={toggleMobile}>
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-2">
          {navLinks.map(({ label, links }) => (
            <div key={label}>
              <button
                onClick={() => toggleDropdown(label)}
                className="w-full text-left font-medium text-gray-800 flex justify-between py-2"
              >
                {label}
                <span>{openDropdown === label ? '▲' : '▼'}</span>
              </button>
              {openDropdown === label && (
                <div className="pl-4">
                  {links.map((sublink) => (
                    <a
                      key={sublink}
                      href="#"
                      className="block py-1 text-sm text-gray-600 hover:text-orange-600"
                    >
                      {sublink}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="#" className="block py-2 text-gray-700">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Tesst;