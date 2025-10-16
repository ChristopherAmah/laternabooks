import React from "react";
import aboutImage from "../assets/hero8.jpg"; // Replace with your actual image path

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative  py-12">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold text-orange-600 text-center">
            About Us
          </h1>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={aboutImage}
            alt="LaternaBooks Store"
            className="w-full md:w-1/2 rounded-2xl shadow-md object-cover"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              WHO WE ARE
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Laterna Ventures Limited is a leading literature importation,
              distribution, and marketing organization in Nigeria. With a strong
              and consistent focus on customer satisfaction, Laterna has grown
              from a Christian bookstore to one of the most reliable sources for
              Bibles, Business and Christian Books, Children’s Books,
              Educational Toys, Gift Items, Home and Office Fragrances, Music,
              Stationery, and Journals.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Established in 1996, we have remained at the forefront of
              educating Nigerians through access to global best-selling books
              and children’s learning materials. With over 100,000 titles and
              multiple retail partners across 33 states including Abuja, Laterna
              is truly a lifestyle hub for booklovers.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-10">
            Our Categories
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Bibles */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">Bibles</h3>
              <p className="text-gray-700">
                We offer a wide variety of Bible translations for spiritual
                growth—daily devotion, marriage, prophecy, and more.
              </p>
            </div>

            {/* Children’s Books */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                Children’s Books
              </h3>
              <p className="text-gray-700">
                Fiction, non-fiction, and motivational titles that inspire
                creativity and learning for children and teens.
              </p>
            </div>

            {/* Educational Toys */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                Educational Toys
              </h3>
              <p className="text-gray-700">
                Our educational toys encourage creativity, emotional growth, and
                social interaction through play.
              </p>
            </div>

            {/* Frames & Plaques */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                Frames & Plaques
              </h3>
              <p className="text-gray-700">
                Add color and life to your walls with our exclusive décor
                collection that transforms any space.
              </p>
            </div>

            {/* Notebooks & Journals */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                Notebooks & Journals
              </h3>
              <p className="text-gray-700">
                Keep your ideas organized with our range of premium journals and
                writing notebooks.
              </p>
            </div>

            {/* Business & Christian Books */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                Business & Christian Books
              </h3>
              <p className="text-gray-700">
                Explore well-researched books authored by experts to enrich your
                mind and spirit.
              </p>
            </div>

            {/* Stationery */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                Stationery
              </h3>
              <p className="text-gray-700">
                A curated selection of essentials for your home, school, and
                office.
              </p>
            </div>

            {/* Home Fragrances */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                Home Fragrances
              </h3>
              <p className="text-gray-700">
                Discover diffusers, scented candles, and sprays to elevate your
                living space with pleasant aromas.
              </p>
            </div>

            {/* Book Reading Events */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                Book Reading Sessions
              </h3>
              <p className="text-gray-700">
                We organize monthly reading sessions for children to build
                reading skills in a fun, interactive setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-orange-600 text-white py-10 text-center">
        <h3 className="text-2xl font-bold mb-2">Laterna Ventures Limited</h3>
        <p className="max-w-3xl mx-auto text-gray-100 px-4">
          Empowering readers and inspiring minds since 1996 — connecting
          Nigerians to the world’s most inspiring books and lifestyle products.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
