import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiZap,
  FiActivity,
  FiDollarSign,
  FiCpu,
  FiAlertTriangle,
} from "react-icons/fi";

import Footer from "../Footer/Footer.js";
import UsageEstimateChart from "../components/analytics/UsageEstimateChart.jsx";
import {
  getMyDevicesApi,
  getLatestTelemetryApi,
} from "../services/operations/deviceApi";

const Dashboard = () => {
  const navigate = useNavigate();

  // ================= LIVE STATE =================
  const [power, setPower] = useState(0); // Watts
  const [voltage, setVoltage] = useState(0); // Volts
  const [current, setCurrent] = useState(0); // Amps
  const [todayUsage, setTodayUsage] = useState(0); // kWh
  const [estimatedCost, setEstimatedCost] = useState(0); // ₹
  const [deviceStatus, setDeviceStatus] = useState("Offline");
  const [activeAlerts, setActiveAlerts] = useState([]);

  // ================= AUTH GUARD =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // ================= FETCH REAL-TIME TELEMETRY =================
  useEffect(() => {
    const fetchLiveDashboardData = async () => {
      try {
        const res = await getMyDevicesApi();
        const devices = res?.devices || res || [];

        if (devices.length === 0) {
          setDeviceStatus("No Devices");
          setPower(0);
          setVoltage(0);
          setCurrent(0);
          return;
        }

        let totalPower = 0;
        let totalCurrent = 0;
        let latestVoltage = 0;
        let onlineCount = 0;

        // Fetch telemetry for each paired device in parallel
        await Promise.all(
          devices.map(async (dev) => {
            try {
              const telRes = await getLatestTelemetryApi(dev.deviceId);
              const telemetry = telRes?.telemetry || {};

              const v = Number(telemetry.voltage || 0);
              const c = Number(telemetry.current || 0);
              const p = Number(telemetry.power || 0);
              const isRelayOn =
                telemetry.relayState ?? dev.relayState ?? false;

              if (isRelayOn || v > 0) onlineCount++;

              totalPower += p;
              totalCurrent += c;
              if (v > 0) latestVoltage = v; // Primary line voltage
            } catch (err) {
              console.error(`Telemetry fetch error for ${dev.deviceId}:`, err);
            }
          })
        );

        // Update Live Metrics
        setPower(Math.round(totalPower));
        setVoltage(latestVoltage);
        setCurrent(totalCurrent.toFixed(2));
        setDeviceStatus(
          onlineCount > 0 ? `${onlineCount} Online` : "Offline"
        );

        // Accumulate Energy Consumption (kWh) over 2s interval
        const incrementKWh = totalPower / 1800000;
        setTodayUsage((prev) => +(prev + incrementKWh).toFixed(3));

        // Cost Calculation (Average ₹7 per kWh unit)
        setEstimatedCost((prev) => +(prev + incrementKWh * 7).toFixed(2));

        // Dynamic Alerts Check
        const alerts = [];
        if (latestVoltage > 260) {
          alerts.push({
            title: "High Voltage Warning ⚠️",
            message: `Line voltage spiked to ${latestVoltage}V! High risk to appliances.`,
            time: "Just now",
          });
        } else if (latestVoltage > 0 && latestVoltage < 150) {
          alerts.push({
            title: "Low Voltage Alert ⚡",
            message: `Line voltage dropped to ${latestVoltage}V! Under-voltage condition detected.`,
            time: "Just now",
          });
        }

        if (totalPower > 3000) {
          alerts.push({
            title: "High Power Consumption ⚡",
            message: `Total load exceeded threshold at ${(totalPower / 1000).toFixed(2)} kW during peak operations.`,
            time: "Just now",
          });
        }

        setActiveAlerts(alerts);
      } catch (error) {
        console.error("Dashboard Sync Error:", error);
      }
    };

    fetchLiveDashboardData();
    const interval = setInterval(fetchLiveDashboardData, 2000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon, label, value }) => (
    <div className="bg-[#4E6694] p-4 rounded-lg flex items-center gap-3">
      <div className="text-yellow-400 text-xl">{icon}</div>
      <div>
        <p className="text-sm text-[#E3EDC2]">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );

  const Reading = ({ icon, label, value }) => (
    <div className="bg-[#4E6694] p-4 rounded-lg flex items-center gap-3">
      <div className="text-yellow-400 text-xl">{icon}</div>
      <div>
        <p className="text-sm text-[#E3EDC2]">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] to-[#1e293b] text-white px-6 py-8 overflow-x-hidden">
      <h1 className="text-3xl font-bold text-green-400 mb-8">Dashboard</h1>

      {/* KPI Cards */}
      <section className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FiZap />}
            label="Current Power"
            value={`${(power / 1000).toFixed(2)} Watts`}
          />
          <StatCard
            icon={<FiActivity />}
            label="Today Usage"
            value={`${todayUsage} Wh`}
          />
          <StatCard
            icon={<FiDollarSign />}
            label="Estimated Cost"
            value={`₹ ${estimatedCost}`}
          />
          <StatCard
            icon={<FiCpu />}
            label="Device Status"
            value={deviceStatus}
          />
        </div>
      </section>

      {/* Live Energy Readings */}
      <section className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-10">
        <h2 className="text-xl font-semibold mb-4">Live Energy Readings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Reading icon={<FiZap />} label="Voltage" value={`${voltage} V`} />
          <Reading icon={<FiActivity />} label="Current" value={`${current} A`} />
          <Reading icon={<FiZap />} label="Power" value={`${power} W`} />
          <Reading
            icon={<FiCpu />}
            label="Frequency"
            value={voltage > 10 ? "50 Hz" : "0 Hz"}
          />
        </div>
      </section>

      {/* Usage Analytics */}
      <section className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl mb-10 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            ⚡ Energy Usage Analytics
          </h2>
          <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
            Live Data
          </span>
        </div>

        {/* Graph */}
        <div className="bg-white/5 mb-6 rounded-xl p-2">
          <div className="w-full h-70">
            <UsageEstimateChart />
          </div>
        </div>

        {/* Dynamic Analytics Stats */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-500/20 border border-green-500/20 p-5 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Peak Usage</p>
            <p className="text-xl font-semibold text-green-400">
              {(todayUsage * 0.6).toFixed(1)} Wh ⚡
            </p>
          </div>

          <div className="bg-yellow-500/20 border border-yellow-500/20 p-5 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Average Usage</p>
            <p className="text-xl font-semibold text-yellow-300">
              {(todayUsage / 2 || 0).toFixed(1)} Wh 📊
            </p>
          </div>

          <div className="bg-emerald-500/20 border border-emerald-500/20 p-5 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Energy Efficiency</p>
            <p className="text-xl font-semibold text-emerald-400">
              {power > 0 ? "Optimal 🌱" : "Idle 💤"}
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
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              activeAlerts.length > 0
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {activeAlerts.length} Active Alert
            {activeAlerts.length !== 1 && "s"}
          </span>
        </div>

        {activeAlerts.length > 0 ? (
          activeAlerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-yellow-500/10 border border-yellow-400/20 text-yellow-200 p-4 rounded-xl mb-3"
            >
              <div className="text-xl mt-1 text-yellow-400">
                <FiAlertTriangle />
              </div>
              <div className="flex-1">
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm mt-1 text-gray-300">{alert.message}</p>
                <p className="text-xs mt-2 text-gray-400">⏱ {alert.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-center">
            All systems running within normal operating parameters.
          </div>
        )}
      </section>

      <div className="mt-10 border-2 rounded-md border-slate-900">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;