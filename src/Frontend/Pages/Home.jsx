import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState({});

  // Fetch New Arrivals
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products?limit=4&sort=-createdAt",
          { withCredentials: true }
        );
        setNewArrivals(res.data);
      } catch (error) {
        console.log("Failed to fetch new arrivals", error);
      }
    };

    fetchNewArrivals();
  }, []);

  // Fetch Products and Group by Category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products", {
          withCredentials: true,
        });
        const products = res.data;

        // Group by category
        const grouped = products.reduce((acc, product) => {
          const cat = product.Category || "Other";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(product);
          return acc;
        }, {});
        setCategories(grouped);
      } catch (error) {
        console.log("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gray-100">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Elevate Your Style
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Timeless Bags, Designed for Everyday Elegance
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Shop Now <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* ✅ Dynamic Shop by Category Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
  {Object.entries(categories).map(([category, items]) => {
    const featured = items[0]; // first product as thumbnail
    return (
      <Link
        key={category}
        to={`/shop?category=${category}`}
        className="relative group rounded-2xl overflow-hidden bg-gray-50 shadow-md hover:shadow-2xl transition-all duration-500"
      >
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={featured.Image || "/placeholder.png"}
            alt={category}
            className="w-full h-80 object-contain transform group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundColor: featured.BGColor || "#f8f8f8" }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Label */}
        <div className="absolute bottom-5 left-5 flex flex-col items-start">
          <span className="text-white text-2xl font-semibold tracking-wide drop-shadow-lg">
            {category}
          </span>
          <span className="text-sm text-gray-200 opacity-90">
            {items.length} {items.length > 1 ? "products" : "product"}
          </span>
        </div>

        {/* Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <span className="bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-medium shadow hover:bg-gray-100 transition">
            Explore
          </span>
        </div>
      </Link>
    );
  })}
</div>

      </section>

      {/* New Arrivals */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          {/* Header + View All */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              ✨ New Arrivals
            </h2>
            <Link to="/shop">
              <button className="text-sm md:text-base font-medium text-white bg-black px-5 py-2 rounded-full hover:bg-gray-800 transition duration-300 shadow-md">
                View All
              </button>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => {
              const discount = product.Discount || 20;
              const discountedPrice = product.Price
                ? (product.Price - product.Price * (discount / 100)).toFixed(2)
                : null;

              return (
                <div
                  key={product._id}
                  className="group relative p-5 rounded-2xl shadow-sm hover:shadow-xl bg-white hover:-translate-y-2 transition-all duration-300"
                  style={{ backgroundColor: product.BGColor || "#fff" }}
                >
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      -{discount}% OFF
                    </span>
                  )}

                  {/* Product Image */}
                  <div className="overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={product.Image || "/placeholder.png"}
                      alt={product.Title}
                      className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition">
                      {product.Title}
                    </h3>
                    <div className="flex justify-center items-center gap-2 mt-1">
                      <p className="text-lg font-bold text-black">
                        ${discountedPrice}
                      </p>
                      {discountedPrice && (
                        <p className="text-gray-500 line-through text-sm">
                          ${product.Price}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          The Art of Fewer, Better Choices
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Opting for quality over quantity means selecting timeless, durable,
          and responsibly made items. Our collection is crafted sustainably with
          longevity in mind—bags designed to stay with you for years.
        </p>
      </section>

      {/* Instagram Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-8">Shop Instagram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="/images/insta1.jpg"
              alt="Insta look"
              className="w-full h-56 object-cover rounded-md"
            />
            <img
              src="/images/insta2.jpg"
              alt="Insta look"
              className="w-full h-56 object-cover rounded-md"
            />
            <img
              src="/images/insta3.jpg"
              alt="Insta look"
              className="w-full h-56 object-cover rounded-md"
            />
            <img
              src="/images/insta4.jpg"
              alt="Insta look"
              className="w-full h-56 object-cover rounded-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
