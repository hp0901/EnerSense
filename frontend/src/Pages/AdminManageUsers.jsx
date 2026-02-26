import React from "react";

const ManageUsers = () => {
  return (
    <>

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-6xl mx-auto">

          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Manage Users
              </h1>
              <p className="text-gray-500 mt-1">
                View and manage registered EnerSense users.
              </p>
            </div>

            <span className="px-4 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              Static Preview
            </span>
          </div>

          {/* Search Bar (UI only) */}
          <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <input
              type="text"
              placeholder="Search users by name or email..."
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Users Table */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">

            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-600 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">

                {/* Example Row 1 */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    Harsh Patel
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    hp9****18@gmail.com
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                      Admin
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-300 text-white text-xs rounded cursor-not-allowed"
                    >
                      Edit
                    </button>
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-300 text-white text-xs rounded cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Example Row 2 */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    Test User
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    testuser@email.com
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                      User
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Premium
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-300 text-white text-xs rounded cursor-not-allowed"
                    >
                      Edit
                    </button>
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-300 text-white text-xs rounded cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>

          </div>

        </div>
      </div>
    </>
  );
};

export default ManageUsers;