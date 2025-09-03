import React, { useRef } from 'react';
import dreamcount from '../assets/dreamcount.jpeg';
import guitar from '../assets/guitar.jpg';

const App = () => {
  const categories = [
    {
      title: "Discover Great Books",
      items: [
        { name: "Audio Books", img: dreamcount },
        { name: "Bibles", img: guitar },
        { name: "Bible references", img: dreamcount },
        { name: "Business Books", img: guitar },
      ],
      link: "Shop Books",
    },
    {
      title: "Save 15% on Gift Items",
      items: [
        { name: "Gift Wraps", img: dreamcount },
        { name: "Greeting cards", img: dreamcount },
        { name: "Journals ", img: dreamcount},
        { name: "Wall Decor", img: dreamcount},
      ],
      link: "Shop Gift Items",
    },
    {
      title: "Trending: Lifestyle",
      items: [
        { name: "Christioan Movies", img: dreamcount },
        { name: "Fragrances", img: dreamcount },
        { name: "Life & Style", img: dreamcount },
        { name: "Metallic hues", img: dreamcount },
      ],
      link: "Shop Lifestyle",
    },
    {
      title: "Discover Audio-Visuals",
      items: [
        { name: "Movies", img: guitar },
        { name: "Messages", img: guitar },
        { name: "Music & Videos", img: guitar },
        { name: "Musical Instruments", img: guitar },
      ],
      link: "Shop more Audio-Visuals",
    },
  ];

  const bestSellers = [
    { name: "USB-C Cables & Chargers", img: guitar },
    { name: "HP Printer", img: guitar, badge: "3 MONTHS INSTANT INK INCLUDED" },
    { name: "Epson EcoTank Printer", img: guitar },
    { name: "Epson Ink Bottles", img: guitar },
    { name: "Stationery", img: guitar, badge: "PencilTip Friendly" },
    { name: "iPad with Pencil", img: guitar },
    { name: "Samsung 990 EVO Plus 2TB", img: guitar },
    { name: "Wireless Mouse", img: guitar },
    { name: "Guitar", img: guitar },
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
                      <a href={`/products/`}>
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
                  href={`/products/`}
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
                      <a href={`/products/`}>
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
                  href={`/produts/`}
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
                <a href={`/products/`}>
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
                <a href={`profucts//`}>
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
                      <a href={`/products/`}>
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
                  href={`/products/`}
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
                <a href={`/products/`}>
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
                <a href={`/products/`}>
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
                      <a href={`/products/`}>
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
                  href={`/products/`}
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
