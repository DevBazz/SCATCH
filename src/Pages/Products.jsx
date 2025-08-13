import { useState, useEffect } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import ProductCard from "../components/ProductsCard";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
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
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productPerPage);


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

  return (
    <section className="w-[83vw] min-h-screen p-6 bg-gray-50 text-gray-800 overflow-y-auto">
      {/* Search + Filter + Upload */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="flex items-center bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg gap-2 w-full sm:w-96">
          <BiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none w-full placeholder-gray-400 text-gray-700"
          />
        </div>

        {/* Filter + Upload */}
        <div className="flex items-center gap-3">
          <select className="bg-white border border-gray-200 shadow-sm text-gray-700 px-4 py-2 rounded-lg">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Accessories</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            <FiUpload />
            Upload Product
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
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
          <p className="text-center text-gray-500">No product to display</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 rounded-lg shadow-sm"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 rounded-lg shadow-sm"
        >
          Next
        </button>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-[90%] sm:w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-white">
        Upload New Product
      </h2>
      <button
        onClick={() => setShowModal(false)}
        className="text-xl text-white/80 hover:text-white"
      >
        ✖
      </button>
    </div>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg max-w-md mx-auto"
      encType="multipart/form-data"
    >
      <input
        type="text"
        name="Title"
        value={formData.Title}
        onChange={handleChange}
        placeholder="Product Name"
        className="bg-white/10 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg outline-none placeholder-white/80 text-white focus:ring-2 focus:ring-teal-400"
      />
      <input
        type="text"
        name="Price"
        value={formData.Price}
        onChange={handleChange}
        placeholder="Price"
        className="bg-white/10 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg outline-none placeholder-white/80 text-white focus:ring-2 focus:ring-teal-400"
      />
      <input
        type="text"
        name="Discount"
        value={formData.Discount}
        onChange={handleChange}
        placeholder="Discount Price"
        className="bg-white/10 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg outline-none placeholder-white/80 text-white focus:ring-2 focus:ring-teal-400"
      />
      <input
        type="text"
        name="Category"
        value={formData.Category}
        onChange={handleChange}
        placeholder="Category"
        className="bg-white/10 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg outline-none placeholder-white/80 text-white focus:ring-2 focus:ring-teal-400"
      />
      <input
        type="file"
        name="Image"
        onChange={handleChange}
        className="bg-white/10 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg outline-none text-white file:bg-transparent file:border-none file:text-white file:mr-3"
      />
      <input
        type="color"
        name="BGColor"
        value={formData.BGColor}
        onChange={handleChange}
        className="w-full h-10 rounded-lg border border-white/30 cursor-pointer"
      />
      <textarea
        rows={4}
        name="Description"
        value={formData.Description}
        onChange={handleChange}
        placeholder="Description"
        className="bg-white/10 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg outline-none placeholder-white/80 text-white focus:ring-2 focus:ring-teal-400"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 px-4 py-2 rounded-lg text-white transition-all shadow-md hover:shadow-lg"
      >
        Submit
      </button>
    </form>
  </div>
</div>

      )}
    </section>
  );
};

export default Products;
