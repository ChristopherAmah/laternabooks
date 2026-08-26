import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import LaternaLogo from "../assets/laterna.png";
import paystack from "../assets/paystack.png";
import verve from "../assets/verve.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-14 pb-6 text-gray-700">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr] gap-12">
        {/* Logo & Delivery Info */}
        <div className="space-y-6">
          <img
            src={LaternaLogo}
            alt="LaternaBooks Logo"
            className="w-48 object-contain"
          />

          <div>
            <h2 className="text-sm font-bold text-gray-900 tracking-wide mb-3">
              DELIVERY INFORMATION
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 max-w-md">
              Same day delivery for orders placed before 10am in Victoria Island,
              Ikoyi and Lagos Island.
              <br />
              <br />
              Next business day delivery for orders placed in Lagos.
              <br />
              <br />
              2–3 working days delivery for orders placed Nationwide.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-gray-900 tracking-wide">
            CONTACT US
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <span className="block font-semibold text-gray-800">
                CALL US NOW
              </span>
              (+234) 810 023 4441
            </p>

            <p>
              <span className="block font-semibold text-gray-800">
                E-MAIL ADDRESS
              </span>
              <a
                href="mailto:info@laternabooks.ng"
                className="text-orange-600 hover:underline"
              >
                info@laternabooks.ng
              </a>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            {[
              { icon: FaFacebookF, url: "https://www.facebook.com/laterna.ventures" },
              { icon: FaTwitter, url: "https://x.com/laternabooks" },
              { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/laterna-ventures-ltd/?trk=biz-companies-cym" },
              { icon: FaInstagram, url: "https://www.instagram.com/laternabooks/" },
              { icon: FaYoutube, url: "https://www.youtube.com/channel/UCpq6etoaUTwf1Vl75uYIUDw" },
            ].map(({ icon: Icon, url }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:border-orange-500 hover:text-orange-600 transition"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-gray-900 tracking-wide">
            QUICK LINKS
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">
            {[
              { name: "About Us", url: "/aboutus" },
              { name: "Contact Us", url: "/contactus" },
              { name: "Return Policy", url: "/return-policy" },
              { name: "Terms & Conditions", url: "/terms" },
              { name: "Join Book Club", url: "/book-club" },
            ].map(({ name, url }) => (
              <li key={name}>
                <a
                  href={url}
                  className="hover:text-orange-600 transition"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-10" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500 text-center md:text-left">
          LaternaBooks © {new Date().getFullYear()} — All Rights Reserved
        </p>

        {/* Payment Icons */}
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            alt="Mastercard"
            className="h-5 object-contain opacity-80"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
            alt="Visa"
            className="h-5 object-contain opacity-80"
          />
          <img src={verve} alt="Verve" className="h-5 object-contain opacity-80" />
          <img
            src={paystack}
            alt="Paystack"
            className="h-5 object-contain opacity-80"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
