import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg";

const SubCategories = () => {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch("https://laternaerp.smerp.io/api/v1/subcategories");
        const data = await res.json();

        // Find the selected category
        const selectedCategory = data.find(
          (cat) => cat.id === parseInt(id)
        );

        setCategoryName(selectedCategory?.name || "Unknown Category");

        // Get its children (subcategories)
        const children = selectedCategory?.children || [];
        setSubCategories(children);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-orange-600">
        Loading subcategories...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-orange-600 sm:mb-10 sm:text-3xl">
        {categoryName} Subcategories
      </h1>

      {subCategories.length === 0 ? (
        <p className="text-center text-gray-500">
          No subcategories found under this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {subCategories.map((sub) => (
            <Link 
              key={sub.id}
              to={`/products/${sub.id}`}
              className="overflow-hidden rounded-xl bg-white p-3 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5"
            >
              <img
                src={`https://laternaerp.smerp.io/web/image/product.public.category/${sub.id}/image_1920`}
                alt={sub.name}
                className="mb-3 h-24 w-full object-cover sm:mb-4 sm:h-40"
                onError={(e) => (e.target.src = placeholderImg)}
              />
              <h2 className="text-lg font-semibold text-orange-500">
                {sub.name}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategories;
