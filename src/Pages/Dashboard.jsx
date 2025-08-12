import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Chart Data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 1900, 3000, 2500, 3200, 4000, 4800],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#374151",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#6B7280" },
        grid: { color: "#E5E7EB" },
      },
      y: {
        ticks: { color: "#6B7280" },
        grid: { color: "#E5E7EB" },
      },
    },
  };

  return (
    <div className="min-w-[82vw] overflow-hidden min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Total Sales</h2>
          <p className="text-2xl font-semibold text-gray-800">$12,450</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-semibold text-gray-800">1,245</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-2xl font-semibold text-gray-800">320</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Customers</h2>
          <p className="text-2xl font-semibold text-gray-800">780</p>
        </div>
      </section>

      {/* Sales Analytics Chart */}
      <section className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Sales Analytics
        </h2>
        <div className="w-full h-[350px]">
          <Line data={salesData} options={salesOptions} />
        </div>
      </section>

      {/* Recent Orders */}
      <section className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent Orders
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Product</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">#001</td>
              <td className="py-3 px-4">Sarah Johnson</td>
              <td className="py-3 px-4">Leather Tote</td>
              <td className="py-3 px-4">$120</td>
              <td className="py-3 px-4 text-green-600">Delivered</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">#002</td>
              <td className="py-3 px-4">Mike Wilson</td>
              <td className="py-3 px-4">Backpack</td>
              <td className="py-3 px-4">$90</td>
              <td className="py-3 px-4 text-yellow-500">Pending</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Best Selling Products */}
      <section className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Best Selling Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-50 border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Bag"
                className="rounded-lg mb-3"
              />
              <h3 className="font-medium text-gray-800">
                Premium Leather Bag
              </h3>
              <p className="text-sm text-gray-500">$150</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;