import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import placeholderImg from "../assets/guitar.jpg"; // fallback image

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://41.78.157.87:32771/api/v1/categories");
        const data = await res.json();
        setCategories(data?.categories || []); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-orange-500 text-center mb-6">
        CATEGORIES
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop/${category.id}`} 
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={`http://41.78.157.87:32771/web/image/product.public.category/${category.id}/image_1920`} 
              alt={category.name}
              className="w-full h-32 object-cover rounded-md mb-3"
              onError={(e) => (e.target.src = placeholderImg)} // fallback
            />
            <h2 className="text-lg font-semibold text-orange-500">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;
