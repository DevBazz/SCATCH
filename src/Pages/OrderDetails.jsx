import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/orders/${id}`);
        setOrder(res.data)
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  console.log(order)

  if (loading) return <div className="ml-[17vw] p-8">Loading...</div>;
  if (!order) return <div className="ml-[17vw] p-8">Order not found</div>;

  return (
    <div className="min-w-[82vw] min-h-screen bg-gray-50 p-8">
      {/* Order Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          <div><span className="font-semibold">Order ID:</span> {order._id}</div>
          <div><span className="font-semibold">Customer:</span> {order.UserID?.Name || "Unknown"}</div>
          <div><span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</div>
          <div><span className="font-semibold">Status:</span> {order.Status}</div>
          <div><span className="font-semibold">Total:</span> Rs. {order.TotalPrice}</div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ordered Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.Products?.map((product, index) => (
              <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-4">
                     <img
                    src={product.ProductID?.Image || "https://via.placeholder.com/50"}
                    alt={product.ProductID?.Title || "Product"}
                    className="w-14 h-14 object-cover rounded-lg border"
                        />
                    </td>
                    <td className="py-3 px-4">{product.ProductID?.Title}</td>
                    <td className="py-3 px-4">Rs. {product.ProductID?.Price}</td>
                    <td className="py-3 px-4">{product.Quantity}</td>
                    <td className="py-3 px-4">
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
}

export default OrderDetails;