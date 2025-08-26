import React from 'react';
import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaPinterestP,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';

const Topbar = () => {
  return (
    <section className="bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex flex-col md:flex-row items-center justify-between relative">

        {/* Left Section: Social Icons */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm text-orange-500 mb-2 md:mb-0 z-10">
          <a href="#" className="hover:text-orange-600"><FaTwitter /></a>
          <a href="#" className="hover:text-orange-600"><FaFacebookF /></a>
          <a href="#" className="hover:text-orange-600"><FaGooglePlusG /></a>
          <a href="#" className="hover:text-orange-600"><FaPinterestP /></a>
          <a href="#" className="hover:text-orange-600"><FaLinkedinIn /></a>
          <a href="#" className="hover:text-orange-600"><FaInstagram /></a>
        </div>

        {/* Right Section */}
        <div className="relative z-10 flex space-x-4 text-white">
          <button className="py-1 px-3 bg-orange-500 rounded hover:bg-orange-600 transition">REGISTER</button>
          <button className="py-1 px-3 bg-orange-500 rounded hover:bg-orange-600 transition">LOG IN</button>
        </div>

        {/* Background Orange Slant - Hidden on small screens */}
        <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-orange-500 clip-path-slant z-0" />
      </div>
    </section>
  );
};

export default Topbar;
