import { useState } from "react";
import axios from "axios";
import { FaUserCog, FaLock, FaPaintBrush, FaDatabase } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Profile form data
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Image: null,
  });

  // Handle text input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      Image: e.target.files[0],
    });
  };

  // Submit profile update
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("Name", formData.Name);
      data.append("Email", formData.Email);
      data.append("Password", formData.Password);
      if (formData.Image) data.append("Image", formData.Image);

      const res = await axios.put(
        "http://localhost:3000/api/users/updateAdmin",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Update successful:", res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="w-full md:w-[83vw] min-h-screen bg-zinc-900 text-white p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">Settings</h1>

      {/* Profile Settings */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaUserCog className="text-xl" />
          <h2 className="text-lg sm:text-xl font-semibold">Profile Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <input
            type="text"
            name="Name"
            placeholder="Admin Name"
            value={formData.Name}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded w-full focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded w-full focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="password"
            name="Password"
            placeholder="New Password"
            value={formData.Password}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded w-full focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="file"
            name="Image"
            onChange={handleFileChange}
            className="bg-zinc-800 p-3 rounded w-full"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded w-full sm:w-auto"
        >
          Save Changes
        </button>
      </section>

      {/* Dashboard Preferences */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaPaintBrush className="text-xl" />
          <h2 className="text-lg sm:text-xl font-semibold">
            Dashboard Preferences
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex items-center justify-between sm:justify-start sm:gap-3">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </label>

          <label className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span className="mb-2 sm:mb-0">Items Per Page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              className="bg-zinc-800 p-2 rounded w-full sm:w-auto"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>
      </section>

      {/* Security Settings */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaLock className="text-xl" />
          <h2 className="text-lg sm:text-xl font-semibold">Security</h2>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex items-center justify-between sm:justify-start sm:gap-3">
            <span>Two-Factor Authentication</span>
            <input
              type="checkbox"
              checked={twoFA}
              onChange={() => setTwoFA(!twoFA)}
            />
          </label>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center justify-center sm:justify-start gap-2 w-full sm:w-max">
            <FiLogOut /> Logout All Devices
          </button>
        </div>
      </section>

      {/* Backup & Reset */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaDatabase className="text-xl" />
          <h2 className="text-lg sm:text-xl font-semibold">Backup & Reset</h2>
        </div>
        <div className="flex flex-col gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full sm:w-max">
            Export Data (JSON)
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded w-full sm:w-max">
            Reset to Default
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
