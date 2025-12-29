import React from "react";

const CompanyLogo = () => {
  const words = [
    "ACCESS SALES INTL.",
    "BIBLE SOCIETY OF NIGERIA",
    "DAYSPRING CARDS",
    "GOSHEN GREENLAND LIMITED",
    "PORTOBELLO",
  ];

  return (
    <div className="w-full overflow-hidden bg-white py-16">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex animate-marquee items-center whitespace-nowrap">
          
          {[...words, ...words].map((word, index) => (
            <span
              key={index}
              className="mx-12 text-lg md:text-xl font-semibold tracking-wide text-gray-500
                         transition-all duration-300 ease-out
                         hover:scale-105 hover:text-transparent
                         hover:bg-clip-text hover:bg-gradient-to-r
                         hover:from-orange-400 hover:to-pink-500"
            >
              {word}
            </span>
          ))}

        </div>
      </div>
    </div>
  );
};

export default CompanyLogo;
