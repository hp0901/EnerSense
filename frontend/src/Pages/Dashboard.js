import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiZap,
  FiActivity,
  FiDollarSign,
  FiCpu,
  FiAlertTriangle,
} from "react-icons/fi";


import { Link } from "react-router-dom";
import UsageEstimateChart from "../components/analytics/UsageEstimateChart.jsx";


/* ================= DASHBOARD ================= */

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ AUTH CHECK (Prevents redirect loop)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Optional: you can later verify token with backend here
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-8 overflow-x-hidden">

      <h1 className="text-3xl font-bold text-green-400 mb-8">
        Dashboard
      </h1>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<FiZap />} label="Current Power" value="1.42 kW" />
        <StatCard icon={<FiActivity />} label="Today Usage" value="6.8 kWh" />
        <StatCard icon={<FiDollarSign />} label="Estimated Cost" value="₹52.40" />
        <StatCard icon={<FiCpu />} label="Device Status" value="Online" />
      </div>

      {/* ================= LIVE MONITORING ================= */}
      <section className="bg-[#020617] p-6 rounded-xl mb-10">
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Live Energy Readings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-slate-300">
          <Reading label="Voltage" value="230 V" />
          <Reading label="Current" value="6.2 A" />
          <Reading label="Power" value="1420 W" />
          <Reading label="Frequency" value="50 Hz" />
        </div>
      </section>

      {/* ================= ENERGY USAGE GRAPH ================= */}
      <section className="bg-[#020617] p-8 rounded-2xl mb-10 border border-white/5 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-green-400 flex items-center gap-2">
            📊 Energy Usage Analytics
          </h2>

          <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
            Live Data
          </span>
        </div>

        {/* Chart */}
        <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5">
          <div className="w-full h-64">
            <UsageEstimateChart />
          </div>
        </div>

        {/* Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center">

          <div className="bg-[#0f172a] p-4 rounded-lg border border-white/5">
            <p className="text-sm text-slate-400">Peak Usage</p>
            <p className="text-lg font-semibold text-green-400">3.9 kWh ⚡</p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg border border-white/5">
            <p className="text-sm text-slate-400">Average Usage</p>
            <p className="text-lg font-semibold text-blue-400">2.1 kWh 📊</p>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg border border-white/5">
            <p className="text-sm text-slate-400">Energy Saved</p>
            <p className="text-lg font-semibold text-green-400">12% 🌱</p>
          </div>

        </div>

        {/* Description */}
        <p className="mt-5 text-sm text-slate-400 text-center">
          Monitor electricity consumption trends and optimize energy usage in real time.
        </p>

        {/* Button */}
        <div className="flex justify-center mt-6">
          <Link
            to="/energy-analytics"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            ⚡ View Detailed Analytics
          </Link>
        </div>

      </section>

     
      {/* ================= ALERTS ================= */}
    <section className="bg-[#020617] p-6 rounded-2xl border border-white/5 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-green-400 flex items-center gap-2">
          🔔 Alerts & Notifications
        </h2>

        <span className="text-xs bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full">
          1 Active Alert
        </span>
      </div>

      {/* Alert Card */}
      <div className="flex items-start gap-4 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl hover:bg-yellow-500/20 transition">

        <div className="text-yellow-400 text-xl mt-1">
          <FiAlertTriangle />
        </div>

        <div className="flex-1">
          <p className="text-yellow-300 font-medium">
            High energy usage detected during peak hours ⚡
          </p>

          <p className="text-sm text-slate-400 mt-1">
            Energy consumption exceeded normal threshold between 6PM - 9PM.
          </p>

          <p className="text-xs text-slate-500 mt-2">
            ⏱ Detected 5 minutes ago
          </p>
        </div>

        {/* Status */}
        <span className="text-xs bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full">
          Warning
        </span>

      </div>

    </section>
        </div>
      );
    };

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ icon, label, value }) => (
  <div className="bg-gray-700 p-6 rounded-xl flex items-center gap-4">
    <div className="text-green-400 text-2xl">{icon}</div>
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const Reading = ({ label, value }) => (
  <div className="bg-[#0f172a] p-4 rounded-lg text-center">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default Dashboard;