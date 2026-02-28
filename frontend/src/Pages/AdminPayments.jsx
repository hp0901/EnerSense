import React, { useEffect, useState } from "react";
import { getAllPaymentsApi } from "../services/operations/adminapi";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getAllPaymentsApi();
      setPayments(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 📊 Summary Calculations
  const totalRevenue = payments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);

 const activePremiumUsers = new Set(
  payments
    .filter((p) => {
      if (p.status !== "success") return false;

      const paidDate = new Date(p.paidAt);
      const now = new Date();

      let expiryDate = new Date(paidDate);

      if (p.plan === "1-month")
        expiryDate.setMonth(expiryDate.getMonth() + 1);

      if (p.plan === "6-month")
        expiryDate.setMonth(expiryDate.getMonth() + 6);

      if (p.plan === "1-year")
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      return expiryDate > now;
    })
    .map((p) => p.user?._id)
    ).size;

  const pendingPayments = payments.filter(
    (p) => p.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Payments & Subscriptions
          </h1>
          <p className="text-gray-500 mt-1">
            View premium subscriptions and payment activity.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold text-green-600 mt-2">
              ₹{totalRevenue.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500 text-sm">Active Premium Users</p>
            <h2 className="text-2xl font-bold text-blue-600 mt-2">
              {activePremiumUsers}
            </h2>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500 text-sm">Pending Payments</p>
            <h2 className="text-2xl font-bold text-red-500 mt-2">
              {pendingPayments}
            </h2>
          </div>

        </div>

        {/* Payments Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm text-left">
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

                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {payment.user?.firstName} {payment.user?.lastName || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {payment.plan}
                    </td>

                    <td className="px-6 py-4 text-gray-800">
                      ₹{payment.amount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          payment.status === "success"
                            ? "bg-green-100 text-green-600"
                            : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))}

                {payments.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500"
                    >
                      No payments found.
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

export default AdminPayments;