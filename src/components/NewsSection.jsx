import React from 'react';
import dreamCount from '../assets/dreamcount.jpeg'
import business from '../assets/business.jpg'

const books = [
    { title: "Vintage - The Art of Poster", image: dreamCount },
    { title: "Lorem Ipsum", image: dreamCount },
    { title: "Organization", image: dreamCount },
    { title: "Recipes", image: dreamCount },
    { title: "Vintage - The Art of Poster", image: dreamCount },
    { title: "Bloodstorm - Heart of Vampire", image: dreamCount },
    { title: "Your Next!", image: dreamCount },
    { title: "Opportunities", image: dreamCount },
    { title: "Bloodstorm - Heart of Vampire", image: dreamCount },
    { title: "Bloodstorm - Heart of Vampire", image: dreamCount },
];
const products = [
  {
    id: 1,
    image: 'https://placehold.co/200x300/F5DEB3/000000?text=Vintage', // Placeholder for Vintage poster
    title: 'Corporate',
    rating: 5,
    originalPrice: '$100.00',
    salePrice: '$80.00',
    onSale: true,
  },
  {
    id: 2,
    image: 'https://placehold.co/200x300/ADD8E6/000000?text=Habbits', // Placeholder for Habbits poster
    title: 'Habbits',
    rating: 5,
    originalPrice: '$100.00',
    salePrice: null, // Not on sale
    onSale: false,
  },
  {
    id: 3,
    image: 'https://placehold.co/200x300/000000/FFFFFF?text=Your+Design', // Placeholder for The Devils poster
    title: 'The Devils',
    rating: 5,
    originalPrice: '$400.00',
    salePrice: '$280.00',
    onSale: true,
  },
  {
    id: 4,
    image: 'https://placehold.co/200x300/FFA500/000000?text=The+Secret', // Placeholder for The Secret poster
    title: 'The Secret',
    rating: 5,
    originalPrice: '$80.00',
    salePrice: '$120.00', // Assuming this is a price range or a typo in the image
    onSale: true,
  },
];

// Star Rating Component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    );
  }
  return <div className="flex">{stars}</div>;
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4">
      {product.onSale && (
        <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold p-3 rounded-full">
          Sale!
        </span>
      )}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-auto object-cover rounded-md mb-4"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x300/CCCCCC/000000?text=Image+Error'; }}
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
      <StarRating rating={product.rating} />
      <div className="flex items-center mt-2">
        {product.originalPrice && product.salePrice && (
          <span className="text-gray-500 line-through mr-2">{product.originalPrice}</span>
        )}
        {product.salePrice && (
          <span className="text-orange-500 font-bold">{product.salePrice}</span>
        )}
        {!product.onSale && product.originalPrice && (
          <span className="text-orange-500 font-bold">{product.originalPrice}</span>
        )}
      </div>
    </div>
  );
};



const NewsSection = () => {
  return (
    <section className='px-4 shadow-lg'>   
        <div className="sm:px-6 lg:px-10 px-12">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg ">
                {/* Categories */}
                <div className="flex text-white overflow-hidden shadow-lg">
                    {[
                        { icon: 'fa-heart', label: 'Love & Romance', bg: 'bg-orange-500' },
                        { icon: 'fa-utensils', label: 'Cooking & Food', bg: 'bg-gray-500' },
                        { icon: 'fa-desktop', label: 'Computer', bg: 'bg-orange-500' },
                        { icon: 'fa-book', label: 'Crime Books', bg: 'bg-gray-500' },
                        { icon: 'fa-building', label: 'Business', bg: 'bg-orange-500' },
                    ].map((cat, idx) => (
                        <div
                        key={idx}
                        className={`flex-1 text-center py-6 transition-colors duration-300 ${cat.bg}`}
                        >
                        <i
                            className={`fas ${cat.icon} text-2xl block mb-1 transition-transform duration-500 hover:rotate-[360deg]`}
                        />
                        <p className="font-semibold">{cat.label}</p>
                        </div>
                    ))}
                </div>






                {/* Latest News */} 
                <div className="py-8">
                    <h2 className="text-center text-2xl font-semibold text-gray-700">
                        Latest News
                    </h2>
                    <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>

                    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8 gap-8">
                        {/* Left Image */}
                        <div className="relative flex-1 min-64 px-5">
                            <img
                                src={dreamCount}
                                alt="New Book Sales"
                                className="w-64 justify-center items-center"
                            />
                            <div className="absolute bottom-0 left-0 w-64 ml-8 bg-black/70 text-white p-8">
                                <h3 className="text-lg font-semibold">New Book Sales</h3>
                                <p className="text-sm">Get new books for half of the price</p>
                            </div>
                        </div>

                        {/* Right News List */}
                        <div className="flex-1 min-w-[300px] flex flex-col gap-6">
                        {[
                            {
                            date: ['Jul', '19'],
                            title: 'The Art of the Short Story',
                            meta: 'Design / Fiction / Marketing / Photography',
                            excerpt:
                                'ac pretium tellus erat at sapien. Duis vitae vehicula libero...',
                            },
                            {
                            date: ['Mar', '31'],
                            title: 'Novels that sharpen your mind',
                            meta: 'Design / Fiction / Marketing / Photography',
                            excerpt:
                                'Nulla eleifend vel risus eget ultricies. Praesent sed tortor...',
                            },
                            {
                            date: ['Mar', '31'],
                            title: 'Collection of Poems',
                            meta: 'Design / Fiction / Marketing',
                            excerpt:
                                'Nulla eleifend vel risus eget ultricies. Praesent sed tortor...',
                            },
                        ].map((news, idx) => (
                            <div key={idx} className="flex gap-4">
                            <div className="bg-orange-600 text-white rounded-md px-3 py-2 text-center font-bold">
                                <p className="text-sm">{news.date[0]}</p>
                                <p className="text-lg">{news.date[1]}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-800 font-semibold">{news.title}</h4>
                                <p className="text-sm text-gray-500">{news.meta}</p>
                                <p className="text-sm text-gray-600 mt-1">{news.excerpt}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                
                </div>
            </div>






            {/* Book Collection */}
            <div className="flex flex-col items-center justify-center py-6 px-6" style={{ backgroundColor: '#FEEFE9' }}>
            <h2 className="text-2xl font-semibold text-gray-700">Book Collection</h2>
            <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-6">
                {/* Book 1 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 1" className="w-full h-auto object-cover" />
                </div>

                {/* Book 2 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 2" className="w-full h-auto object-cover" />
                </div>

                {/* Book 3 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 3" className="w-full h-auto object-cover" />
                </div>

                {/* Book 4 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 4" className="w-full h-auto object-cover" />
                </div>

                {/* Book 5 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 5" className="w-full h-auto object-cover" />
                </div>

                {/* Book 6 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 6" className="w-full h-auto object-cover" />
                </div>

                {/* Book 7 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 7" className="w-full h-auto object-cover" />
                </div>

                {/* Book 8 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 8" className="w-full h-auto object-cover" />
                </div>

                {/* Book 9 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 9" className="w-full h-auto object-cover" />
                </div>

                {/* Book 10 */}
                <div className="shadow-lg rounded overflow-hidden">
                <img src={dreamCount} alt="Book 10" className="w-full h-auto object-cover" />
                </div>
            </div>
            </div>







            {/* Featured Products */}
            <div className="min-h-screen p-8 bg-white">
                <header className="text-center mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Featured Products</h2>
                    <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>





            <section className="py-12">
            {/* Section 1: Amazing Collections */}
            <div className="flex flex-col lg:flex-row justify-center items-start bg-white w-full gap-6 px-4">
                {/* Left: Image Categories */}
                <div className="flex flex-col items-center flex-1 p-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Amazing Collection</h2>
                <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>

                <div className="flex flex-wrap justify-center gap-4">
                    {/* Category 1 */}
                    <div className="text-center">
                    <p className="text-lg font-medium text-gray-500 mb-2">Cooking Style</p>
                    <div className="border-gray-500 p-2 shadow-md">
                        <img src={dreamCount} alt="Cooking" className="w-40 h-40 object-contain" />
                    </div>
                    </div>

                    {/* Category 2 */}
                    <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Just Listen</h3>
                    <div className="border-gray-500 p-2 shadow-md">
                        <img src={business} alt="Just Listen" className="w-40 h-40 object-contain" />
                    </div>
                    </div>
                </div>
                </div>

                {/* Right: Book Detail */}
                <div className="flex flex-col md:flex-row items-center flex-1 bg-[#FEEFE9] p-4 w-full gap-6">
                <div className="w-48 shrink-0">
                    <img src={dreamCount} alt="Free Fall" className="w-48 mb-4 shadow" />
                </div>

                <div className="flex-1 w-full">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Free Fall</h3>

                    <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="line-through text-gray-500">$100.00</span>
                    <span className="text-xl font-bold text-gray-700">$80.00</span>
                    <span className="bg-gray-800 text-white text-sm px-2 py-1 ml-auto">New</span>
                    </div>

                    <p className="text-gray-600 font-medium mb-2">Details :</p>

                    <table className="border w-full text-left text-gray-700 text-sm">
                    <thead>
                        <tr className="border">
                        <th className="p-2 text-center font-medium" colSpan="2">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                        <td className="p-2">Name</td>
                        <td className="p-2">My Life</td>
                        </tr>
                        <tr className="border">
                        <td className="p-2">ISBN-10</td>
                        <td className="p-2">0553213873</td>
                        </tr>
                        <tr className="border">
                        <td className="p-2">Language</td>
                        <td className="p-2">English</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>

            {/* Section 2: New Collections */}
            <div className="flex flex-col lg:flex-row-reverse justify-center items-start bg-white py-12 gap-6 px-4">               
                {/* Left: Image Categories */}
                <div className="flex flex-col items-center flex-1">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2 mt-6">New Collection</h2>
                <div className="w-16 border-t-2 border-orange-300 mx-auto my-3"></div>

                <div className="flex flex-wrap justify-center gap-4">
                    {/* Category 1 */}
                    <div className="text-center">
                    <p className="text-lg font-medium text-gray-500 mb-2">Cooking Style</p>
                    <div className="border-gray-500 p-2 shadow-md">
                        <img src={dreamCount} alt="Cooking" className="w-40 h-40 object-contain" />
                    </div>
                    </div>

                    {/* Category 2 */}
                    <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Just Listen</h3>
                    <div className="border-gray-500 p-2 shadow-md">
                        <img src={business} alt="Just Listen" className="w-40 h-40 object-contain" />
                    </div>
                    </div>
                </div>
                </div>

                {/* Right: Book Detail */}
                <div className="flex flex-col md:flex-row items-center flex-1 bg-[#FEEFE9] p-4 w-full gap-6">
                <div className="w-48 shrink-0">
                    <img src={dreamCount} alt="Free Fall" className="w-48 mb-4 shadow" />
                </div>

                <div className="flex-1 w-full">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Free Fall</h3>

                    <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="line-through text-gray-500">$100.00</span>
                    <span className="text-xl font-bold text-gray-700">$80.00</span>
                    <span className="bg-gray-800 text-white text-sm px-2 py-1 ml-auto">New</span>
                    </div>

                    <p className="text-gray-600 font-medium mb-2">Details :</p>

                    <table className="border w-full text-left text-gray-700 text-sm">
                    <thead>
                        <tr className="border">
                        <th className="p-2 text-center font-medium" colSpan="2">Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border">
                        <td className="p-2">Name</td>
                        <td className="p-2">My Life</td>
                        </tr>
                        <tr className="border">
                        <td className="p-2">ISBN-10</td>
                        <td className="p-2">0553213873</td>
                        </tr>
                        <tr className="border">
                        <td className="p-2">Language</td>
                        <td className="p-2">English</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </section>


            
        </div>
    </section>
  );
};

export default NewsSection;
