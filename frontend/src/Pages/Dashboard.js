import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiZap,
  FiActivity,
  FiDollarSign,
  FiCpu,
  FiAlertTriangle,
} from "react-icons/fi";

import UsageEstimateChart from "../components/analytics/UsageEstimateChart.jsx";

const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#3F5480] text-white px-6 py-8 overflow-x-hidden">

      {/* Title */}

      <h1 className="text-3xl font-bold text-yellow-300 mb-8">
        Dashboard
      </h1>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 ">

        <StatCard icon={<FiZap />} label="Current Power" value="1.42 kW" />
        <StatCard icon={<FiActivity />} label="Today Usage" value="6.8 kWh" />
        <StatCard icon={<FiDollarSign />} label="Estimated Cost" value="₹52.40" />
        <StatCard icon={<FiCpu />} label="Device Status" value="Online" />

      </div>

      {/* Live Readings */}

      <section className="bg-[#8FA7C2] p-6 rounded-xl mb-10">

        <h2 className="text-xl font-semibold text-yellow-300 mb-4">
          Live Energy Readings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <Reading label="Voltage" value="230 V" />
          <Reading label="Current" value="6.2 A" />
          <Reading label="Power" value="1420 W" />
          <Reading label="Frequency" value="50 Hz" />

        </div>

      </section>

      {/* Analytics Section */}

      <section className="bg-[#8FA7C2] p-8 rounded-2xl mb-10 shadow-lg">

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

          <h2 className="text-xl font-semibold text-yellow-300">
            📊 Energy Usage Analytics
          </h2>

          <span className="text-xs bg-[#9FD487] text-[#1F2937] px-3 py-1 rounded-full">
            Live Data
          </span>

        </div>

        <div className="p-4 rounded-xl bg-[#4E6694]">

          <div className="w-full h-64">
            <UsageEstimateChart />
          </div>

        </div>

        {/* Info cards */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center">

          <div className="bg-[#9FD487] p-4 rounded-xl text-[#1F2937]">
            <p className="text-sm">Peak Usage</p>
            <p className="text-lg font-semibold">3.9 kWh ⚡</p>
          </div>

          <div className="bg-[#E3EDC2] p-4 rounded-xl text-[#1F2937]">
            <p className="text-sm">Average Usage</p>
            <p className="text-lg font-semibold">2.1 kWh 📊</p>
          </div>

          <div className="bg-[#9FD487] p-4 rounded-xl text-[#1F2937]">
            <p className="text-sm">Energy Saved</p>
            <p className="text-lg font-semibold">12% 🌱</p>
          </div>

        </div>

        <p className="mt-6 text-sm text-[#E3EDC2] text-center">
          Monitor electricity consumption trends and optimize energy usage in real time.
        </p>

        <div className="flex justify-center mt-6">

          <Link
            to="/energy-analytics"
            className="bg-[#9FD487] text-[#1F2937] px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300"
          >
            ⚡ View Detailed Analytics
          </Link>

        </div>

      </section>

      {/* Alerts */}

      <section className="bg-[#8FA7C2] p-6 rounded-2xl shadow-lg">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-semibold text-[#E3EDC2]">
            🔔 Alerts & Notifications
          </h2>

          <span className="text-xs bg-[#9FD487] text-[#1F2937] px-3 py-1 rounded-full">
            1 Active Alert
          </span>

        </div>

        <div className="flex items-start gap-4 bg-[#E3EDC2] text-[#1F2937] p-4 rounded-xl">

          <div className="text-xl mt-1">
            <FiAlertTriangle />
          </div>

          <div className="flex-1">

            <p className="font-medium">
              High energy usage detected during peak hours ⚡
            </p>

            <p className="text-sm mt-1">
              Energy consumption exceeded normal threshold between 6PM - 9PM.
            </p>

            <p className="text-xs mt-2">
              ⏱ Detected 5 minutes ago
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

/* Components */

const StatCard = ({ icon, label, value }) => (
  <div className="bg-[#8FA7C2] p-6 rounded-xl flex items-center gap-4">

    <div className="text-[#E3EDC2] text-2xl">
      {icon}
    </div>

    <div>
      <p className="text-[#E3EDC2] text-sm">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>

  </div>
);

const Reading = ({ label, value }) => (
  <div className="bg-[#4E6694] p-4 rounded-lg text-center">

    <p className="text-sm text-[#E3EDC2]">{label}</p>

    <p className="text-lg font-semibold text-white">
      {value}
    </p>

  </div>
);

export default Dashboard;