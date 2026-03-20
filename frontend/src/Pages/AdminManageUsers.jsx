import React, { useEffect, useState } from "react";
import { getAllUsersApi } from "../services/operations/adminapi";
import { FiMoreVertical, FiX } from "react-icons/fi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsersApi();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const userActions = [
  { label: "View Details", link: "/admin/view/page" },
  { label: "Make Admin", link: "#" },
  { label: "Remove Premium", link: "#" },
  { label: "Delete User", link: "#" },
];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Users
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage registered EnerSense users.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <input
            type="text"
            placeholder="Search users..."
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
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Premium</th>
                  <th className="px-6 py-3">Joining Date</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">

                    <td className="px-6 py-4">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="px-6 py-4">{user.email}</td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-200">
                        {user.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td
                      className="px-6 py-4 text-center relative"
                      onClick={(e) => e.stopPropagation()} // ⛔ prevent closing when clicking inside
                    >
                      <div className="flex justify-center items-center gap-2">

                        <button className="px-3 py-1 bg-blue-200 text-xs rounded">
                          Not Needed
                        </button>

                        {/* Toggle Icon */}
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === user._id ? null : user._id)
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {openMenu === user._id ? <FiX /> : <FiMoreVertical />}
                        </button>

                      </div>

                      {/* Dropdown */}
                      {openMenu === user._id && (
                        <div className="absolute right-6 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 text-left">

                         {userActions.map((action, index) => (
                          <a
                            key={index}
                            href={action.link}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => setOpenMenu(null)}
                          >
                            {action.label}
                          </a>
                          ))}
                        </div>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageUsers;