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
        const productsData = await axios.get("http://localhost:3000/api/products");
        setProducts(productsData.data);
        console.log("Fetched products:", productsData.data);
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

  // Update form data
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
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
   
      console.log("Product uploaded:", res.data);

      // Optional: Add the new product to list without reloading
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
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(prev => prev.filter(product => product._id !== id));
      console.log("Product deleted:", id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  const handleEdit = async (id, updatedProduct) => {
    
    try {
      const res = await axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct);
      setProducts(prev => prev.map(product => product._id === id ? res.data : product));
      console.log("Product updated:", res.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  return (
    <section className="w-[83vw] h-screen p-6 bg-zinc-800 text-white overflow-y-auto">
      {/* Search and Upload Button */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center bg-white/10 backdrop-blur text-white px-4 py-2 rounded-lg gap-2 w-full sm:w-96">
          <BiSearch size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none w-full placeholder-white text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <select className="bg-white/10 backdrop-blur text-black px-4 py-2 rounded-lg">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Accessories</option>
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg transition-all"
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
            <ProductCard key={product._id} product={product} handleDelete={handleDelete} handleEdit={handleEdit}/>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-teal-500 hover:bg-white hover:text-black disabled:opacity-50 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-teal-500 hover:bg-white hover:text-black disabled:opacity-50 rounded"
        >
          Next
        </button>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-[90%] sm:w-[600px] max-h-[90vh] overflow-y-auto shadow-xl text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload New Product</h2>
              <button onClick={() => setShowModal(false)} className="text-xl">✖</button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              encType="multipart/form-data"
            >
              <input type="text" name="Title" value={formData.Title} onChange={handleChange} placeholder="Product Name" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <input type="text" name="Price" value={formData.Price} onChange={handleChange} placeholder="Price" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <input type="text" name="Discount" value={formData.Discount} onChange={handleChange} placeholder="Discount Price" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <input type="text" name="Category" value={formData.Category} onChange={handleChange} placeholder="Category" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <input type="file" name="Image" onChange={handleChange} className="bg-white/10 px-4 py-2 rounded-lg outline-none text-white"/>
              <input type="text" name="BGColor" value={formData.BGColor} onChange={handleChange} placeholder="Background Color (e.g. #f0f0f0)" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <textarea rows={4} name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <button type="submit" className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg">Submit</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
