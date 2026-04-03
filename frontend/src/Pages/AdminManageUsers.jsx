import React, { useEffect, useState } from "react";
import {
  getAllUsersApi,
  makeAdminApi,
  removeAdminApi,
} from "../services/operations/adminapi";
import { FiMoreVertical, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showModal) return;
      setOpenMenu(null);
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [showModal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusMap(() => {
        const newStatus = {};

        users.forEach((user) => {
          const statuses = ["online", "offline", "fault"];
          newStatus[user._id] =
            statuses[Math.floor(Math.random() * statuses.length)];
        });

        return newStatus;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [users]);

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

  const userActions = (user) => [
    { label: "View Details", link: "/admin/view/page/:id" },
    { label: user.role === "admin" ? "Remove Admin" : "Make Admin" },
    { label: "Remove Premium" },
    { label: "Delete User" },
  ];

  const getStatusColor = (user) => {
    // if (user.role === "MainAdmin") return "bg-red-500";
    // if (user.role === "admin") return "bg-blue-500";
    // return "bg-green-500";
  };

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

        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

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
                  <th className="px-6 py-3">Status</th> {/* ✅ added */}
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredUsers
                  .sort((a, b) => {
                    const order = { MainAdmin: 1, admin: 2, user: 3 };

                    if (order[a.role] !== order[b.role]) {
                      return order[a.role] - order[b.role];
                    }

                    if (a.role === "user" && b.role === "user") {
                      return new Date(a.createdAt) - new Date(b.createdAt);
                    }

                    return 0;
                  })
                  .map((user) => {
                    const status = statusMap[user._id];

                    return (
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
                          {new Date(user.createdAt).toLocaleDateString("en-GB")}
                        </td>

                        {/* ✅ STATUS COLUMN */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {status === "online" && (
                              <>
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span className="text-xs">Online</span>
                              </>
                            )}
                            {status === "fault" && (
                              <>
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                <span className="text-xs">Fault</span>
                              </>
                            )}
                            {status === "offline" && (
                              <>
                                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                <span className="text-xs">Offline</span>
                              </>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td
                          className="px-6 py-4 text-center relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-center items-center gap-3">

                            {user.role === "MainAdmin" ? (
                              <div
                                title="Main Admin cannot be modified"
                                className="text-red-500"
                              >
                                <FiX />
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  setOpenMenu(
                                    openMenu === user._id ? null : user._id
                                  )
                                }
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                {openMenu === user._id ? (
                                  <FiX />
                                ) : (
                                  <FiMoreVertical />
                                )}
                              </button>
                            )}
                          </div>

                          {openMenu === user._id && user.role !== "MainAdmin" && (
                            <div className="absolute right-6 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 text-left">

                              {userActions(user).map((action, index) => {
                                if (action.label === "View Details") {
                                  return (
                                    <Link
                                      key={index}
                                      to={`/admin/view/page/${user._id}`}
                                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                                      onClick={() => setOpenMenu(null)}
                                    >
                                      {action.label}
                                    </Link>
                                  );
                                }

                                return (
                                  <button
                                    key={index}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                    onClick={() => {
                                      setOpenMenu(null);
                                      setSelectedUser(user);
                                      setShowModal(true);
                                    }}
                                  >
                                    {action.label}
                                  </button>
                                );
                              })}

                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] shadow-xl">

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {selectedUser?.role === "admin"
                ? "Remove Admin"
                : "Promote to Admin"}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to{" "}
              {selectedUser?.role === "admin"
                ? "remove admin access from"
                : "make"}{" "}
              <span className="font-semibold">
                {selectedUser?.firstName}
              </span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    if (selectedUser.role === "admin") {
                      await removeAdminApi(selectedUser._id);

                      setUsers((prev) =>
                        prev.map((u) =>
                          u._id === selectedUser._id
                            ? { ...u, role: "user" }
                            : u
                        )
                      );
                    } else {
                      await makeAdminApi(selectedUser._id);

                      setUsers((prev) =>
                        prev.map((u) =>
                          u._id === selectedUser._id
                            ? { ...u, role: "admin" }
                            : u
                        )
                      );
                    }

                    setShowModal(false);
                  } catch (err) {
                    console.error(err);
                    alert(err);
                  }
                }}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;