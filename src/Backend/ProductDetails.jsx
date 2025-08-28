import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`, {
          withCredentials: true,
        });
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-white p-6 w-full min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-white p-6 w-full min-h-screen">
      {/* Back Link */}
      <Link
        to="/dashboard/products"
        className="text-yellow-400 hover:underline mb-6 inline-block"
      >
        ← Back to Products
      </Link>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left - Product Image */}
        <div
          className="flex-1 flex items-center justify-center rounded-lg p-4 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] "
          style={{ backgroundColor: product.BGColor || "#1a1a1a" }}
        >
          <img
            src={product.Image}
            alt={product.Title}
            className="w-full h-auto max-h-[400px] object-contain"
          />
        </div>

        {/* Right - Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{product.Title}</h1>
          <p className="text-lg sm:text-xl text-yellow-400 font-semibold">
            ${product.Price}
          </p>

          {product.Discount > 0 && (
            <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              {product.Discount}% OFF
            </span>
          )}

          <p className="text-sm text-gray-400">
            Category: <span className="text-white">{product.Category}</span>
          </p>

          <p className="text-[19px] sm:text-lg leading-relaxed tracking-wide">
            {product.Description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
