import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShoppingBag,
  FaHeart,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import useProductStore from "../../store/productStore";


const ProductInfo = () => {
  
  const { id } = useParams();
  const { product, loading, error, fetchProduct } = useProductStore();

  useEffect(() => {
    fetchProduct(id)
  }, [ fetchProduct, id ]);

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

  // Example discount (you can add discount field from DB)
  const discountPercentage = product.Discount || 20;
  const discountedPrice = product.Price
    ? (product.Price - product.Price * (discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left: Product Image Section */}
      <div
        className="relative flex items-center justify-center rounded-xl shadow-md p-6"
        style={{ backgroundColor: product.BGColor || "#f8f9fa" }}
      >
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-5 left-5 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
            -{discountPercentage}% OFF
          </span>
        )}

        {/* Product Image */}
        <img
          src={product.Image || "/placeholder.png"}
          alt={product.Title}
          className="w-full h-[500px] object-contain transition-transform duration-300 hover:scale-105"
        />

        {/* Image Controls (if multiple images) */}
        {product.images?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-3">{product.Title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl font-semibold text-green-500/80">
              ${discountedPrice}
            </p>
            {discountedPrice && (
              <p className="text-gray-500 line-through text-lg">
                ${product.Price}
              </p>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.Description || "No description available."}
          </p>

          {/* Optional Product Details */}
          {product.Category && (
            <p className="text-sm text-gray-500 mb-2">
              Category: {product.Category}
            </p>
          )}
          {product.Brand && (
            <p className="text-sm text-gray-500 mb-4">
              Brand: {product.Brand}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-md">
            <FaShoppingBag /> Add to Cart
          </button>
          <button className="flex items-center justify-center border px-6 py-3 rounded-md hover:bg-gray-100 transition shadow-sm">
            <FaHeart className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
