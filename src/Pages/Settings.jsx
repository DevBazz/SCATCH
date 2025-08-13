import { useState } from 'react';
import axios from 'axios';
import { FaUserCog, FaLock, FaPaintBrush, FaDatabase } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Profile form data
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
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
      image: e.target.files[0],
    });
  };

  // Submit profile update
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('Name', formData.name);
      data.append('Email', formData.email);
      data.append('Password', formData.password);
      if (formData.image) data.append('Image', formData.image);

      const res = await axios.put('http://localhost:3000/api/users/updateAdmin', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      console.log('Update successful:', res.data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="w-[83vw] min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Profile Settings */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaUserCog className="text-xl" />
          <h2 className="text-xl font-semibold">Profile Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="Name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded w-full"
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded w-full"
          />
          <input
            type="password"
            name="Password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-zinc-800 p-3 rounded w-full"
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
          className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </section>

      {/* Dashboard Preferences */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaPaintBrush className="text-xl" />
          <h2 className="text-xl font-semibold">Dashboard Preferences</h2>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </label>

          <label className="flex items-center gap-3">
            <span>Items Per Page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              className="bg-zinc-800 p-2 rounded"
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
          <h2 className="text-xl font-semibold">Security</h2>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3">
            <span>Two-Factor Authentication</span>
            <input
              type="checkbox"
              checked={twoFA}
              onChange={() => setTwoFA(!twoFA)}
            />
          </label>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2 w-max">
            <FiLogOut /> Logout All Devices
          </button>
        </div>
      </section>

      {/* Backup & Reset */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <FaDatabase className="text-xl" />
          <h2 className="text-xl font-semibold">Backup & Reset</h2>
        </div>
        <div className="flex flex-col gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-max">
            Export Data (JSON)
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded w-max">
            Reset to Default
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
