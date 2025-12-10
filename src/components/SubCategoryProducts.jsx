import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg";

const SubCategoryProducts = () => {
  const { subcategoryId } = useParams(); // correct param name
  const [products, setProducts] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/category?category_id=${subcategoryId}`
        );
        const data = await res.json();

        setSubcategoryName(data?.category?.name || "Subcategory");
        setProducts(data?.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategoryId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-orange-600">
        Loading products...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-10">
        {subcategoryName} Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">
          No products found in this subcategory.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition-all p-5"
            >
              <img
                src={`http://41.78.157.87:32771${product.image_url}`}
                onError={(e) => (e.target.src = placeholderImg)}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />

              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>

              <p className="text-orange-600 font-bold mt-2">
                ₦{product.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategoryProducts;
