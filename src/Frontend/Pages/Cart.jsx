import { Link } from "react-router-dom";
import { FaTrash, FaEye, FaShoppingBag } from "react-icons/fa";
import useCartStore from "../../store/cartStore";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalAmount } =
    useCartStore();

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
          <FaShoppingBag className="text-gray-700" /> Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl shadow-inner">
            <p className="text-gray-600 mb-4 text-lg">Your cart is empty 🛒</p>
            <Link
              to="/shop"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => {
              const discount = item.Discount || 0;
              const discountedPrice = item.Price
                ? (item.Price - item.Price * (discount / 100)).toFixed(2)
                : item.Price;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-6 border rounded-xl p-5 shadow-sm hover:shadow-md transition-all bg-white"
                >
                  {/* Product Image */}
                  <img
                    src={item.Image || "/placeholder.png"}
                    alt={item.Title}
                    className="w-32 h-32 object-contain rounded-md bg-gray-100"
                  />

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.Title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.Description?.slice(0, 60)}...
                    </p>
                    <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                      {discount > 0 && (
                        <span className="text-red-500 text-sm font-medium bg-red-100 px-2 py-0.5 rounded-md">
                          -{discount}%
                        </span>
                      )}
                      <p className="text-lg font-semibold text-green-500">
                        ${discountedPrice}
                      </p>
                      {discount > 0 && (
                        <p className="text-gray-400 line-through text-sm">
                          ${item.Price}
                        </p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-700 font-bold"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 border rounded-md hover:bg-gray-100 text-gray-700 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Actions + Total */}
                  <div className="flex flex-col gap-4 items-center">
                    <Link
                      to={`/shop/products/${item.id}`}
                      className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
                    >
                      <FaEye /> View
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1 text-red-600 text-sm hover:text-red-700"
                    >
                      <FaTrash /> Remove
                    </button>
                    <div className="text-lg font-semibold text-gray-800 mt-1">
                      ${(discountedPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700 mb-6">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/checkout">
              <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition shadow">
                Proceed to Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="w-full border border-gray-400 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
