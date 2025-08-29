import { useState } from "react";
import UserSidebar from "../../components/UserSideBar";


const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, New York, NY",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
      <UserSidebar />
      <main className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Update Profile
          </button>
        </form>
      </main>
    </div>
  );
};

export default Profile;
