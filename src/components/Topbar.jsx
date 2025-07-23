import React from 'react'
import { FaTwitter, FaFacebookF, FaGooglePlusG, FaPinterestP, FaLinkedinIn, FaInstagram, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';


const Topbar = () => {
  return (
    <section>
        <div className="">
                    <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm flex justify-between items-center">
                        {/* Left Section: Social Icons */}
                        <div className="flex space-x-3 text-sm text-orange-500 py-1 px-4 sm:px-6 lg:px-8">
                        <a href="#" className="hover:text-orange-600">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-orange-600">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-orange-600">
                            <FaGooglePlusG />
                        </a>
                        <a href="#" className="hover:text-orange-600">
                            <FaPinterestP />
                        </a>
                        <a href="#" className="hover:text-orange-600">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="hover:text-orange-600">
                            <FaInstagram />
                        </a>
                        </div>
        
                        {/* Right Section: Solid Orange Bar */}
                        <div className=' absolute top-0 right-0 w-1/2 h-12 top-0 bg-orange-500 clip-path-slant  md:block z-0'></div>
                            <div className="relative flex space-x-4 px-6 text-white">
                                <button className="py-2 cursor-pointer">REGISTER</button>
                                <button className="py-2 cursor-pointer">LOG IN</button>
                            </div>
                    </div>
                </div>
    </section>
  )
}

export default Topbar