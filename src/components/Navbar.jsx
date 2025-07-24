import React, {useState} from 'react'
import { HiMenu, HiX } from 'react-icons/hi';
import LaternaLogo from '../assets/laterna.png';
import { FaTwitter, FaFacebookF, FaGooglePlusG, FaPinterestP, FaLinkedinIn, FaInstagram, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');
    const [mobileDropdown, setMobileDropdown] = useState(null);

    const navLinks = [
        { href: '#home', label: 'HOME' },
        { href: '#', label: 'BOOKS', links: ['Business', 'Cooking', 'Tech'] },
        { href: '#', label: 'E-BOOKS' },
        { href: '#', label: 'FEATURES', links: ['Blog', 'Docs', 'Guides'] },
        { href: '#', label: 'PAGES', links: ['About Us', 'Our Team', 'FAQ'] },
        { href: '#', label: 'BLOG' },
        { href: '#contact', label: 'CONTACT' },
    ];

  return (
    <nav className="left-0 right-0 bg-white/90 backdrop-blur-sm z-50 sticky border-b border-gray-100 shadow-sm">
        <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16'>
            {/* Logo */}
            <div>
                <img src={LaternaLogo} alt="logo"className='rounded-lg relative z-10 hover:scale-[1.02]
                transition-transform duration-300' />
            </div>

            {/* mobile menu button*/}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden p-2'>
                {
                    isMenuOpen ? <HiX className='size-6'/> : <HiMenu className='size-6'/>
                }
            </button>

            {/* desktop navitems */}
            <div className='hidden md:flex items-center gap-10'>
            {navLinks.map((link, index) => (
                <div key={index} className="relative group">
                <a
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-600 py-3 px-2 after:transition-all ${
                    activeLink === link.href ? 'text-orange-600 after:w-full' : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    {link.label}
                </a>

                {/* Dropdown if link has sublinks */}
                {link.links && (
                    <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md hidden group-hover:block z-10 min-w-max">
                    {link.links.map((sublink, subIndex) => (
                        <a
                        key={subIndex}
                        href="#"
                        onClick={() => setActiveLink(sublink)}
                        className={`block text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-600 py-3 px-4 after:transition-all ${
                            activeLink === sublink ? 'text-orange-600 after:w-full' : 'text-gray-500 hover:text-gray-900'
                        }`}
                        >
                        {sublink}
                        </a>
                    ))}
                    </div>
                )}
                </div>
            ))}
            </div>



            {/* get in touch btn */}
            <div className="hidden md:flex flex items-center space-x-3">
                <span className='bg-orange-500 p-3 rounded-full text-white'><FaSearch className="cursor-pointer hover:text-orange-700" /></span>
                <span className='bg-orange-500 p-3 rounded-full text-white'><FaShoppingCart className="cursor-pointer hover:text-orange-700" /></span>
                <span className='bg-orange-500 p-3 rounded-full text-white'><FaHeart className="cursor-pointer hover:text-orange-700" /></span>
            </div>

            {/* <button className='hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-100'>
                <a href="#newsletter">Create an account</a>
            </button> */}


            {/* mobile menu */}
        </div>

        {/* mobile menu items */}
       {isMenuOpen && (
  <div className="md:hidden bg-white border-t border-gray-100 py-4">
    <div className="container mx-auto px-4 space-y-3">
      {navLinks.map((link, index) => (
        <div key={index}>
          <button
            className="w-full text-left text-sm font-medium text-gray-700 flex justify-between items-center py-2"
            onClick={() =>
              link.links
                ? setMobileDropdown(mobileDropdown === link.label ? null : link.label)
                : setIsMenuOpen(false)
            }
          >
            <span onClick={() => setActiveLink(link.href)}>{link.label}</span>
            {link.links && (
              <span className="text-gray-500 text-xs">
                {mobileDropdown === link.label ? '▲' : '▼'}
              </span>
            )}
          </button>

          {/* Nested sublinks */}
          {link.links && mobileDropdown === link.label && (
            <div className="pl-4">
              {link.links.map((sublink, subIndex) => (
                <a
                  key={subIndex}
                  href="#"
                  onClick={() => {
                    setActiveLink(sublink);
                    setIsMenuOpen(false);
                    setMobileDropdown(null);
                  }}
                  className={`block py-1 text-sm ${
                    activeLink === sublink
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {sublink}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Icons */}
      <div className="flex items-center space-x-4 pt-4">
        <FaSearch className="text-orange-500 text-xl" />
        <FaShoppingCart className="text-orange-500 text-xl" />
        <FaHeart className="text-orange-500 text-xl" />
      </div>
    </div>
  </div>
)}

        <style>
        {
            /* clip path for slant gradient */
            `.clip-path-slant {
            clip-path:polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%)
            }`
        }
      </style>
    </nav>
  )
}

export default Navbar