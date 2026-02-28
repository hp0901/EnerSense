import React, { useEffect, useState } from "react";
import { getAllUsersApi } from "../services/operations/adminapi"

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsersApi();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔍 Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Users
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage registered EnerSense users.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Email</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Role</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Premium</th>
                  <th className="px-6 py-3 font-semibold text-gray-600">Joining Date</th>
                  <th className="px-6 py-3 font-semibold text-gray-600 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          user.isPremium
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {user.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center space-x-2">
                      <button className="px-3 py-1 bg-blue-200 hover:bg-gray-300 text-xs rounded">
                        Not Needed 
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageUsers;