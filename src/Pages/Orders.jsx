
import { FaSearch, FaSortAmountDown } from "react-icons/fa";

const orders = [
  {
    id: "#OD001",
    customer: "John Doe",
    date: "2025-08-01",
    amount: "$250.00",
    status: "Delivered",
  },
  {
    id: "#OD002",
    customer: "Jane Smith",
    date: "2025-08-02",
    amount: "$150.00",
    status: "Pending",
  },
  {
    id: "#OD003",
    customer: "Michael Brown",
    date: "2025-08-03",
    amount: "$320.00",
    status: "Shipped",
  },
  {
    id: "#OD004",
    customer: "Emily Davis",
    date: "2025-08-04",
    amount: "$480.00",
    status: "Cancelled",
  },
];

const OrderPage = () => {
  return (
    <div className="w-[83vw] h-screen bg-[#0d0d2b] text-white p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="bg-[#1c1c3a] text-white rounded px-4 py-2 pl-10 outline-none"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 bg-[#1c1c3a] px-4 py-2 rounded">
            <FaSortAmountDown /> Sort
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-[#1c1c3a] text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[#2a2a4d] transition-all">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">{order.amount}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-600"
                        : order.status === "Cancelled"
                        ? "bg-red-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-400 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
