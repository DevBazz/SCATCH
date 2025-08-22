import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate()

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  const [admin, setAdmin] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [bestselling, setBestSelling] = useState([])
  const [totalSales, setTotalSales] = useState(0)
  const [salesData, setSalesData] = useState({
  labels: [],
  datasets: []
});

  const salesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  backgroundColor: "transparent",
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#F3F4F6", // very light gray
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    tooltip: {
      backgroundColor: "#111827", // darker tooltip
      titleColor: "#F9FAFB",
      bodyColor: "#D1D5DB",
      borderColor: "#3B82F6",
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      ticks: { color: "#9CA3AF", font: { size: 12, weight: "500" } },
      grid: { color: "rgba(107, 114, 128, 0.3)" },
    },
    y: {
      ticks: { color: "#9CA3AF", font: { size: 12, weight: "500" } },
      grid: { color: "rgba(107, 114, 128, 0.3)" },
    },
  },
  elements: {
    line: {
      borderWidth: 3,
      tension: 0.4,
    },
    point: {
      radius: 5,
      backgroundColor: "#60A5FA",
      borderColor: "#111827",
      borderWidth: 2,
      hoverRadius: 7,
      hoverBorderWidth: 2,
    },
  },
};



  useEffect(() => {

   const fetchAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/profile", {
          withCredentials: true, 
        });
        setAdmin(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      }
    };

    const fetchMonthlySales = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/orders/monthly-sales", {
      withCredentials: true,
    });
    const months = res.data.map(item => item.month);
    const totals = res.data.map(item => item.total);

    setSalesData({
  labels: months,
  datasets: [
    {
      label: "Sales ($)",
      data: totals,
      borderColor: "#60A5FA", // light blue line
      backgroundColor: (ctx) => {
        const chart = ctx.chart;
        const { ctx: canvasCtx, chartArea } = chart;
        if (!chartArea) return null;
        const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, "rgba(96, 165, 250, 0.4)"); // light blue
        gradient.addColorStop(1, "rgba(17, 24, 39, 0)"); // dark background fade
        return gradient;
      },
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#60A5FA",
    }
  ]
});

  } catch (err) {
    console.error("Failed to fetch monthly sales:", err);
  }
};

   const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:3000/api/users/count", {withCredentials: true}),
          axios.get("http://localhost:3000/api/products/count", {withCredentials: true}),
          axios.get("http://localhost:3000/api/orders/count", {withCredentials: true}),
        ]);

        setStats({
          users: usersRes.data.totalUsers,
          products: productsRes.data.totalProducts,
          orders: ordersRes.data.totalOrders,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

   const fetchRecentOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/orders?limit=3&sort=desc", {
            withCredentials: true,
          }
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch recent orders:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBestSelling = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/best-selling", {
          withCredentials: true,
        })
        setBestSelling(res.data)
      } catch (error) {
        console.error("Failed to fetch Best Selling Products:", error);
      }
    }
     
    const fetchTotalSales = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/orders/total-sales", {
        withCredentials: true,
      })
      setTotalSales(res.data.totalSales)
    } catch (error) {
      console.error("Failed to fetch Total Sales:", error);
    }
    }
   

   fetchAdmin()
   fetchStats();
   fetchMonthlySales()
   fetchRecentOrders();
   fetchBestSelling();
   fetchTotalSales();

  }, []);

  const handleLogout = async () => {
  try {
    await axios.post("http://localhost:3000/api/auth/admin/logout", {}, { withCredentials: true });
    navigate("/admin/login")
  } catch (error) {
    console.error("Logout failed", error);
  }
};


  return (
  <div className="min-w-[82vw] overflow-hidden min-h-screen bg-gray-50 p-4 sm:p-6">
    
    {/* Header */}
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 sm:flex-none px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {admin && (
          <img
            src={admin.ProfileImage || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"}
            alt={admin.Name}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border"
          />
        )}
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-5 py-2 rounded-lg text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>

    {/* Stats Cards */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-gray-500">Total Sales</h2>
        <p className="text-2xl font-semibold text-gray-800">{totalSales} $</p>
      </div>
      <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-gray-500">Orders</h2>
        <p className="text-2xl font-semibold text-gray-800">{stats.orders}</p>
      </div>
      <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-gray-500">Products</h2>
        <p className="text-2xl font-semibold text-gray-800">{stats.products}</p>
      </div>
      <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-gray-500">Customers</h2>
        <p className="text-2xl font-semibold text-gray-800">{stats.users}</p>
      </div>
    </section>

    {/* Sales Analytics */}
    <section className="bg-gray-900 p-5 rounded-xl shadow-lg mb-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Sales Analytics</h2>
      <div className="w-full h-[250px] sm:h-[350px]">
        <Line data={salesData} options={salesOptions} />
      </div>
    </section>

    {/* Recent Orders */}
<section className="bg-gradient-to-br from-white to-gray-50 p-5 sm:p-6 rounded-2xl shadow-lg mb-6 border border-gray-100">
  <h2 className="text-xl font-bold mb-5 text-gray-800 border-b pb-2">
    📦 Recent Orders
  </h2>

  {/* Desktop Table (hidden on mobile) */}
  <div className="hidden md:block w-full overflow-x-auto">
    <table className="w-full table-fixed border-collapse text-xs sm:text-sm md:text-base">
      <thead>
        <tr className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700">
          <th className="text-left py-3 px-2 sm:px-4 font-medium w-[20%]">Order ID</th>
          <th className="text-left py-3 px-2 sm:px-4 font-medium w-[20%]">Customer</th>
          <th className="text-left py-3 px-2 sm:px-4 font-medium w-[25%]">Product</th>
          <th className="text-left py-3 px-2 sm:px-4 font-medium w-[15%]">Price</th>
          <th className="text-left py-3 px-2 sm:px-4 font-medium w-[20%]">Status</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="5" className="text-center py-6 text-gray-500 italic">
              Loading recent orders...
            </td>
          </tr>
        ) : orders.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center py-6 text-gray-500 italic">
              No recent orders found.
            </td>
          </tr>
        ) : (
          orders.map((order, index) => (
            <tr
              key={order._id}
              className={`border-b transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50/50`}
            >
              <td className="py-3 px-2 sm:px-4 font-mono text-[10px] sm:text-xs md:text-sm text-gray-700 break-words">
                #{order._id.slice(-6)}
              </td>
              <td className="py-3 px-2 sm:px-4 text-gray-800 font-medium break-words">
                {order.UserID?.Name || "Unknown"}
              </td>
              <td className="py-3 px-2 sm:px-4 text-[10px] sm:text-xs md:text-sm text-gray-700 break-words">
                {order.Products && order.Products.length > 0
                  ? order.Products.map((p) => p.ProductID?.Title).filter(Boolean).join(", ")
                  : "N/A"}
              </td>
              <td className="py-3 px-2 sm:px-4 font-semibold text-blue-600 break-words">
                Rs. {order.TotalPrice}
              </td>
              <td className="py-3 px-2 sm:px-4">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-[6px] sm:text-xs font-bold tracking-wide break-words ${
                    order.Status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.Status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.Status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.Status}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>

  {/* Mobile Vertical Table (hidden on desktop) */}
  <div className="block md:hidden space-y-4">
    {loading ? (
      <p className="text-center py-6 text-gray-500 italic">
        Loading recent orders...
      </p>
    ) : orders.length === 0 ? (
      <p className="text-center py-6 text-gray-500 italic">
        No recent orders found.
      </p>
    ) : (
      orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-2 hover:bg-blue-50/50 transition-colors"
        >
          <p className="text-xs text-gray-500">Order ID:</p>
          <p className="font-mono text-sm font-semibold text-gray-700">
            #{order._id.slice(-6)}
          </p>

          <p className="text-xs text-gray-500">Customer:</p>
          <p className="text-gray-800 font-medium">{order.UserID?.Name || "Unknown"}</p>

          <p className="text-xs text-gray-500">Products:</p>
          <p className="text-gray-700 text-sm">
            {order.Products && order.Products.length > 0
              ? order.Products.map((p) => p.ProductID?.Title).filter(Boolean).join(", ")
              : "N/A"}
          </p>

          <p className="text-xs text-gray-500">Price:</p>
          <p className="text-blue-600 font-semibold">Rs. {order.TotalPrice}</p>

          <p className="text-xs text-gray-500">Status:</p>
          <span
            className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wide ${
              order.Status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.Status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.Status === "Cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {order.Status}
          </span>
        </div>
      ))
    )}
  </div>
</section>



    {/* Best Selling Products */}
    <section className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Best Selling Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {bestselling.length > 0 ? (
          bestselling.map((product) => (
            <div
              key={product.productId}
              className="bg-gray-50 border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.title}
                className="rounded-lg mb-3 w-full h-32 sm:h-40 object-contain"
                style={{ backgroundColor: product.BGColor }}
              />
              <h3 className="text-base sm:text-lg text-gray-800">{product.title}</h3>
              <div className="flex items-center flex-wrap gap-3 mt-2 text-sm sm:text-md">
                <p className="text-gray-700">Price: {product.price ? `$${product.price}` : "N/A"}</p>
                <p className="text-gray-700">Sold: {product.totalSold}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full italic">
            No best selling products found.
          </p>
        )}
      </div>
    </section>

  </div>
);

}

export default Dashboard;