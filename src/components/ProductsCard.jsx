import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleDelete, handleEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    Title: product.Title || "",
    Price: product.Price || "",
    quantity: product.quantity || "",
    size: product.size || "",
    BGColor: product.BGColor || "#1a1a1a"
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
  }


  return (
    <>
    <Link to={`/products/${product._id}`}>
      <div className="w-[250px] h-[400px] flex flex-col justify-between bg-zinc-900 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Product Image */}
        <div
          className="relative w-full h-[180px] flex items-center justify-center rounded-lg"
          style={{ backgroundColor: product.BGColor || "#1a1a1a" }}
        >
          <img
            src=""
            alt={product.Title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="mt-4 text-white space-y-1 flex-grow">
          <p className="text-sm text-zinc-400">
            {product.Category || "Uncategorized"}
          </p>
          <h3 className="text-base font-semibold leading-tight line-clamp-2 h-[40px] mt-2">
            {product.Title}
          </h3>
          <p className="text-lg font-bold">${product.Price}</p>
          {product.Discount > 0 && (
            <p className="text-sm text-yellow-400">
              {product.Discount}% OFF
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1">
          <button
            className="mt-4 w-full py-2 bg-yellow-400 hover:bg-zinc-600 text-white text-sm rounded-md"
            onClick={openModal}
          >
            Edit
          </button>
          <button
            className="mt-4 w-full py-2 bg-red-600 hover:bg-zinc-600 text-white text-sm rounded-md"
            onClick={() => handleDelete(product._id)}
          >
            Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div
      className="relative w-[420px] p-6 rounded-2xl shadow-lg border border-white/20"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      }}
    >
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-white text-lg hover:text-red-400"
        onClick={closeModal}
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-white mb-5">
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
          className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="number"
          name="Price"
          value={editForm.Price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="color"
          name="BGColor"
          value={editForm.BGColor}
          onChange={handleChange}
          className="w-full h-10 rounded-lg border border-white/30 cursor-pointer"
        />

        <input
          type="text"
          name="Category"
          value={editForm.Category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <textarea
          name="Description"
          value={editForm.Description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="number"
          name="Discount"
          value={editForm.Discount}
          onChange={handleChange}
          placeholder="Discount (%)"
          className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="file"
          name="Image"
          onChange={(e) =>
            setEditForm((prev) => ({ ...prev, Image: e.target.files[0] }))
          }
          className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:text-white hover:file:bg-yellow-600"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
)}

</Link>
    </>
  );
};

export default ProductCard;
