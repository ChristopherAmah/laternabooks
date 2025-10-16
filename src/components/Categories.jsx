import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://41.78.157.87:32771/api/v1/subcategories");
        const data = await res.json();

        // Only keep main categories (those with parent_id === false)
        const mainCategories = data.filter((cat) => cat.parent_id === false);
        setCategories(mainCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-10">
        Categories
      </h1>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`} // navigates to subcategories
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <img
                src={`http://41.78.157.87:32771/web/image/product.public.category/${category.id}/image_1920`}
                alt={category.name}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = placeholderImg)}
              />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-orange-500 mb-2">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-600">Click to view subcategories</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
