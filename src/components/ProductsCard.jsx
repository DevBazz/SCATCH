import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleDelete, handleEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    Title: product.Title || "",
    Price: product.Price || "",
    Category: product.Category || "",
    Description: product.Description || "",
    Discount: product.Discount || "",
    quantity: product.quantity || "",
    size: product.size || "",
    BGColor: product.BGColor || "#f5f5f5"
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...editForm,
        Image: editForm.Image ? editForm.Image : product.Image
      };
      await handleEdit(product._id, updatedProduct);
      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <div className="w-[250px] h-[400px] flex flex-col justify-between bg-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
        {/* Product Image */}
        <Link to={`/products/${product._id}`}>
          <div
            className="relative w-full h-[180px] flex items-center justify-center rounded-lg overflow-hidden"
            style={{ backgroundColor: product.BGColor || "#f5f5f5" }}
          >
            <img
              src={product.Image || "https://via.placeholder.com/150"}
              alt={product.Title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Product Info */}
          {/* Product Info */}
<div className="mt-4 text-gray-800 space-y-1 flex-grow">
  <p className="text-sm text-gray-500">
    {product.Category || "Uncategorized"}
  </p>
  <h3 className="text-base font-semibold leading-tight line-clamp-2 h-[40px] mt-1">
    {product.Title}
  </h3>

  {product.Discount > 0 ? (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 line-through">
        ${parseFloat(product.Price).toFixed(2)}
      </span>
      <span className="text-lg font-bold text-green-600">
        ${(
          parseFloat(product.Price) -
          (parseFloat(product.Price) * parseFloat(product.Discount)) / 100
        ).toFixed(2)}
      </span>
    </div>
  ) : (
    <p className="text-lg font-bold text-gray-900">
      ${parseFloat(product.Price).toFixed(2)}
    </p>
  )}

  {product.Discount > 0 && (
    <p className="text-sm text-green-600 font-medium">
      {product.Discount}% OFF
    </p>
  )}
</div>

        </Link>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition"
            onClick={openModal}
          >
            Edit
          </button>
          <button
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition"
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative w-[420px] p-6 rounded-2xl shadow-lg bg-white border border-gray-200">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              Edit Product
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} method="POST" className="space-y-4">
              <input
                type="text"
                name="Title"
                value={editForm.Title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="number"
                name="Price"
                value={editForm.Price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="color"
                name="BGColor"
                value={editForm.BGColor}
                onChange={handleChange}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />

              <input
                type="text"
                name="Category"
                value={editForm.Category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="Description"
                value={editForm.Description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="number"
                name="Discount"
                value={editForm.Discount}
                onChange={handleChange}
                placeholder="Discount (%)"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="file"
                name="Image"
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    Image: e.target.files[0]
                  }))
                }
                className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
