import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaHeart } from "react-icons/fa";

const ProductInfo = () => {
  // Example product (replace later with backend data)
  const product = {
    name: "Classic Easy Zipper Tote",
    price: "$298",
    description:
      "Crafted with premium leather, this tote combines timeless design with durable functionality. Perfect for daily use or travel.",
    images: [
      "/images/tote.jpg",
      "/images/tote2.jpg",
      "/images/tote3.jpg",
    ],
    colors: ["Black", "Brown", "Beige"],
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left: Product Image Slider */}
      <div className="relative">
        <img
          src={product.images[currentIndex]}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-md"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4 justify-center">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                index === currentIndex ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-gray-800 mb-6">{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Color Options */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="w-8 h-8 rounded-full border cursor-pointer"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition flex items-center justify-center">
            <FaShoppingBag className="mr-2" /> Add to Cart
          </button>
          <button className="flex items-center justify-center border px-6 py-3 rounded-md hover:bg-gray-100">
            <FaHeart className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
