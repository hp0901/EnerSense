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

  const StatCard = ({ icon, label, value }) => (
  <div className="bg-[#4E6694] p-4 rounded-lg flex items-center gap-3">

    <div className="text-yellow-400 text-xl">
      {icon}
    </div>

    <div>
      <p className="text-sm text-[#E3EDC2]">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>

  </div>
);

const Reading = ({ icon, label, value }) => (
  <div className="bg-[#4E6694] p-4 rounded-lg flex items-center gap-3">

    <div className="text-yellow-400 text-xl">
      {icon}
    </div>

    <div>
      <p className="text-sm text-[#E3EDC2]">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>

  </div>
);

  
return (
  <div className="min-h-screen  bg-gradient-to-br from-[#1e293b] to-[#1e293b]   text-white px-6 py-8 overflow-x-hidden">

    <h1 className="text-3xl font-bold text-green-400 mb-8">
      Dashboard
    </h1>

    {/* KPI Cards */}

   <section className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-10">
      <h2 className="text-xl font-semibold  mb-4 ">
        Key Performance Indicators
      </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <StatCard icon={<FiZap />} label="Current Power" value="1.42 kW" />
      <StatCard icon={<FiActivity />} label="Today Usage" value="6.8 kWh" />
      <StatCard icon={<FiDollarSign />} label="Estimated Cost" value="₹52.40" />
      <StatCard icon={<FiCpu />} label="Device Status" value="Online" />

    </div>
</section>
    {/* Live Readings */}

       <section className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-10">

          <h2 className="text-xl font-semibold  mb-4">
            Live Energy Readings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <Reading icon={<FiZap />} label="Voltage" value="230 V" />
            <Reading icon={<FiActivity />} label="Current" value="6.2 A" />
            <Reading icon={<FiZap />} label="Power" value="1420 W" />
            <Reading icon={<FiCpu />} label="Frequency" value="50 Hz" />

          </div>

        </section>


    {/* Live Readings */}

    <section className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl mb-10 shadow-xl ">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
      ⚡ Energy Usage Analytics
    </h2>

    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
      Live Data
    </span>

  </div>

  {/* Graph */}

  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">

    <h3 className="text-center text-yellow-400 font-semibold mb-4">
      Usage Estimate
    </h3>

    <div className="w-full h-70">
      <UsageEstimateChart />
    </div>

  </div>

  {/* Stats Cards */}

  <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="bg-green-500/20 border border-green-500/20 p-5 rounded-xl text-center">
      <p className="text-gray-400 text-sm">Peak Usage</p>
      <p className="text-xl font-semibold text-green-400">
        3.9 kWh ⚡
      </p>
    </div>

    <div className="bg-yellow-500/20 border border-yellow-500/20 p-5 rounded-xl text-center">
      <p className="text-gray-400 text-sm">Average Usage</p>
      <p className="text-xl font-semibold text-yellow-300">
        2.1 kWh 📊
      </p>
    </div>

    <div className="bg-emerald-500/20 border border-emerald-500/20 p-5 rounded-xl text-center">
      <p className="text-gray-400 text-sm">Energy Saved</p>
      <p className="text-xl font-semibold text-emerald-400">
        12% 🌱
      </p>
    </div>

  </div>

  <p className="text-center text-gray-400 mt-6">
    Monitor electricity consumption trends and optimize energy usage in real time.
  </p>

  <div className="flex justify-center mt-6">

    <Link
      to="/energy-analytics"
      className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg text-white font-medium transition-all"
    >
      ⚡ View Detailed Analytics
    </Link>

  </div>

</section>

    {/* Alerts */}

    <section className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold text-white">
          Alerts & Notifications
        </h2>

        <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
          1 Active Alert
        </span>

      </div>

      <div className="flex items-start gap-4 bg-yellow-500/10 border border-yellow-400/20 text-yellow-200 p-4 rounded-xl">

        <div className="text-xl mt-1">
          <FiAlertTriangle />
        </div>

        <div className="flex-1">

          <p className="font-medium">
            High energy usage detected during peak hours ⚡
          </p>

          <p className="text-sm mt-1 text-gray-300">
            Energy consumption exceeded normal threshold between 6PM - 9PM.
          </p>

          <p className="text-xs mt-2 text-gray-400">
            ⏱ Detected 5 minutes ago
          </p>

        </div>

      </div>

    </section>

  </div>
);
};

export default Dashboard;