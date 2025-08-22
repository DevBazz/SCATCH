import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const products = [
  { id: 1, name: "Classic Easy Zipper Tote", price: "$298", img: "/images/tote.jpg" },
  { id: 2, name: "Concertina Phone Bag", price: "$248", img: "/images/phone-bag.jpg" },
  { id: 3, name: "Single-Origin Cashmere Beanie", price: "$98", img: "/images/beanie.jpg" },
  { id: 4, name: "Alpaca Wool Cropped Cardigan", price: "$248", img: "/images/cardigan.jpg" },
];

const Home = () => {
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

      {/* Featured Categories */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/shop/backpacks"
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src="/images/backpack.jpg"
              alt="Backpacks"
              className="w-full h-72 object-cover group-hover:scale-105 transition"
            />
            <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-md shadow">
              Backpacks
            </span>
          </Link>
          <Link
            to="/shop/totes"
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src="/images/tote.jpg"
              alt="Totes"
              className="w-full h-72 object-cover group-hover:scale-105 transition"
            />
            <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-md shadow">
              Totes
            </span>
          </Link>
          <Link
            to="/shop/crossbody"
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src="/images/crossbody.jpg"
              alt="Crossbody"
              className="w-full h-72 object-cover group-hover:scale-105 transition"
            />
            <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-md shadow">
              Crossbody
            </span>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 text-center">New Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="text-center">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story / Promo */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">The Art of Fewer, Better Choices</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Opting for quality over quantity means selecting timeless, durable, and responsibly made items. 
          Our collection is crafted sustainably with longevity in mind—bags designed to stay with you for years.
        </p>
      </section>

      {/* Instagram Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-8">Shop Instagram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="/images/insta1.jpg" alt="Insta look" className="w-full h-56 object-cover rounded-md" />
            <img src="/images/insta2.jpg" alt="Insta look" className="w-full h-56 object-cover rounded-md" />
            <img src="/images/insta3.jpg" alt="Insta look" className="w-full h-56 object-cover rounded-md" />
            <img src="/images/insta4.jpg" alt="Insta look" className="w-full h-56 object-cover rounded-md" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
