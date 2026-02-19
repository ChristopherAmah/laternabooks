// src/pages/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://laternaerp.smerp.io/api/v1/categories"); 
        
        console.log("API response:", res.data);

        if (res.data && Array.isArray(res.data)) {
          setCategories(res.data);
        } else if (res.data.categories) {
          setCategories(res.data.categories);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="p-4">Loading categories...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white shadow rounded p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{cat.name}</h2>
              {cat.description && (
                <p className="text-gray-600 mt-2">{cat.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
