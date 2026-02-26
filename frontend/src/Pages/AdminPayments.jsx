import React from "react";

const AdminPayments = () => {
  return (
    <>

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Payments & Subscriptions
              </h1>
              <p className="text-gray-500 mt-1">
                View premium subscriptions and payment activity.
              </p>
            </div>

            <span className="px-4 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
              Static Preview
            </span>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white shadow-md rounded-xl p-6">
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-2xl font-bold text-green-600 mt-2">
                ₹12,500
              </h2>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <p className="text-gray-500 text-sm">Active Premium Users</p>
              <h2 className="text-2xl font-bold text-blue-600 mt-2">
                34
              </h2>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
              <p className="text-gray-500 text-sm">Pending Payments</p>
              <h2 className="text-2xl font-bold text-red-500 mt-2">
                2
              </h2>
            </div>

          </div>

          {/* Payments Table */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">

            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    User
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    Plan
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 font-semibold text-gray-600">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">

                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    Harsh Patel
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    1-Month Premium
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    ₹299
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    05 Mar 2026
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    Test User
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    1-Month Premium
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    ₹299
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    10 Mar 2026
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

export default AdminPayments;