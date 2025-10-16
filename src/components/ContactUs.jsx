import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          Contact Us
        </h1>
        <p className="text-gray-600">
          We'd love to hear from you! Reach out for inquiries, feedback, or collaboration.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Google Map */}
        <div className="rounded-xl overflow-hidden h-[400px] shadow-lg">
          <iframe
            title="Laterna Ventures Location"
            src="https://www.google.com/maps?q=1611+Adeola+Hopewell+St,+Victoria+Island,+Lagos+106104,+Lagos&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Right: Contact Info + Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Contact Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              Get In Touch
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-600 w-5 h-5 mt-1" />
                <span>
                  <strong>Address:</strong> 1611 Adeola Hopewell St, Victoria Island, Lagos 106104, Lagos.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="text-orange-600 w-5 h-5 mt-1" />
                <span>
                  <strong>Phone:</strong> <br />
                  (+234) 810 023 4441 <br />
                  +234-1-803-301-4462 <br />
                  +234-1-2715376 <br />
                  +234-1-9049985 <br />
                  +234-1-9049984
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="text-orange-600 w-5 h-5 mt-1" />
                <span>
                  <strong>Email:</strong> <br />
                  <a
                    href="mailto:info@laternabooks.ng"
                    className="text-orange-600 hover:underline"
                  >
                    info@laternabooks.ng
                  </a>
                  <br />
                  <a
                    href="mailto:sales@laternabooks.ng"
                    className="text-orange-600 hover:underline"
                  >
                    sales@laternabooks.ng
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <form
            action="mailto:info@laternabooks.ng"
            method="POST"
            encType="text/plain"
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
