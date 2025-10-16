import React, { useState, useEffect } from 'react';
import dreamCount from '../assets/dreamcount.jpeg';
import guitar from '../assets/guitar.jpg';
import perfume from '../assets/perfume.jpg';
import bible from '../assets/bible.jpg';
import business from '../assets/business.jpg';
import { Link } from "react-router-dom";
import rashford from '../assets/rashford.jpeg';
import bananas from '../assets/bananas.jpeg';
import beyondorder from '../assets/beyondorder.jpeg';
import egoistheenemy from '../assets/egoistheenemy.jpeg';
import financialfreedom from '../assets/financialfreedom.jpeg';
import jbl from '../assets/jbl.jpeg';
import allinonall from '../assets/allinonall.jpeg';
import change from '../assets/change.jpeg';
import giveup from '../assets/giveup.jpeg';
import tyranny from '../assets/tyranny.jpeg';
import { ChevronLeft, ChevronRight } from "lucide-react";

const collection = [
  {
    title: 'Dream Count',
    description: 'Inspiring book on purpose',
    oldPrice: '$500.00',
    price: '$350.00',
    image: business,
  },
  {
    title: 'Mindset Shift',
    description: 'Reframe your thoughts',
    oldPrice: '$300.00',
    price: '$250.00',
    image: bananas,
  },
  {
    title: 'Wealth Within',
    description: 'Financial intelligence guide',
    oldPrice: '$400.00',
    price: '$320.00',
    image: beyondorder,
  },
  {
    title: 'The Creative Spark',
    description: 'Unlock your inner genius',
    oldPrice: '$250.00',
    price: '$200.00',
    image: egoistheenemy,
  },
  {
    title: 'Financial Freedom',
    description: 'Steps to wealth building',
    oldPrice: '$400.00',
    price: '$280.00',
    image: financialfreedom,
  },
  {
    title: 'JBL Audio',
    description: 'Premium sound system',
    oldPrice: '$600.00',
    price: '$450.00',
    image: jbl,
  },
  {
    title: 'All in One',
    description: 'Complete guide to success',
    oldPrice: '$350.00',
    price: '$270.00',
    image: allinonall,
  },
  {
    title: 'Change',
    description: 'Transform your mindset',
    oldPrice: '$200.00',
    price: '$150.00',
    image: change,
  },
  {
    title: 'Never Give Up',
    description: 'Motivation to keep going',
    oldPrice: '$180.00',
    price: '$140.00',
    image: giveup,
  },
  {
    title: 'Tyranny of Habit',
    description: 'Break old patterns',
    oldPrice: '$220.00',
    price: '$170.00',
    image: tyranny,
  },
];

const products = [
  {
    id: 1,
    image: dreamCount,
    title: 'Corporate',
    rating: 5,
    originalPrice: '$100.00',
    salePrice: '$80.00',
    onSale: true,
  },
  {
    id: 2,
    image: guitar,
    title: 'Guitar',
    rating: 5,
    originalPrice: '$100.00',
    salePrice: null,
    onSale: false,
  },
  {
    id: 3,
    image: perfume,
    title: 'Chanel No 5',
    rating: 5,
    originalPrice: '$400.00',
    salePrice: '$280.00',
    onSale: true,
  },
  {
    id: 4,
    image: bible,
    title: 'The Bible',
    rating: 5,
    originalPrice: '$80.00',
    salePrice: '$120.00',
    onSale: true,
  },
];

// ⭐ Star Rating Component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    );
  }
  return <div className="flex">{stars}</div>;
};

// 🛍️ Product Card
const ProductCard = ({ product }) => (
  <div className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-3 sm:p-4">
    {product.onSale && (
      <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] sm:text-xs font-bold p-2 rounded-full z-10 shadow-md">
        Sale!
      </span>
    )}
    <div className="w-full max-h-72 sm:max-h-80 md:max-h-96 rounded-md mb-3 border border-gray-200 shadow-sm bg-gray-100">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-contain transition duration-300 ease-in-out hover:brightness-90 hover:scale-105"
      />
    </div>
    <h3 className="text-sm sm:text-base font-semibold text-center text-gray-800 mb-1">
      {product.title}
    </h3>
    <StarRating rating={product.rating} />
    <div className="flex items-center mt-1 sm:mt-2">
      {product.salePrice ? (
        <>
          <span className="text-xs sm:text-sm text-gray-500 line-through mr-2">
            {product.originalPrice}
          </span>
          <span className="text-sm sm:text-base text-orange-500 font-bold">
            {product.salePrice}
          </span>
        </>
      ) : (
        <span className="text-sm sm:text-base text-orange-500 font-bold">
          {product.originalPrice}
        </span>
      )}
    </div>
  </div>
);

const NewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const scrollRef = React.useRef(null);

  const handleBookClick = (index) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

    const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="md:px-4 md:shadow-lg">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">

        {/* 🆕 Latest Products Section */}
        <div className="py-16 bg-gray-50 relative">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-gray-700">Latest Products</h2>
            <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative group">
            {/* Scroll Buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-orange-50 text-orange-500 hidden md:group-hover:flex z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-orange-50 text-orange-500 hidden md:group-hover:flex z-10"
            >
              <ChevronRight size={22} />
            </button>

            {/* Scrollable Row */}
            <div
              ref={scrollRef}
              className="overflow-x-auto scroll-smooth px-6 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100"
            >
              <div className="flex space-x-6 md:space-x-8 w-max pb-4">
                {/* Product 1 */}
                <div className="min-w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 text-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                    alt="Atomic Habits"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-800 font-semibold text-sm">Atomic Habits</h3>
                  <p className="text-gray-500 text-xs">James Clear</p>
                  <span className="text-orange-500 text-sm font-bold mt-1 block">₦10,000</span>
                </div>

                {/* Product 2 */}
                <div className="min-w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 text-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                    alt="The Purpose Driven Life"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-800 font-semibold text-sm">
                    The Purpose Driven Life
                  </h3>
                  <p className="text-gray-500 text-xs">Rick Warren</p>
                  <span className="text-orange-500 text-sm font-bold mt-1 block">₦24,000</span>
                </div>

                {/* Product 3 */}
                <div className="min-w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 text-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1589998059171-988d887df646"
                    alt="Creative Journal Set"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-800 font-semibold text-sm">Creative Journal Set</h3>
                  <p className="text-gray-500 text-xs">Stationery Pack</p>
                  <span className="text-orange-500 text-sm font-bold mt-1 block">₦8,900</span>
                </div>

                {/* Product 4 */}
                <div className="min-w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 text-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1581090700227-1e37b190418e"
                    alt="Wireless Earbuds"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-800 font-semibold text-sm">Wireless Earbuds</h3>
                  <p className="text-gray-500 text-xs">Tech Accessory</p>
                  <span className="text-orange-500 text-sm font-bold mt-1 block">₦22,000</span>
                </div>

                {/* Product 5 */}
                <div className="min-w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-3 text-center flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                    alt="Reading Lamp"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-gray-800 font-semibold text-sm">Reading Lamp</h3>
                  <p className="text-gray-500 text-xs">Home & Lifestyle</p>
                  <span className="text-orange-500 text-sm font-bold mt-1 block">₦15,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* 📚 Book Collection */}
<div className="flex flex-col items-center justify-center py-16 px-6 bg-gradient-to-b from-[#FFF8F5] to-[#FFF3EC]">
  {/* Section Title */}
  <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
    Best Sellers
  </h2>
  <div className="w-20 border-t-4 border-orange-400 mx-auto mt-3"></div>
  <p className="text-gray-600 text-center mt-2">
    Discover the top-rated books and products users can’t get enough of
  </p>

  {/* Book Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-12 w-full max-w-7xl">
    {collection.map((book, index) => (
      <div
        key={index}
        className="relative bg-white shadow-md hover:shadow-2xl rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2"
        onClick={() => handleBookClick(index)}
      >
        {/* 🔥 Bestseller Badge */}
        <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
          🔥 Bestseller
        </div>

        {/* Image */}
        <div className="w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col items-center">
          <a
            href="#"
            className="text-lg font-semibold text-gray-800 text-center hover:text-orange-500 transition"
          >
            {book.title}
          </a>
          <p className="text-sm text-gray-500 text-center mt-1 line-clamp-2">
            {book.description}
          </p>

          <div className="flex items-center gap-2 mt-3">
            {book.oldPrice && (
              <p className="text-sm text-gray-400 line-through">
                {book.oldPrice}
              </p>
            )}
            <p className="text-lg font-bold text-orange-500">{book.price}</p>
          </div>

          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition">
            Add to Cart
          </button>
        </div>

        {/* Hover Overlay (optional detail layer) */}
        <div
          className={`absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          } lg:group-hover:opacity-100`}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{book.description}</p>
          <p className="text-orange-500 font-bold text-xl mb-3">{book.price}</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition">
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>



        {/* 🌟 Featured Products */}
<div className="min-h-screen py-16 px-6 bg-gradient-to-b from-white to-orange-50">
  <header className="text-center mb-14">
    <h2 className="text-3xl font-bold text-gray-800 mb-3">Special Deals</h2>
    <div className="w-20 border-t-4 border-orange-400 mx-auto mb-4"></div>
    <p className="text-gray-500">Grab these limited-time offers before they’re gone!</p>
  </header>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>

        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3">{product.category}</p>
          <p className="text-orange-600 font-bold text-lg">₦ 2,000{product.price}</p>
        </div>

        <div className="px-4 pb-4 text-center">
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition">
            View Product
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* ➡️ Link to All Products */}
  <div className="text-center mt-14">
    <Link
      to="/category"
      className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition"
    >
      View All Categories
      <span className="ml-2 text-xl">→</span>
    </Link>
  </div>
</div>

      </div>
    </section>
  );
};

export default NewsSection;
