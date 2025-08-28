import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return <div className="ml-0 md:ml-[17vw] p-4 md:p-8">Loading...</div>;
  if (!order)
    return <div className="ml-0 md:ml-[17vw] p-4 md:p-8">Order not found</div>;

  return (
    <div className="ml-0 md:ml-[17vw] min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/orders")}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition"
      >
        ← Back to Orders
      </button>

      {/* Order Summary */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md mb-8 border border-gray-200">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Order Details
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Order ID:</span> {order._id}
          </div>
          <div>
            <span className="font-semibold">Customer:</span>{" "}
            {order.UserID?.Name || "Unknown"}
          </div>
          <div>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {order.Status}
          </div>
          <div>
            <span className="font-semibold">Total:</span> Rs. {order.TotalPrice}
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Ordered Products
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 md:py-3 px-2 md:px-4 text-left">Image</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left">Product</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left">Price</th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left">
                  Quantity
                </th>
                <th className="py-2 md:py-3 px-2 md:px-4 text-left">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {order.Products?.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    <img
                      src={
                        product.ProductID?.Image ||
                        "https://via.placeholder.com/50"
                      }
                      alt={product.ProductID?.Title || "Product"}
                      className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    {product.ProductID?.Title}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    Rs. {product.ProductID?.Price}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    {product.Quantity}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    Rs. {product.ProductID?.Price * product.Quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
