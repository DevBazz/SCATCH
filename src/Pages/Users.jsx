import { useEffect, useState } from "react";
import axios from "axios";


const Users = () => {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
       setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, Role: newRole } : user
        )
      );

      try {
         await axios.put(`http://localhost:3000/api/users/${userId}`, { newRole });
  }   catch (error) {
    console.error("Error updating user role:", error);
  }
}
    

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-[83vw] h-screen bg-gray-50 text-gray-900 p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-semibold">ID</th>
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Role</th>
              <th className="py-3 px-4 font-semibold">Manage</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-gray-600 font-mono">{user._id}</td>
                <td className="py-3 px-4">{user.Name}</td>
                <td className="py-3 px-4">{user.Email}</td>
                <td className="py-3 px-4 font-semibold text-gray-700">
                  {user.Role}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={user.Role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => alert("Edit functionality not implemented")}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-medium text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="m-auto mt-6 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded transition"
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
