import React, { useState } from "react";
import {
  FiZap,
  FiActivity,
  FiDollarSign,
  FiCpu,
  FiAlertTriangle,
} from "react-icons/fi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ================= ENERGY DATA ================= */

const dailyEnergyData = [
  { time: "6 AM", energy: 1.2 },
  { time: "9 AM", energy: 2.4 },
  { time: "12 PM", energy: 3.8 },
  { time: "3 PM", energy: 3.2 },
  { time: "6 PM", energy: 5.1 },
  { time: "9 PM", energy: 4.6 },
];

/* ================= DASHBOARD ================= */

const Dashboard = () => {
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
      <section className="bg-[#020617] p-6 rounded-xl mb-10">
        <h2 className="text-xl font-semibold text-green-400 mb-4 text-center">
          Energy Usage Analytics
        </h2>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyEnergyData}
              margin={{
                top: 20,
                right: 30,
                left: 70,
                bottom: 55,
              }}
            >
              <CartesianGrid
                stroke="#1e293b"
                strokeDasharray="4 6"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                tick={{ fill: "#cbd5f5", fontSize: 12 }}
                label={{
                  value: "Time of Day",
                  position: "bottom",
                  offset: 40,
                  fill: "#cbd5f5",
                  fontSize: 13,
                }}
              />

              <YAxis
                width={60}
                stroke="#94a3b8"
                tick={{ fill: "#cbd5f5", fontSize: 12 }}
                tickMargin={8}
                label={{
                  value: "Energy Consumption (kWh)",
                  angle: -90,
                  position: "left",
                  offset: 40,
                  style: {
                    fontSize: 13,
                    fill: "#cbd5f5",
                    fontWeight: 500,
                  },
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#020617",
                  border: "1px solid #334155",
                  borderRadius: "6px",
                  color: "#e5e7eb",
                  fontSize: "12px",
                }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  paddingTop: "18px",
                  fontSize: "13px",
                  color: "#22c55e",
                }}
              />

              <Line
                type="monotone"
                dataKey="energy"
                name="Energy Used (kWh)"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4, fill: "#020617", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-3 text-sm text-slate-400 text-center">
          Electricity consumption throughout the day.  
          X-axis represents time and Y-axis shows energy usage in kilowatt-hours (kWh).
        </p>
      </section>

      {/* ================= ALERTS ================= */}
      <section className="bg-[#020617] p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Alerts & Notifications
        </h2>

        <div className="flex items-center gap-3 text-yellow-400">
          <FiAlertTriangle />
          <span>High energy usage detected during peak hours</span>
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
