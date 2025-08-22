import { useState, useEffect } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import ProductCard from "../components/ProductsCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [formData, setFormData] = useState({
    Title: "",
    Price: "",
    Discount: "",
    Category: "",
    Image: null,
    BGColor: "",
    Description: ""
  });

  const productPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await axios.get("http://localhost:3000/api/products", {
          withCredentials: true
        });
        setProducts(productsData.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axios.post("http://localhost:3000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setFormData({
        Title: "",
        Price: "",
        Discount: "",
        Category: "",
        Image: null,
        BGColor: "",
        Description: ""
      });
      setProducts(prev => [res.data, ...prev]);
      setShowModal(false);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        withCredentials: true
      });
      setProducts(prev => prev.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = async (id, updatedProduct) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct, {
        withCredentials: true
      });
      setProducts(prev => prev.map(product => product._id === id ? res.data : product));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Apply search + category filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.Title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" || product.Category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productPerPage);

  return (
    <section className="w-full min-h-screen p-4 sm:p-6 bg-gray-50 text-gray-800">
      {/* Search + Filter + Upload */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="flex items-center bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg gap-2 w-[70vw] sm:w-96">
          <BiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full placeholder-gray-400 text-gray-700"
          />
        </div>

        {/* Filter + Upload */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-[85vw] sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-200 shadow-sm text-gray-700 px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            <option>All Categories</option>
            <option>Hand Bag & Fashion Bag</option>
            <option>Work and Professional Bag</option>
            <option>Backpacks & Travel Bags</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all shadow-sm w-full sm:w-auto"
          >
            <FiUpload />
            Upload Product
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No product to display</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 rounded-lg shadow-sm w-full sm:w-auto"
        >
          Previous
        </button>
        <span className="text-gray-700 text-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 rounded-lg shadow-sm w-full sm:w-auto"
        >
          Next
        </button>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-white hover:text-red-400 transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Upload Product
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Title */}
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                placeholder="Product Title"
                className="bg-white/30 border border-white/40 text-white placeholder-gray-200 rounded-lg px-4 py-2 outline-none"
                required
              />

              {/* Price & Discount */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="flex-1 bg-white/30 border border-white/40 text-white placeholder-gray-200 rounded-lg px-4 py-2 outline-none"
                  required
                />
                <input
                  type="number"
                  name="Discount"
                  value={formData.Discount}
                  onChange={handleChange}
                  placeholder="Discount (%)"
                  className="flex-1 bg-white/30 border border-white/40 text-white placeholder-gray-200 rounded-lg px-4 py-2 outline-none"
                />
              </div>

              {/* Category */}
              <select
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                className="bg-white/30 border border-white/40 text-white rounded-lg px-4 py-2 outline-none"
                required
              >
                <option value="">Select Category</option>
                <option>Hand Bag & Fashion Bag</option>
                <option>Work and Professional Bag</option>
                <option>Backpacks & Travel Bags</option>
              </select>

              {/* Image */}
              <input
                type="file"
                name="Image"
                onChange={handleChange}
                accept="image/*"
                className="bg-white/30 border border-white/40 text-white rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                required
              />

              {/* Color Picker */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label htmlFor="BGColor" className="text-white text-md">
                  Background Color:
                </label>
                <input
                  type="color"
                  name="BGColor"
                  id="BGColor"
                  value={formData.BGColor}
                  onChange={handleChange}
                  className="w-full sm:w-[330px] h-10 p-1 rounded-lg border border-white/40 cursor-pointer"
                />
              </div>

              {/* Description */}
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Product Description"
                rows={3}
                className="bg-white/30 border border-white/40 text-white placeholder-gray-200 rounded-lg px-4 py-2 outline-none resize-none"
              />

              {/* Submit */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold shadow-lg transition-all"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
