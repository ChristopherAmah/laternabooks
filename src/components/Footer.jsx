import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import LaternaLogo from "../assets/laterna.png";
import paystack from "../assets/paystack.png";
import verve from "../assets/verve.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 lg:px-12 text-gray-700">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 align-center justify-center gap-10">
        {/* Logo & Delivery Info */}
        <div className="space-y-4">
          <img
            src={LaternaLogo}
            alt="LaternaBooks Logo"
            className="w-44 object-contain"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              DELIVERY INFORMATION
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Same day delivery for orders placed before 10am in Victoria Island, Ikoyi and Lagos Island.
              <br />
              Next business day delivery for orders placed in Lagos.
              <br />
              2–3 working days delivery for orders placed Nationwide.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">CONTACT US</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>CALL US NOW:</strong> <br />
              (+234) 810 023 4441
            </p>
            <p>
              <strong>E-MAIL ADDRESS:</strong> <br />
              <a
                href="mailto:info@laternabooks.ng"
                className="text-orange-600 hover:underline"
              >
                info@laternabooks.ng
              </a>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-orange-600 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-orange-600 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-orange-600 transition">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="hover:text-orange-600 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-orange-600 transition">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                Return Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 transition">
                Join Book Club
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600 text-center md:text-left">
          LaternaBooks. © {new Date().getFullYear()} All Rights Reserved
        </p>

        {/* Payment Icons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            alt="Mastercard"
            className="h-5 object-contain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            alt="Visa"
            className="h-5 object-contain"
          />
          <img
            src={verve}
            alt="Verve"
            className="h-5 object-contain"
          />
          <img
            src={paystack}
            alt="Paystack"
            className="h-5 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
