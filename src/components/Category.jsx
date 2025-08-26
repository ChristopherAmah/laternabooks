import React, { useRef } from 'react';
// If using react-router-dom, replace <a> with <Link> and import Link.
import dreamcount from '../assets/dreamcount.jpeg';
import guitar from '../assets/guitar.jpg';

const App = () => {
  const categories = [
    {
      title: "Discover pre-loved designer jewelry",
      items: [
        { name: "Cartier", img: dreamcount },
        { name: "Van Cleef", img: guitar },
        { name: "Hermès", img: dreamcount },
        { name: "Chanel", img: guitar },
      ],
      link: "Shop Luxury Stores",
    },
    {
      title: "Save 15% on designer handbags",
      items: [
        { name: "Louis Vuitton", img: dreamcount },
        { name: "Hermès", img: dreamcount },
        { name: "Dior", img: dreamcount},
        { name: "Saint Laurent", img: dreamcount},
      ],
      link: "Shop the pre-loved sale",
    },
    {
      title: "Trending: Fall Beauty",
      items: [
        { name: "Velvet skin", img: dreamcount },
        { name: "Healthy hair", img: dreamcount },
        { name: "Luxe body care", img: dreamcount },
        { name: "Metallic hues", img: dreamcount },
      ],
      link: "Shop more beauty",
    },
    {
      title: "Discover Everyday Essentials",
      items: [
        { name: "Wellness", img: guitar },
        { name: "Cleaning supplies", img: guitar },
        { name: "Fall flavors", img: guitar },
        { name: "All deals", img: guitar },
      ],
      link: "Shop more everyday essentials",
    },
  ];

  const bestSellers = [
    { name: "USB-C Cables & Chargers", img: guitar },
    { name: "HP Printer", img: guitar, badge: "3 MONTHS INSTANT INK INCLUDED" },
    { name: "Epson EcoTank Printer", img: guitar },
    { name: "Epson Ink Bottles", img: guitar },
    { name: "PaperNano Film", img: guitar, badge: "PencilTip Friendly" },
    { name: "iPad with Pencil", img: guitar },
    { name: "Samsung 990 EVO Plus 2TB", img: guitar },
    { name: "Wireless Mouse", img: guitar },
    { name: "External Hard Drive", img: guitar },
    { name: "Keyboard", img: guitar},
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  const formatLink = (text) =>
    text.toLowerCase().replace(/\s+/g, "-"); // turn names into slugs

  return (
    <div className="min-h-screen bg-gray-100 mt-[-300px]">
      {/* Categories Section */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1200x600')",
            zIndex: 0,
          }}
        ></div>
        <main className="relative grid grid-cols-1 md:grid-cols-4 gap-4 p-4 z-10">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-4 shadow rounded relative">
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {category.items.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="text-center">
                      <a href={`/category/${formatLink(item.name)}`}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-24 object-cover mb-2 hover:opacity-80"
                        />
                        <p className="text-sm hover:underline">{item.name}</p>
                      </a>
                    </div>
                  ))}
                </div>
                <a
                  href={`/category/${formatLink(category.link)}`}
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  {category.link}
                </a>
              </div>
            </div>
          ))}
        </main>
      </div>
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1200x600')",
            zIndex: 0,
          }}
        ></div>
        <main className="relative grid grid-cols-1 md:grid-cols-4 gap-4 p-4 z-10">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-4 shadow rounded relative">
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {category.items.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="text-center">
                      <a href={`/category/${formatLink(item.name)}`}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-24 object-cover mb-2 hover:opacity-80"
                        />
                        <p className="text-sm hover:underline">{item.name}</p>
                      </a>
                    </div>
                  ))}
                </div>
                <a
                  href={`/category/${formatLink(category.link)}`}
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  {category.link}
                </a>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Best Sellers Section */}
      <section className="bg-white p-4 shadow rounded mb-4 relative">
        <h2 className="text-xl font-semibold mb-4">
          Best Sellers in Computers & Accessories
        </h2>
        <div className="flex items-center">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &lt;
          </button>
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide w-full"
          >
            {bestSellers.map((item, index) => (
              <div
                key={index}
                className="inline-block text-center min-w-[140px]"
              >
                <a href={`/product/${formatLink(item.name)}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-32 h-32 object-cover mx-auto mb-2 hover:opacity-80"
                  />
                  {item.badge && (
                    <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded block mb-1">
                      {item.badge}
                    </span>
                  )}
                  <p className="text-sm mt-1 hover:underline">{item.name}</p>
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll(1)}
            className="absolute right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </section>
      <section className="bg-white p-4 shadow rounded mb-4 relative">
        <h2 className="text-xl font-semibold mb-4">
          Best Sellers in Computers & Accessories
        </h2>
        <div className="flex items-center">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &lt;
          </button>
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide w-full"
          >
            {bestSellers.map((item, index) => (
              <div
                key={index}
                className="inline-block text-center min-w-[140px]"
              >
                <a href={`/product/${formatLink(item.name)}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-32 h-32 object-cover mx-auto mb-2 hover:opacity-80"
                  />
                  {item.badge && (
                    <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded block mb-1">
                      {item.badge}
                    </span>
                  )}
                  <p className="text-sm mt-1 hover:underline">{item.name}</p>
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll(1)}
            className="absolute right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </section>

      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1200x600')",
            zIndex: 0,
          }}
        ></div>
        <main className="relative grid grid-cols-1 md:grid-cols-4 gap-4 p-4 z-10">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-4 shadow rounded relative">
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {category.items.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="text-center">
                      <a href={`/category/${formatLink(item.name)}`}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-24 object-cover mb-2 hover:opacity-80"
                        />
                        <p className="text-sm hover:underline">{item.name}</p>
                      </a>
                    </div>
                  ))}
                </div>
                <a
                  href={`/category/${formatLink(category.link)}`}
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  {category.link}
                </a>
              </div>
            </div>
          ))}
        </main>
      </div>
      

      <section className="bg-white p-4 shadow rounded mb-4 relative">
        <h2 className="text-xl font-semibold mb-4">
          Best Sellers in Computers & Accessories
        </h2>
        <div className="flex items-center">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &lt;
          </button>
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide w-full"
          >
            {bestSellers.map((item, index) => (
              <div
                key={index}
                className="inline-block text-center min-w-[140px]"
              >
                <a href={`/product/${formatLink(item.name)}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-32 h-32 object-cover mx-auto mb-2 hover:opacity-80"
                  />
                  {item.badge && (
                    <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded block mb-1">
                      {item.badge}
                    </span>
                  )}
                  <p className="text-sm mt-1 hover:underline">{item.name}</p>
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll(1)}
            className="absolute right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </section>
      <section className="bg-white p-4 shadow rounded mb-4 relative">
        <h2 className="text-xl font-semibold mb-4">
          Best Sellers in Computers & Accessories
        </h2>
        <div className="flex items-center">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &lt;
          </button>
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide w-full"
          >
            {bestSellers.map((item, index) => (
              <div
                key={index}
                className="inline-block text-center min-w-[140px]"
              >
                <a href={`/product/${formatLink(item.name)}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-32 h-32 object-cover mx-auto mb-2 hover:opacity-80"
                  />
                  {item.badge && (
                    <span className="bg-purple-200 text-purple-800 text-xs font-semibold px-2 py-1 rounded block mb-1">
                      {item.badge}
                    </span>
                  )}
                  <p className="text-sm mt-1 hover:underline">{item.name}</p>
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll(1)}
            className="absolute right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </section>

       <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1200x600')",
            zIndex: 0,
          }}
        ></div>
        <main className="relative grid grid-cols-1 md:grid-cols-4 gap-4 p-4 z-10">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-4 shadow rounded relative">
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {category.items.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="text-center">
                      <a href={`/category/${formatLink(item.name)}`}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-24 object-cover mb-2 hover:opacity-80"
                        />
                        <p className="text-sm hover:underline">{item.name}</p>
                      </a>
                    </div>
                  ))}
                </div>
                <a
                  href={`/category/${formatLink(category.link)}`}
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  {category.link}
                </a>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;
