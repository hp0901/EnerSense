import React from "react";
import { Link } from "react-router-dom";


const Admin = () => {
  return (
    <>

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h1 className="text-3xl font-bold text-red-600">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome to the EnerSense Admin Panel.
              Only authorized administrators can access this section.
            </p>
          </div>

          {/* Simple Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Manage Users</h2>
              <p className="text-sm text-gray-500 mb-4">
                View and manage registered users.
              </p>
              <Link
                to="/admin/manage-users"
                className="text-blue-600 hover:underline"
              >
                View Users →
              </Link>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Send Bulk Email</h2>
              <p className="text-sm text-gray-500 mb-4">
                Send emails to all registered users.
              </p>
              <Link to="/admin/send-bulk-email" className="text-blue-600 hover:underline mt-2 block">
                Send Bulk Email →
              </Link>
            </div>  

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Devices</h2>
              <p className="text-sm text-gray-500 mb-4">
                Monitor and control connected devices.
              </p>
              <Link
                to="/admin/create-unique-id"
                className="text-blue-600 hover:underline"
              >
                Manage Devices →
              </Link>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Payments</h2>
              <p className="text-sm text-gray-500 mb-4">
                View premium subscriptions and payments.
              </p>
              <Link
                to="/admin/payments"
                className="text-blue-600 hover:underline"
              >
                View Payments →
              </Link>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Admin;