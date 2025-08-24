import React from "react";

const CompanyLogo = () => {
  const words = ["ACCESS SALES INTL.", "BIBLE SOCIETY OF NIGERIA", "DAYSPRING CARDS", "GOSHEN GREENLAND LIMITED", "PORTOBELLO"];

  return (
    <div className="w-full overflow-hidden container mx-auto py-20 gap-8 sm:px-6 lg:px-8 flex sm:flex-row flex-col sm:items-center items-start">
      <div className="flex animate-marquee whitespace-nowrap">
        {words.map((word, index) => (
          <span
            key={index}
            className="mx-12 text-2xl font-semibold text-gray-600 opacity-70 
                       transition-all duration-300 
                       hover:opacity-100 hover:text-3xl hover:font-bold 
                       hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500"
          >
            {word}
          </span>
        ))}

        {/* duplicate words for seamless marquee effect */}
        {words.map((word, index) => (
          <span
            key={`duplicate-${index}`}
            className="mx-12 text-2xl font-semibold text-gray-600 opacity-70 
                       transition-all duration-300 
                       hover:opacity-100 hover:text-3xl hover:font-extrabold 
                       hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CompanyLogo;
