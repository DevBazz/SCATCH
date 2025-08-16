import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaSearch, FaSortAmountDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders", {
          withCredentials: true,
        });

        const formattedOrders = res.data.map((order) => ({
          id: order._id,
          customer: order.UserID?.Name || "Unknown User",
          date: new Date(order.createdAt).toLocaleDateString(),
          amount: `Rs. ${order.TotalPrice}`,
          status: order.Status,
        }));

        setOrders(formattedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/orders/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`, {
        withCredentials: true,
      });
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const filteredOrders = orders
    .filter(
      (order) =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((order) =>
      sortStatus ? order.status.toLowerCase() === sortStatus.toLowerCase() : true
    );

  return (
    <div className="w-[83vw] h-screen bg-gray-50 text-gray-900 p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-gray-300 rounded px-4 py-2 pl-10 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Sort by Status */}
          <div className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded shadow-sm">
            <FaSortAmountDown />
            <select
              value={sortStatus}
              onChange={(e) => setSortStatus(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-semibold">Order ID</th>
              <th className="py-3 px-4 font-semibold">Customer</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 text-gray-600 font-mono">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {order.id}
                  </Link>
                </td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4 font-semibold">{order.amount}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-200 text-green-800"
                        : order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Cancelled"
                        ? "bg-red-200 text-red-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {order.status === "Cancelled" && (
                    <button
                      onClick={() => handleDelete(order.id)}
                      title="Delete Order"
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
