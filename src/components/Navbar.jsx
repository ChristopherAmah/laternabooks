import React, {useState} from 'react'
import { HiMenu, HiX } from 'react-icons/hi';
import LaternaLogo from '../assets/laterna.png';
import { FaTwitter, FaFacebookF, FaGooglePlusG, FaPinterestP, FaLinkedinIn, FaInstagram, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');

    const navLinks = [
        {href: '#home', label: 'HOME'},
        {href: '#', label: 'BOOKS'},
        {href: '#', label: 'E-BOOKS'},
        {href: '#', label: 'FEATURES'},
        {href: '#', label: 'PAGES'},
        {href: '#', label: 'BLOG'},
        {href: '#', label: 'CONTACT'},
    ] 
  return (
    <nav className="left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16'>
            {/* Logo */}
            <div>
                <img src={LaternaLogo} alt="logo"className='rounded-lg relative z-10 hover:scale-[1.02]
                transition-transfom duration-300' />
            </div>

            {/* mobile menu button*/}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden p-2'>
                {
                    isMenuOpen ? <HiX className='size-6'/> : <HiMenu className='size-6'/>
                }
            </button>

            {/* desktop navitems */}
            <div className='hidden md:flex items-center gap-10'>
                {
                    navLinks.map((link, index) => (
                        <a key={index} href={link.href} 
                            onClick={() => setActiveLink(link.href)}
                            className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-600  py-3 px-2
                            after:transition-all ${activeLink === link.href ? 'text-orange-600 after:w-full' : 'text-gray-500 hover:text-gray-900'}`}>
                            {link.label}
                        </a>
                    ))
                }
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
        {
            isMenuOpen && (
                <div className='md:hidden bg-white border-t border-gray-100 py-4'>
                    <div className='container mx-auto px-4 space-y-3'>
                        {navLinks.map((link, index) => (
                            <a 
                            key={index}
                            onClick={() => {
                                setActiveLink(link.href);
                                setIsMenuOpen(false);
                            }}
                            className={`block text-sm font-medium py-2 text-orange-500 ${activeLink === link.href ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`} href={link.href}>{link.label}</a>
                        ))}

                        <div className="md:flex flex items-center space-x-3">
                            <span className='bg-orange-500 p-3 rounded-full text-white'><FaSearch className="cursor-pointer hover:text-orange-700" /></span>
                            <span className='bg-orange-500 p-3 rounded-full text-white'><FaShoppingCart className="cursor-pointer hover:text-orange-700" /></span>
                            <span className='bg-orange-500 p-3 rounded-full text-white'><FaHeart className="cursor-pointer hover:text-orange-700" /></span>
                        </div>
                    </div>
                </div>

            )
        }
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