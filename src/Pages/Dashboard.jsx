import { useState } from "react";
import { FaShoppingCart, FaTruck, FaClock, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  const [stats] = useState({
    shippedOrders: 67,
    pendingOrders: 9,
    newOrders: 35,
    revenue: 45386,
    todaySales: [10, 25, 18, 32, 20],
  });

  return (
    <div className="bg-[#0d1117] text-white p-6 min-h-screen w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Good Evening 👋</h1>
        <p className="text-sm text-gray-400">Total revenue</p>
        <p className="text-3xl font-semibold text-green-400 mt-1">
          ${stats.revenue.toLocaleString()} <span className="text-xs text-red-500">▼ 2.5%</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1f2937] p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Shipped Orders</p>
            <p className="text-2xl font-bold">{stats.shippedOrders}</p>
          </div>
          <FaTruck className="text-blue-400 w-8 h-8" />
        </div>

        <div className="bg-[#1f2937] p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Pending Orders</p>
            <p className="text-2xl font-bold">{stats.pendingOrders}</p>
          </div>
          <FaClock className="text-pink-400 w-8 h-8" />
        </div>

        <div className="bg-[#1f2937] p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">New Orders</p>
            <p className="text-2xl font-bold">{stats.newOrders}</p>
          </div>
          <FaShoppingCart className="text-purple-400 w-8 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1f2937] p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Inbox</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>🔔 Your bag order #4312 is ready to ship</li>
            <li>✅ Order #4311 has been delivered</li>
            <li>📦 New bag model is now in stock</li>
          </ul>
        </div>

        <div className="bg-[#1f2937] p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Today's Sales</h2>
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-red-400 w-6 h-6" />
            <p className="text-sm">Trending sales overview</p>
          </div>
          <div className="h-24 mt-4 bg-[#111827] rounded-lg flex items-end justify-between px-2">
            {stats.todaySales.map((val, idx) => (
              <div key={idx} className="w-1.5 bg-blue-400 rounded" style={{ height: `${val * 2}px` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
