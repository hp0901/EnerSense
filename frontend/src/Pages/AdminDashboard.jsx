import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  getDashboardStatsApi,
  getMonthlyRevenueApi,
} from "../services/operations/adminapi";

const AdminDashboard = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
    fetchMonthlyRevenue();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStatsApi();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonthlyRevenue = async () => {
    try {
      const data = await getMonthlyRevenueApi();
      setMonthlyData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-10 tracking-wide">
        🚀 Admin Dashboard
      </h1>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Total Users",
              value: stats.totalUsers,
              color: "from-blue-500 to-indigo-600",
            },
            {
              label: "Total Devices",
              value: stats.totalDevices,
              color: "from-emerald-500 to-teal-600",
            },
            {
              label: "Total Payments",
              value: stats.totalPayments,
              color: "from-pink-500 to-rose-600",
            },
            {
              label: "Total Revenue",
              value: `₹${stats.totalRevenue}`,
              color: "from-yellow-500 to-orange-600",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300`}
            >
              <p className="text-sm opacity-80">{card.label}</p>
              <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
        <h2 className="text-2xl font-semibold mb-6">
          📈 Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "10px",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#38bdf8"
              strokeWidth={4}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;