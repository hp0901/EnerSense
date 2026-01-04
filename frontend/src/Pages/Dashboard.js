import React from "react";
import {
  FiZap,
  FiActivity,
  FiDollarSign,
  FiCpu,
  FiAlertTriangle,
} from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="min-h-screen  h-full overflow-x-hidden  bg-[#0f172a] text-white px-6 py-8">

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

      {/* ================= GRAPH PLACEHOLDER ================= */}
      <section className="bg-[#020617] p-6 rounded-xl mb-10">
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Energy Usage Analytics
        </h2>

        <div className="h-56 flex items-center justify-center border border-white/10 rounded-lg text-slate-400">
          📊 Energy graph will be displayed here
        </div>
      </section>

      {/* ================= ALERTS ================= */}
      <section className="bg-[#020617] p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Alerts & Notifications
        </h2>

        <div className="flex items-center mb-10 gap-3 text-yellow-400">
          <FiAlertTriangle />
          <span >High energy usage detected during peak hours</span>
        </div>
      </section>

    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ icon, label, value }) => (
  <div className="bg-[#020617] p-6 rounded-xl flex items-center gap-4">
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
