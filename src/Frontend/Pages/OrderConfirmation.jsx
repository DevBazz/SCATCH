import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  // Example data (replace with backend order response)
  const order = {
    id: "ORD-98234",
    date: "Aug 22, 2025",
    total: 766,
    shipping: {
      name: "John Doe",
      address: "123 Main St, New York, NY 10001, USA",
    },
    items: [
      {
        id: 1,
        name: "Classic Easy Zipper Tote",
        price: 298,
        quantity: 1,
        img: "/images/tote.jpg",
      },
      {
        id: 2,
        name: "Concertina Phone Bag",
        price: 248,
        quantity: 2,
        img: "/images/phone-bag.jpg",
      },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-16 text-center">
      {/* Success Message */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        🎉 Thank You for Your Purchase!
      </h1>
      <p className="text-gray-600 mb-12">
        Your order has been confirmed. We’ve sent a confirmation email with your order details.
      </p>

      {/* Order Details */}
      <div className="bg-gray-100 p-8 rounded-lg max-w-3xl mx-auto text-left">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-600">Order Number</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Date</p>
            <p className="font-medium">{order.date}</p>
          </div>
          <div>
            <p className="text-gray-600">Shipping To</p>
            <p className="font-medium">{order.shipping.name}</p>
            <p className="text-sm text-gray-600">{order.shipping.address}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Amount</p>
            <p className="font-medium">${order.total.toFixed(2)}</p>
          </div>
        </div>

        {/* Product List */}
        <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex justify-center gap-6">
        <Link
          to="/shop"
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="px-6 py-3 border rounded-md hover:bg-gray-100 transition"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
