import React from "react";

const cards = [
  {
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    title: "Adult Book Clubs",
    desc: "Join a group that explores literature, devotionals, and faith-based discussions every Sunday.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    title: "Children Book Clubs",
    desc: "Dive into imaginative worlds and discuss your favorite fiction with like-minded readers every weekend.",
  },
];

function BlogSection() {
  return (
    <div className="bg-white py-12 px-4">
      <h2 className="text-2xl text-center font-semibold text-gray-700">Book Clubs</h2>
          <div className="w-16 border-t-2 border-orange-300 mx-auto mb-5 my-3"></div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-100 shadow-sm rounded-lg max-w-sm w-full flex flex-col hover:shadow-lg transition duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="h-56 w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <h3 className="text-lg font-semibold text-orange-500 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6">{card.desc}</p>
              <button className="mt-auto bg-orange-500 text-white px-5 py-2 rounded transition hover:bg-orange-600">
                Join Our Book Club
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogSection;
