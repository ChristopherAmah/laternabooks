// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import placeholderImg from "../assets/guitar.jpg"; // fallback image

// const SubCategories = () => {
//   const { id } = useParams(); // category id from URL
//   const [subCategories, setSubCategories] = useState([]);

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       try {
//         const res = await fetch("http://41.78.157.87:32771/api/subcategories");
//         const data = await res.json();

//         // ✅ filter by category id if your API doesn’t auto-filter
//         const filtered = id
//           ? data.filter((sub) => sub.category_id === parseInt(id))
//           : data;

//         setSubCategories(filtered);
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     };

//     fetchSubCategories();
//   }, [id]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold text-orange-500 text-center mb-6">
//         SUB-CATEGORIES
//       </h1>

//       {subCategories.length === 0 ? (
//         <p className="text-center text-gray-600">No subcategories found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {subCategories.map((sub) => (
//             <Link
//               key={sub.id}
//               to={`/subcategories/${sub.id}`} // ✅ link to products later
//               className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={sub.image_url || placeholderImg} // ✅ show image if API has it
//                 alt={sub.name}
//                 className="w-full h-32 object-cover rounded-md mb-3"
//               />
//               <h2 className="text-lg font-semibold text-orange-500">
//                 {sub.name}
//               </h2>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubCategories;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg";

const SubCategories = () => {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch("http://41.78.157.87:32771/api/v1/subcategories");
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-10">
        {categoryName} Subcategories
      </h1>

      {subCategories.length === 0 ? (
        <p className="text-center text-gray-500">
          No subcategories found under this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {subCategories.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-center p-5"
            >
              <img
                src={`http://41.78.157.87:32771/web/image/product.public.category/${sub.id}/image_1920`}
                alt={sub.name}
                className="w-full h-40 object-cover mb-4"
                onError={(e) => (e.target.src = placeholderImg)}
              />
              <h2 className="text-lg font-semibold text-orange-500">
                {sub.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategories;
