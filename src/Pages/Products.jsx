import { useState, useEffect } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import ProductCard from "../components/ProductsCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const productPerPage = 8;

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await axios.get("https://fakestoreapi.com/products");
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

  return (
    <section className="w-[83vw] h-screen p-6 bg-zinc-800 text-white overflow-y-auto">
      
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

      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      
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

    
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 w-[90%] sm:w-[600px] max-h-[90vh] overflow-y-auto shadow-xl text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload New Product</h2>
              <button onClick={() => setShowModal(false)} className="text-xl">✖</button>
            </div>

            <form className="flex flex-col gap-4" encType="multipart/formdataT">
              <input type="text" name="Title" placeholder="Product Name" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <input type="text" name="Price" placeholder="Price" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <input type="text" name="Discount" placeholder="Discount Price" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <input type="text" name="Category" placeholder="Category" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <input type="file" name="Image" className="bg-white/10 px-4 py-2 rounded-lg outline-none text-white" />
              <input type="text" name="BGColor" placeholder="Background Color (e.g. #f0f0f0)" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <textarea rows={4} name="Description" placeholder="Description" className="bg-white/10 px-4 py-2 rounded-lg outline-none placeholder-white" />
              <button type="submit" className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg">Submit</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
