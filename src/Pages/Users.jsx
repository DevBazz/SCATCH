import { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage

  useEffect(() => {
    fetchUsers();
  }, []);

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)


  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/users');
      setUsers(res.data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditMode(true);
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditMode(false);
    setSelectedUser(null);
  };

  const handlePrev = () => {
    if(currentPage > 1) return setCurrentPage(prev => prev - 1)
  }

  const handleNext = () => {
    if(currentPage < totalPages) return setCurrentPage(prev => prev + 1)
  }

  return (
    <div className="w-[83vw] h-screen bg-[#0f172a] text-white p-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      {editMode && selectedUser ? (
        <div className="mb-8 bg-gray-800 p-4 rounded">
          <h2 className="text-xl mb-4">Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(selectedUser);
            }}
            className="grid grid-cols-2 gap-4"
          >
            <input
              className="p-2 rounded text-black"
              type="text"
              value={selectedUser.firstName}
              onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
              placeholder="First Name"
            />
            <input
              className="p-2 rounded text-black"
              type="text"
              value={selectedUser.lastName}
              onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
              placeholder="Last Name"
            />
            <input
              className="p-2 rounded text-black"
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              placeholder="Email"
            />
            <button type="submit" className="col-span-2 bg-blue-600 p-2 rounded hover:bg-blue-700">
              Update User
            </button>
          </form>
        </div>
      ) : null}

      <table className="w-full table-auto text-left border border-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-t border-gray-700">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.firstName} {user.lastName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phone}</td>
              <td className="p-3 space-x-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        
                <div className="m-auto mt-3 mb-4 flex justify-center items-center gap-4 text-white">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-teal-500 hover:bg-white hover:text-black disabled:opacity-50 rounded"
        >
          Previous
        </button>

        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-teal-500 hover:bg-white hover:text-black disabled:opacity-50 rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default UsersPage;
