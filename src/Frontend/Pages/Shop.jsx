import { useState } from "react";
import { FaEye } from "react-icons/fa";
import QuickView from "../../components/QuickView";

const products = [
  { id: 1, name: "Classic Easy Zipper Tote", price: "$298", img: "/images/tote.jpg" },
  { id: 2, name: "Concertina Phone Bag", price: "$248", img: "/images/phone-bag.jpg" },
  { id: 3, name: "Wool Cashmere Sweater Coat", price: "$398", img: "/images/coat.jpg" },
  { id: 4, name: "Crossbody Leather Bag", price: "$220", img: "/images/crossbody.jpg" },
  { id: 5, name: "Backpack Minimalist", price: "$180", img: "/images/backpack.jpg" },
  { id: 6, name: "Travel Duffel Bag", price: "$320", img: "/images/duffel.jpg" },
  { id: 7, name: "Mini Tote", price: "$140", img: "/images/mini-tote.jpg" },
  { id: 8, name: "Shoulder Bag", price: "$200", img: "/images/shoulder.jpg" },
];

const categories = ["All", "Backpacks", "Totes", "Crossbody", "Duffels"];
const colors = ["Black", "Brown", "Beige", "White", "Green"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) =>
          p.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop</h1>
        <p className="text-gray-600">
          Discover timeless bags crafted with style and sustainability.
        </p>
      </section>

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-6">Filters</h2>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Category</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`${
                      selectedCategory === cat
                        ? "font-semibold text-black"
                        : "text-gray-600"
                    } hover:text-black`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Color</h3>
            <ul className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <li
                  key={color}
                  className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black"
                >
                  <span
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></span>
                  {color}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price</h3>
            <input type="range" min="50" max="500" className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$50</span>
              <span>$500</span>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="overflow-hidden rounded-md relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition"
                  />
                  {/* Eye Icon for Quick View */}
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setQuickViewOpen(true);
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                  >
                    <FaEye className="text-gray-700 hover:text-black" size={18} />
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <button className="px-6 py-2 border rounded-md hover:bg-gray-100">
              Load More
            </button>
          </div>

          {/* Quick View Modal */}
          <QuickView
            product={selectedProduct}
            isOpen={quickViewOpen}
            onClose={() => setQuickViewOpen(false)}
          />
        </main>
      </div>
    </div>
  );
};

export default Shop;
