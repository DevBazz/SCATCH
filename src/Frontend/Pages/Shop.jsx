import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import QuickView from "../../components/QuickView";
import { Link } from "react-router-dom";

import useProductStore from "../../store/productStore";
import useCartStore from "../../store/cartStore";

const categories = ["All", "Backpacks", "Totes", "Crossbody", "Duffels"];
const colors = ["Black", "Brown", "Beige", "White", "Green"];

const Shop = () => {
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const { products, loading, error, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Filter products by category name
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) =>
          p.category?.toLowerCase().includes(selectedCategory.toLowerCase())
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
            {filteredProducts.map((product) => {
    const discountPercent = product.Discount || 20; // Default 20% if not provided
    const discountedPrice = product.Price - (product.Price * discountPercent) / 100;

  return (
    <div
      key={product._id}
      className="group relative rounded-2xl p-5 shadow-md hover:shadow-2xl bg-white transition-all duration-300 flex flex-col justify-between border border-gray-100"
      style={{
        backgroundColor: product.BGColor || "#f9fafb",
      }}
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
          -{discountPercent}%
        </span>
      )}

      {/* Product Image */}
      <Link to={`/shop/products/${product._id}`}>
        <div className="overflow-hidden rounded-xl relative">
          <img
            src={product.Image || "/placeholder.png"}
            alt={product.Title}
            className="w-full h-72 object-contain group-hover:scale-110 transition-transform duration-300"
          />

          {/* Eye Icon for Quick View */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSelectedProduct(product);
              setQuickViewOpen(true);
            }}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
          >
            <FaEye className="text-gray-700 hover:text-black" size={18} />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-4 flex flex-col items-start">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition">
          {product.Title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.Category}</p>

        {/* Price Section */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${product.Price.toFixed(2)}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition"
            onClick={() => addToCart(product, 1)}
          >
            Add to Cart
          </button>
          <button
            className="flex-1 py-2 border border-gray-900 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-900 hover:text-white transition"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Buy now logic here
              console.log(`Buying ${product.Title}`);
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
})}


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
