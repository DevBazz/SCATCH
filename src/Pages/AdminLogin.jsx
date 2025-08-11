import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
      setMessage("Login successful!");
      // store token in localStorage if needed
      // localStorage.setItem("token", res.data.token);
       navigate("/")      
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h1>
        {message && <p className="text-yellow-400 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none"
            required
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800 text-white focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold p-3 rounded"
          >
            Login
          </button>
          <div className="text-center mt-4">
              <Link to="/admin/signup" className="text-yellow-400 hover:underline">
                Don't have an account? Sign Up
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
