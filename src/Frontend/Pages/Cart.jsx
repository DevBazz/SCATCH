import { useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
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
  ]);

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6"
              >
                {/* Product Image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md"
                />

                {/* Product Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 items-center">
                  <Link
                    to={`/product/${item.id}`}
                    className="text-sm flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <FaEye /> View
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm flex items-center gap-1 text-red-600 cursor-pointer"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-lg font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>$20.00</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>${(subtotal * 0.1).toFixed(2)}</span>
        </div>
        <div className="border-t my-4"></div>
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>${(subtotal + 20 + subtotal * 0.1).toFixed(2)}</span>
        </div>
        <Link to={"/checkout"}>
        <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition cursor-pointer">
          Checkout
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
