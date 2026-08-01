import { useEffect, useState } from "react";
import { getMyProfile } from "../services/operations/profileapi";
import { getMyDevicesApi, getLatestTelemetryApi } from "../services/operations/deviceApi";
import { Link } from "react-router-dom";
import PreviousBillsCard from "../components/PreviousBillsCard";
import ExpectedBillsCard from "../components/ExpectedBillsCard";
import ExpectedBillSummary from "../components/ExpectedBillSummary";

const EnergyMeterDashboard = () => {
  const [user, setUser] = useState(null);

  // ================= USER =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setUser(res?.data || res);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, []);

  // ================= DEVICE & CONNECTIVITY =================
  const [totalPoints, setTotalPoints] = useState(0);
  const [activePoints, setActivePoints] = useState(0);
  const offlinePoints = Math.max(0, totalPoints - activePoints);

  // ================= LIVE METER METRICS =================
  const [voltage, setVoltage] = useState(0);
  const [power, setPower] = useState(0);
  const [current, setCurrent] = useState(0);

  // ================= VOLTAGE STATUS =================
  const isHighVoltage = voltage > 260;
  const isLowVoltage = voltage > 0 && voltage < 150;

  let voltageStatus = "Normal";
  if (isHighVoltage) voltageStatus = "High";
  if (isLowVoltage) voltageStatus = "Low";

  // ================= UNITS =================
  const [peakUnits, setPeakUnits] = useState(1.8);
  const [nonPeakUnits, setNonPeakUnits] = useState(1.8);
  const totalUnits = (peakUnits + nonPeakUnits).toFixed(3);

  // ================= BILLING =================
  const [peakRate] = useState(8);
  const [nonPeakRate] = useState(5);

  // ================= REALTIME API TELEMETRY =================
  useEffect(() => {
    const fetchRealtimeTelemetry = async () => {
      try {
        // 1. Fetch user's registered devices
        const res = await getMyDevicesApi();
        const devices = res?.devices || res || [];
        setTotalPoints(devices.length);

        if (devices.length === 0) {
          setActivePoints(0);
          setPower(0);
          setVoltage(0);
          setCurrent(0);
          return;
        }

        // 2. Fetch latest telemetry for all paired devices in parallel
        let aggregatePower = 0;
        let latestVoltage = 0;
        let aggregateCurrent = 0;
        let activeCount = 0;

        await Promise.all(
          devices.map(async (device) => {
            try {
              const telRes = await getLatestTelemetryApi(device.deviceId);
              const telemetry = telRes?.telemetry || {};

              const v = Number(telemetry.voltage || 0);
              const c = Number(telemetry.current || 0);
              const p = Number(telemetry.power || 0);
              const relay = telemetry.relayState ?? device.relayState ?? false;

              if (relay) activeCount++;

              aggregatePower += p;
              aggregateCurrent += c;
              if (v > 0) latestVoltage = v; // Primary line voltage reading
            } catch (err) {
              console.error(`Telemetry error for ${device.deviceId}:`, err);
            }
          })
        );

        // Update state with live hardware figures
        setVoltage(latestVoltage);
        setPower(Math.round(aggregatePower));
        setCurrent(aggregateCurrent.toFixed(2));
        setActivePoints(activeCount);

        // Calculate real energy increment (2 seconds interval: W * 2s / 3,600,000 = kWh)
        const unitIncrement = aggregatePower / 1800000;

        const hour = new Date().getHours();
        const isPeakHour = hour >= 18 || hour < 6;

        if (isPeakHour) {
          setPeakUnits((prev) => +(prev + unitIncrement).toFixed(3));
        } else {
          setNonPeakUnits((prev) => +(prev + unitIncrement).toFixed(3));
        }
      } catch (error) {
        console.error("Telemetry Sync Error:", error);
      }
    };

    fetchRealtimeTelemetry();
    const interval = setInterval(fetchRealtimeTelemetry, 2000);

    return () => clearInterval(interval);
  }, []);

  // ================= ALERT SOUND =================
  useEffect(() => {
    if (isHighVoltage || isLowVoltage) {
      let isCancelled = false;

      const playBeepAndVibrate = async () => {
        const repeatCount = Math.floor(Math.random() * 6) + 5;

        const audioContext =
          new (window.AudioContext || window.webkitAudioContext)();

        for (let i = 0; i < repeatCount; i++) {
          if (isCancelled) break;

          try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.type = "square";
            oscillator.frequency.value = 1300;
            gainNode.gain.value = 5;

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();
            setTimeout(() => oscillator.stop(), 120);

            if ("vibrate" in navigator) {
              navigator.vibrate([400, 200, 400]);
            }

            await new Promise((res) => setTimeout(res, 250));
          } catch (err) {
            console.log("Retrying beep...");
          }
        }
      };

      playBeepAndVibrate();

      return () => {
        isCancelled = true;
        if ("vibrate" in navigator) navigator.vibrate(0);
      };
    }
  }, [voltage, isHighVoltage, isLowVoltage]);

  // ================= PREVIOUS BILLS =================
  const [previousBills, setPreviousBills] = useState([]);

  useEffect(() => {
    const now = new Date();
    const bills = [];

    for (let i = 1; i <= 3; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

      const base = 2000 - i * 300;
      const variation = Math.random() * 150;

      bills.push({
        month: d.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        amount: (base + variation).toFixed(2),
      });
    }

    setPreviousBills(bills);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-white">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">⚡ EnerSence Live Meter</h1>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. LIVE METER CARD */}
        <div
          className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
            isHighVoltage
              ? "border-red-600 shadow-[0_0_25px_red]"
              : isLowVoltage
              ? "border-orange-500 shadow-[0_0_25px_orange]"
              : "border-slate-700 bg-slate-900"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">
            Live Power Usage ({voltageStatus})
          </h2>

          {/* Test Overrides for Voltage Alerts */}
          <div className="flex gap-3 mb-4 flex-wrap">
            <button
              onClick={() => setVoltage(270)}
              className="bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500 transition cursor-pointer"
            >
              High ⚠️
            </button>
            <button
              onClick={() => setVoltage(120)}
              className="bg-orange-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-400 transition cursor-pointer"
            >
              Low ⚡
            </button>
            <button
              onClick={() => setVoltage(230)}
              className="bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-500 transition cursor-pointer"
            >
              Normal ✅
            </button>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-5 mb-4 overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(power / 6, 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat label="Power" value={`${power} W`} />
            <Stat
              label="Voltage"
              value={`${voltage} V`}
              red={isHighVoltage || isLowVoltage}
            />
            <Stat label="Current" value={`${current} A`} />
            <Stat label="Peak Units" value={`${peakUnits} kWh`} green />
            <Stat label="Non-Peak Units" value={`${nonPeakUnits} kWh`} />
            <Stat label="Total Units" value={`${totalUnits} kWh`} />
          </div>
        </div>

        {/* 2. CONNECTION STATUS CARD */}
        <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 flex flex-col justify-between">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            <Link
              to="/device-control"
              className="text-sm text-blue-500 mb-4 inline-block border-blue-400/30 bg-blue-400/10 p-3 rounded-xl hover:bg-blue-400/20 transition"
            >
              Manage Devices
            </Link>
          </div>
          <div className="space-y-4">
            <Stat label="Total Points" value={totalPoints} />
            <Stat label="Active" value={activePoints} green />
            <Stat label="Offline" value={offlinePoints} red={offlinePoints > 0} />
          </div>
        </div>

        {/* 3. EXPECTED BILL SUMMARY */}
        <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-700">
          <ExpectedBillSummary
            peakUnits={peakUnits}
            nonPeakUnits={nonPeakUnits}
            peakRate={peakRate}
            nonPeakRate={nonPeakRate}
          />
        </div>

        {/* 4. BILLING ESTIMATION CARD */}
        <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-700">
          <ExpectedBillsCard link="/expected-bills" />
        </div>

        {/* 5. PREVIOUS BILLS CARD */}
        <div className="bg-slate-900 p-6 rounded-2xl border-2 border-slate-700 pb-4">
          <PreviousBillsCard link="/previous-bills" />
        </div>

        {/* BRANDING FOOTER */}
        <div className="md:col-span-2 flex flex-col items-center justify-center p-8 text-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-8 bg-blue-500 rounded-full" />
            <span className="text-blue-500 text-xs font-bold tracking-widest uppercase">
              EnerSence
            </span>
            <div className="h-1 w-8 bg-blue-500 rounded-full" />
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Smart Energy Meter
          </h2>

          <p className="text-slate-400 text-sm md:text-base font-medium mt-1 tracking-tight">
            Advanced Real-Time Monitoring System
          </p>
        </div>
      </div>
    </div>
  );
};

// COMPONENTS
const Stat = ({ label, value, green, red }) => (
  <div className="bg-slate-800 p-4 rounded-xl border-2 border-slate-700">
    <p className="text-gray-400 text-sm">{label}</p>
    <p
      className={`text-xl font-mono font-semibold ${
        green ? "text-green-400" : red ? "text-red-400" : "text-white"
      }`}
    >
      {value}
    </p>
  </div>
);

export default EnergyMeterDashboard;