import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import LaternaLogo from '../assets/laterna.png';
import { FaTwitter, FaFacebookF, FaGooglePlusG, FaPinterestP, FaLinkedinIn, FaInstagram, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import dreamCount from '../assets/dreamcount.jpeg'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');
    const [mobileDropdown, setMobileDropdown] = useState(null);

    // Updated navLinks structure to support multi-column dropdowns
    const navLinks = [
        { href: '#home', label: 'HOME' },
        {
            href: '#',
            label: 'BOOKS',
            dropdownContent: {
                type: 'multi-column',
                columns: [
                    {
                        title: 'Categories',
                        items: [
                            { label: 'Business', href: '#' },
                            { label: 'Computer', href: '#' },
                            { label: 'Crime Books', href: '#' },
                            { label: 'Cooking & Food', href: '#' },
                            { label: 'Love & Romance', href: '#' },
                        ]
                    },
                    {
                        title: 'Product Types',
                        items: [
                            { label: 'Simple Product', href: '#' },
                            { label: 'Grouped Product', href: '#' },
                            { label: 'Variable Product', href: '#' },
                            { label: 'External Product', href: '#' },
                            { label: 'Download Product', href: '#' },
                        ]
                    },
                    {
                        title: 'Top Rated Products',
                        items: [
                            { title: 'Zero Oil Cook', originalPrice: '$100.00', salePrice: '$80.00' },
                            { title: 'Corporate', originalPrice: '$120.00', salePrice: '$90.00' },
                            { title: 'Web Designing', originalPrice: '$150.00', salePrice: '$100.00' },
                        ],
                        type: 'product-list' // Indicate this column contains product items
                    },
                    {
                        title: 'Best Selling Products',
                        items: [
                            { title: 'Just Listen', image: dreamCount },
                            { title: 'Downloadable Prod', image: dreamCount },
                        ],
                        type: 'image-list' // Indicate this column contains images
                    }
                ]
            }
        },
        { href: '#', label: 'E-BOOKS' },
        // { href: '#', label: 'FEATURES', links: ['Blog', 'Docs', 'Guides'] },
        { href: '#blog', label: 'ABOUT' },
        { href: '#blog', label: 'BLOG' },
        { href: '#contact', label: 'CONTACT' },
    ];

    return (
        <nav className="left-0 right-0 bg-white/90 backdrop-blur-sm z-50 sticky border-b border-gray-100 shadow-sm">
            <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16'>
                {/* Logo */}
                <div>
                    <img src={LaternaLogo} alt="logo" className='rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300' />
                </div>

                {/* mobile menu button*/}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden p-2'>
                    {
                        isMenuOpen ? <HiX className='size-6' /> : <HiMenu className='size-6' />
                    }
                </button>

                {/* desktop navitems */}
                <div className='hidden md:flex items-center gap-10'>
                    {navLinks.map((link, index) => (
                        <div key={index} className="relative group h-full flex items-center"> {/* Added flex items-center for vertical alignment */}
                            <a
                                href={link.href}
                                onClick={() => setActiveLink(link.href)}
                                className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-600 py-3 px-2 after:transition-all ${
                                    activeLink === link.href ? 'text-orange-600 after:w-full' : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                {link.label}
                            </a>

                            {/* Dropdown if link has sublinks (simple dropdown) */}
                            {link.links && !link.dropdownContent && (
                                <div className="absolute left-0 top-full mt-0 bg-white shadow-lg rounded-md hidden group-hover:block z-20 min-w-[160px] border border-gray-100"> {/* Adjusted top-full and removed mt-2 */}
                                    {link.links.map((sublink, subIndex) => (
                                        <a
                                            key={subIndex}
                                            href="#"
                                            onClick={() => setActiveLink(sublink)}
                                            className={`block text-sm font-medium relative hover:bg-gray-50 py-2 px-4 whitespace-nowrap ${ /* Adjusted padding and removed underline effect for sublinks */
                                                activeLink === sublink ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
                                            }`}
                                        >
                                            {sublink}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Multi-column Dropdown for 'BOOKS' */}
                            {link.dropdownContent && link.dropdownContent.type === 'multi-column' && (
                                <div className="absolute left-0 top-full mt-0 bg-white shadow-lg rounded-md hidden group-hover:grid z-20 w-[800px] grid-cols-4 gap-4 p-6 border border-gray-100"> {/* Adjusted width, grid, and padding */}
                                    {link.dropdownContent.columns.map((column, colIndex) => (
                                        <div key={colIndex}>
                                            <h4 className="font-bold text-gray-800 mb-3 border-b pb-2 border-gray-200">{column.title}</h4> {/* Styled column title */}
                                            {column.type === 'product-list' ? (
                                                <ul className="space-y-2 text-sm">
                                                    {column.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex justify-between items-center text-gray-700">
                                                            <a href="#" className="hover:text-orange-600">{item.title}</a>
                                                            <span className="text-gray-500 line-through text-xs">{item.originalPrice}</span>
                                                            <span className="text-orange-600 font-semibold">{item.salePrice}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : column.type === 'image-list' ? (
                                                <div className="space-y-3">
                                                    {column.items.map((item, itemIndex) => (
                                                        <div key={itemIndex} className="flex items-center gap-2">
                                                            <img src={item.image} alt={item.title} className="w-16 h-auto object-cover rounded" />
                                                            <span className="text-sm text-gray-700">{item.title}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <ul className="space-y-2 text-sm">
                                                    {column.items.map((item, itemIndex) => (
                                                        <li key={itemIndex}>
                                                            <a href={item.href} className="block text-gray-700 hover:text-orange-600">
                                                                {item.label}
                                                            </a>
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

                {/* get in touch btn */}
                <div className="hidden md:flex items-center space-x-3">
                    <span className='bg-orange-500 p-3 rounded-full text-white'><FaSearch className="cursor-pointer hover:text-orange-700" /></span>
                    <span className='bg-orange-500 p-3 rounded-full text-white'><FaShoppingCart className="cursor-pointer hover:text-orange-700" /></span>
                    <span className='bg-orange-500 p-3 rounded-full text-white'><FaHeart className="cursor-pointer hover:text-orange-700" /></span>
                </div>
            </div>

            {/* mobile menu items */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4">
                    <div className="container mx-auto px-4 space-y-3">
                        {navLinks.map((link, index) => (
                            <div key={index}>
                                {/* Main mobile link/button */}
                                <button
                                    className="w-full text-left text-sm font-medium text-gray-700 flex justify-between items-center py-2"
                                    onClick={() =>
                                        // If it has a multi-column dropdown, toggle mobileDropdown state
                                        link.dropdownContent && link.dropdownContent.type === 'multi-column'
                                            ? setMobileDropdown(mobileDropdown === link.label ? null : link.label)
                                            // If it has simple links, toggle mobileDropdown and close main menu
                                            : link.links
                                            ? setMobileDropdown(mobileDropdown === link.label ? null : link.label)
                                            : setIsMenuOpen(false)
                                    }
                                >
                                    <span onClick={() => setActiveLink(link.href)}>{link.label}</span>
                                    {(link.links || (link.dropdownContent && link.dropdownContent.type === 'multi-column')) && (
                                        <span className="text-gray-500 text-xs">
                                            {mobileDropdown === link.label ? '▲' : '▼'}
                                        </span>
                                    )}
                                </button>

                                {/* Nested sublinks for simple dropdowns */}
                                {link.links && mobileDropdown === link.label && !link.dropdownContent && (
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

                                {/* Nested sublinks for multi-column dropdown on mobile */}
                                {link.dropdownContent && link.dropdownContent.type === 'multi-column' && mobileDropdown === link.label && (
                                    <div className="pl-4 border-l border-gray-200 ml-2"> {/* Added left border for visual separation */}
                                        {link.dropdownContent.columns.map((column, colIndex) => (
                                            <div key={colIndex} className="mb-4 last:mb-0">
                                                <h5 className="font-bold text-gray-800 text-sm mb-2">{column.title}</h5>
                                                {column.type === 'product-list' ? (
                                                    <ul className="space-y-1 text-xs">
                                                        {column.items.map((item, itemIndex) => (
                                                            <li key={itemIndex} className="flex justify-between items-center text-gray-700">
                                                                <a href="#" className="hover:text-orange-600">{item.title}</a>
                                                                <span className="text-gray-500 line-through text-[10px]">{item.originalPrice}</span>
                                                                <span className="text-orange-600 font-semibold">{item.salePrice}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : column.type === 'image-list' ? (
                                                    <div className="space-y-2">
                                                        {column.items.map((item, itemIndex) => (
                                                            <div key={itemIndex} className="flex items-center gap-2">
                                                                <img src={item.image} alt={item.title} className="w-12 h-auto object-cover rounded" />
                                                                <span className="text-xs text-gray-700">{item.title}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <ul className="space-y-1 text-xs">
                                                        {column.items.map((item, itemIndex) => (
                                                            <li key={itemIndex}>
                                                                <a href={item.href} className="block text-gray-600 hover:text-orange-600">
                                                                    {item.label}
                                                                </a>
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

export default Navbar;
