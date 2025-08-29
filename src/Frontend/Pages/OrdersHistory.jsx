import UserSidebar from "../../components/UserSideBar";


const OrdersHistory = () => {
  const orders = [
    {
      id: "ORD-1001",
      date: "Aug 20, 2025",
      total: "$546",
      status: "Shipped",
    },
    {
      id: "ORD-1002",
      date: "Aug 10, 2025",
      total: "$220",
      status: "Delivered",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
      <UserSidebar />
      <main className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.total}</td>
                  <td className="py-3 px-4">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default OrdersHistory;
