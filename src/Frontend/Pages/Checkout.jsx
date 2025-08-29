import { useState } from "react";

const Checkout = () => {
  const cartItems = [
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
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 20;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! 🎉");
  };

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Checkout Form */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={form.cardNumber}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                value={form.cvc}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t my-4"></div>
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
