import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg"; // dummy image

const SubCategories = () => {
  const { id } = useParams(); // category id from URL
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`http://41.78.157.87:32771/api/v1/categories/${id}/subcategories`);
        const data = await res.json();
        setSubCategories(data?.subcategories || []); // ✅ depends on your API response
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-orange-500 text-center mb-6">
        SUB-CATEGORIES
      </h1>

      {subCategories.length === 0 ? (
        <p className="text-center text-gray-600">No subcategories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {subCategories.map((sub) => (
            <Link
              key={sub.id}
              to={`/subcategories/${sub.id}`} // ✅ link to products later
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={placeholderImg}
                alt={sub.name}
                className="w-full h-32 object-cover rounded-md mb-3"
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
