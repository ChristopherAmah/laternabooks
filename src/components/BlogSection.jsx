import React, { useState } from "react";

const tabs = [
  { id: 1, label: "LATEST BOOKS" },
  { id: 2, label: "BEST SELLING BOOKS" },
  { id: 3, label: "RECENT BOOKS" },
];

const cards = [
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b", // Replace with your actual image
    title: "The Art Of The Short Story",
    desc: "ac pretium tellus erat at sapien. Duis vitae vehicula libero. Vivamus vitae scelerisque ante. Etiam facilisis iaculis rutrum. Quisque id volutpat...",
  },
  {
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794", // Replace with your actual image
    title: "Nouels That Sharpen Your Mind",
    desc: "Nulla eleifend vel risus eget ultricies. Praesent sed tortor sem. Vestibulum elementum;",
  },
  {
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794", // Replace with your actual image
    title: "Boost Your Creatvie Process",
    desc: "Nulla eleifend vel risus eget ultricies. Praesent sed tortor sem. Vestibulum elementum;",
  },
];

function BlogSection() {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Latest From Our Blog
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 text-gray-700 font-semibold focus:outline-none transition
              ${
                selectedTab === tab.id
                  ? "border-b-2 border-orange-500 text-black"
                  : "text-gray-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white border-none shadow rounded-md max-w-xs w-full flex flex-col hover:shadow-lg transition duration-300"
          >
            <div className="overflow-hidden">
                <img
              src={card.image}
              alt={card.title}
              className="h-48 w-full object-cover rounded-t-md transition-transform duration-300 hover:scale-110"
            />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{card.desc}</p>
              <button className="mt-auto bg-orange-500 text-white px-5 py-2 rounded transition hover:bg-orange-600">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogSection;
