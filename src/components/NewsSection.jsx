import React, { useState, useEffect } from 'react';
import dreamCount from '../assets/dreamcount.jpeg'
import guitar from '../assets/guitar.jpg'
import perfume from '../assets/perfume.jpg'
import bible from '../assets/bible.jpg'
import business from '../assets/business.jpg'
import { Link } from "react-router-dom";
import rashford from '../assets/rashford.jpeg'
import bananas from '../assets/bananas.jpeg'
import beyondorder from '../assets/beyondorder.jpeg'
import egoistheenemy from '../assets/egoistheenemy.jpeg'
import financialfreedom from '../assets/financialfreedom.jpeg'
import jbl from '../assets/jbl.jpeg'
import allinonall from '../assets/allinonall.jpeg'
import change from '../assets/change.jpeg'
import giveup from '../assets/giveup.jpeg'
import tyranny from '../assets/tyranny.jpeg'

const books = [
    { title: "Vintage - The Art of Poster", image: dreamCount },
    { title: "Lorem Ipsum", image: dreamCount },
    { title: "Organization", image: dreamCount },
    { title: "Recipes", image: dreamCount },
    { title: "Vintage - The Art of Poster", image: dreamCount },
    { title: "Bloodstorm - Heart of Vampire", image: dreamCount },
    { title: "Your Next!", image: dreamCount },
    { title: "Opportunities", image: dreamCount },
    { title: "Bloodstorm - Heart of Vampire", image: dreamCount },
    { title: "Bloodstorm - Heart of Vampire", image: dreamCount },
];

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
    image:bananas,
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
    title: 'The Creative Spark',
    description: 'Unlock your inner genius',
    oldPrice: '$250.00',
    price: '$200.00',
    image: financialfreedom,
  },
  {
    title: 'The Creative Spark',
    description: 'Unlock your inner genius',
    oldPrice: '$250.00',
    price: '$200.00',
    image: jbl,
  },
  {
    title: 'The Creative Spark',
    description: 'Unlock your inner genius',
    oldPrice: '$250.00',
    price: '$200.00',
    image: allinonall,
  },
  {
    title: 'The Creative Spark',
    description: 'Unlock your inner genius',
    oldPrice: '$250.00',
    price: '$200.00',
    image: change,
  },
  {
    title: 'The Creative Spark',
    description: 'Unlock your inner genius',
    oldPrice: '$250.00',
    price: '$200.00',
    image: giveup,
  },
  {
    title: 'The Creative Spark',
    description: 'Unlock your inner genius',
    oldPrice: '$250.00',
    price: '$200.00',
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

// Star Rating Component
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

// Product Card Component
const ProductCard = ({ product }) => {
    return (
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
                  onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                          'https://placehold.co/300x400/CCCCCC/000000?text=Image+Error';
                  }}
              />
          </div>
            <h3 className="text-sm sm:text-base font-semibold text-center text-gray-800 mb-1">
                {product.title}
            </h3>
            <StarRating rating={product.rating} />
            <div className="flex items-center mt-1 sm:mt-2">
                {product.originalPrice && product.salePrice && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through mr-2">
                        {product.originalPrice}
                    </span>
                )}
                {product.salePrice && (
                    <span className="text-sm sm:text-base text-orange-500 font-bold">
                        {product.salePrice}
                    </span>
                )}
                {!product.onSale && product.originalPrice && (
                    <span className="text-sm sm:text-base text-orange-500 font-bold">
                        {product.originalPrice}
                    </span>
                )}
            </div>
        </div>
    );
};

const NewsSection = () => {
 const [activeIndex, setActiveIndex] = useState(null);
 const [categories, setCategories] = useState([]);
 const [catsLoading, setCatsLoading] = useState(false);
 const [catsError, setCatsError] = useState(null);

 useEffect(() => {
   const fetchCategories = async () => {
     setCatsLoading(true);
     setCatsError(null);
     try {
       const res = await fetch("http://41.78.157.87:32771/api/v1/categories");
       const data = await res.json();

       // Handle various possible shapes from backend:
       // - { categories: [...] }
       // - { data: [...] }
       // - [...] (array directly)
       // - { results: [...] }
       let cats = [];
       if (Array.isArray(data)) {
         cats = data;
       } else if (Array.isArray(data.categories)) {
         cats = data.categories;
       } else if (Array.isArray(data.data)) {
         cats = data.data;
       } else if (Array.isArray(data.results)) {
         cats = data.results;
       } else {
         // if the API returned a single object or empty, fall back to empty array
         cats = [];
       }

       // Normalize each category to have id, name, link, image_url (if possible)
       const normalized = cats.map((c, i) => ({
         id: c.id ?? c.category_id ?? i,
         name: c.name ?? c.label ?? c.title ?? `Category ${i + 1}`,
         link: c.link ?? `/shop/${c.id ?? i}`,
         image_url: c.image_url ?? c.image ?? c.icon_url ?? null,
         raw: c,
       }));

       // fallback: if no categories found, keep empty and let UI show default cats
       setCategories(normalized);
     } catch (error) {
       console.error("Error fetching categories:", error);
       setCatsError("Failed to load categories");
       setCategories([]); // ensure it's an array
     } finally {
       setCatsLoading(false);
     }
   };
   fetchCategories();
 }, []);

 const handleBookClick = (index) => {
   setActiveIndex(prevIndex => (prevIndex === index ? null : index));
 };

 // Fallback static categories (used if API returns no categories)
 const fallbackCats = [
   { id: 'books', name: 'BOOKS', color: 'bg-orange-500', link: '/' },
   { id: 'lifestyle', name: 'LIFESTYLE', color: 'bg-gray-500', link: '/' },
   { id: 'gifts', name: 'GIFT ITEMS', color: 'bg-orange-500', link: '/' },
   { id: 'audio', name: 'AUDIO-VISUALS', color: 'bg-gray-500', link: '/' },
   { id: 'shop', name: 'SHOP', color: 'bg-orange-500', link: '/' },
 ];

 // choose categories to render: API ones (if available) else fallback
 const catsToRender = categories.length > 0 ? categories : fallbackCats;

 return (
    <section className="md:px-4 md:shadow-lg">   
        <div className="sm:px-6 md:px-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg ">
                {/* Categories (updated) */}
                {/* Categories */}
<div className="overflow-x-auto bg-white shadow-lg scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent">
  <div className="flex space-x-6 px-4 py-6 min-w-max items-center">
    {catsLoading ? (
      Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="w-36 h-24 rounded-md bg-gray-100 animate-pulse" />
      ))
    ) : (
      catsToRender.map((cat, idx) => (
        <Link
          key={cat.id ?? idx}
          to={cat.link || "/"}
          className="flex flex-col items-center justify-center px-6 py-4 rounded-md text-center min-w-[120px] hover:bg-orange-50 transition"
        >
          {cat.image_url ? (
            <div className="w-14 h-14 mb-2 rounded-full overflow-hidden bg-gray-100 shadow-sm">
              <img
                src={cat.image_url}
                alt={cat.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/80x80/CCCCCC/000000?text=?';
                }}
              />
            </div>
          ) : (
            <div
              className="w-14 h-14 mb-2 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
              style={{ backgroundColor: "#F97316" }}
            >
              {String(cat.name || "C").charAt(0).toUpperCase()}
            </div>
          )}
          <p className="font-semibold text-sm text-gray-700">{cat.name}</p>
        </Link>
      ))
    )}
  </div>
</div>

{/* Custom thin scrollbar */}
<style>
  {`
    .scrollbar-thin::-webkit-scrollbar {
      height: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: #f97316; /* Tailwind orange-500 */
      border-radius: 4px;
    }
    .scrollbar-thin {
      scrollbar-color: #f97316 transparent; /* Firefox support */
      scrollbar-width: thin;
    }
  `}
</style>


                {/* Latest News */} 
                <div className="py-8">
                    <h2 className="text-center text-2xl font-semibold text-gray-700">
                        Latest News
                    </h2>
                    <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8 gap-8">
                        <div className="relative flex justify-center items-center min-64 md:w-1/2">
                            <img
                                src={rashford}
                                alt="New Book Sales"
                                className="w-64 h-auto justify-center items-center"
                            />
                            <div className="absolute bottom-4 left-1/3 w-64 bg-black/80 text-white px-4 py-4">
                                <h3 className="text-lg font-semibold uppercase">New Book Sales</h3>
                                <p className="text-sm">Get new books for half of the price</p>
                            </div>
                        </div>

                        <div className="md:w-1/2 w-full flex flex-col gap-6 p-2">
                        {[
                            {
                            date: ['Jul', '19'],
                            title: 'The Art of the Short Story',
                            meta: 'Design / Fiction / Marketing / Photography',
                            excerpt:
                                'ac pretium tellus erat at sapien. Duis vitae vehicula libero...',
                            },
                            {
                            date: ['Mar', '31'],
                            title: 'Novels that sharpen your mind',
                            meta: 'Design / Fiction / Marketing / Photography',
                            excerpt:
                                'Nulla eleifend vel risus eget . Praesent sed tortor...',
                            },
                            {
                            date: ['Mar', '31'],
                            title: 'Collection of Poems',
                            meta: 'Design / Fiction / Marketing',
                            excerpt:
                                'Nulla eleifend vel risus eget ultricies. Praesent sed tortor...',
                            },
                        ].map((news, idx) => (
                            <div key={idx} className="flex gap-4">
                            <div className="min-w-[60px] bg-orange-600 text-white rounded-md px-3 py-2 text-center font-bold">
                                <p className="text-sm">{news.date[0]}</p>
                                <p className="text-lg leading-tight">{news.date[1]}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-800 font-semibold text-base sm:text-lg">{news.title}</h4>
                                <p className="text-sm text-gray-500">{news.meta}</p>
                                <p className="text-sm text-gray-600 mt-1">{news.excerpt}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Book Collection */}
            <div
              className="flex flex-col items-center justify-center py-6 px-6"
              style={{ backgroundColor: "#FEEFE9" }}
            >
              <h2 className="text-2xl font-semibold text-gray-700">Book Collection</h2>
              <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-6">
                {collection.map((book, index) => (
                  <div
                    key={index}
                    className="relative shadow-lg rounded overflow-hidden group cursor-pointer"
                    onClick={() => handleBookClick(index)}
                  >
                    <div className="w-full h-60 overflow-hidden">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div
                      className={`
                        absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-4
                        transition-opacity duration-300 ease-in-out
                        ${activeIndex === index ? "opacity-100" : "opacity-0"}
                        lg:group-hover:opacity-100
                      `}
                    >
                      <a
                        href="#"
                        className="text-lg font-bold text-gray-800 hover:text-orange-500 text-center"
                      >
                        {book.title}
                      </a>
                      <p className="text-lg font-semibold text-gray-800 text-center">
                        {book.description}
                      </p>
                      <p className="text-sm text-gray-600 line-through mt-2">
                        {book.oldPrice}
                      </p>
                      <p className="text-xl font-bold text-orange-500">{book.price}</p>
                      <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Products */}
            <div className="min-h-screen p-8 bg-white">
                <header className="text-center mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Featured Products</h2>
                    <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>           
        </div>
    </section>
  );
};

export default NewsSection;
