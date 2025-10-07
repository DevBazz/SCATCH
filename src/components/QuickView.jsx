import { FaTimes, FaShoppingBag } from "react-icons/fa";

const QuickView = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="w-full h-80 overflow-hidden rounded-lg " style={{ backgroundColor: product.BGColor || "#f5f5f5" } }>
            <img
              src={product.Image}
              alt={product.Title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.Title}</h2>
              <p className="text-lg text-green-600/80 mb-4">${product.Price}</p>
              <p className="text-gray-600 text-[13.5px] font leading-relaxed mb-8">
                {product.Description ||
                  "Crafted with premium materials, this bag is built to last with timeless style."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center justify-center">
                <FaShoppingBag className="mr-2" /> Add to Cart
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
