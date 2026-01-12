import { useEffect, useState } from "react";

const EnergyMeterDashboard = () => {
  // User Info
  const user = {
    name: "Harsh Patel",
    uid: "ENS-UID-0901",
    State: "Gujarat",
    board: "MGVCL",
  };

  // Device Stats
  const [totalPoints] = useState(8);
  const [activePoints, setActivePoints] = useState(5);
  const offlinePoints = totalPoints - activePoints;

  // Live Electrical Values
  const [voltage, setVoltage] = useState(228);
  const [power, setPower] = useState(420); // watts
  const current = (power / voltage).toFixed(2); // I = P/V

  // Billing
  const [peakRate, setPeakRate] = useState(8); // ₹/unit
  const [nonPeakRate, setNonPeakRate] = useState(5);
  const [unitsConsumed, setUnitsConsumed] = useState(3.6); // kWh

  const expectedBill =
    unitsConsumed * ((peakRate + nonPeakRate) / 2);

  // Realtime Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newPower = Math.floor(Math.random() * 200 + 300);
      setPower(newPower);
      setVoltage(Math.floor(Math.random() * 6 + 225));
      setActivePoints(Math.floor(Math.random() * totalPoints));
      setUnitsConsumed((prev) => +(prev + newPower / 360000).toFixed(3));
    }, 2000);

    return () => clearInterval(interval);
  }, [totalPoints]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">⚡ EnerSense Live Meter</h1>
        <p className="text-gray-400 mt-1">
          {user.name} | {user.uid} | {user.State} | {user.board}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Meter */}
        <div className="bg-slate-900 p-6 rounded-2xl col-span-2">
          <h2 className="text-xl font-semibold mb-4">Live Power Usage</h2>

          {/* Animated Bar */}
          <div className="w-full bg-slate-800 rounded-full h-5 overflow-hidden mb-4">
            <div
              className="bg-green-500 h-full transition-all duration-700"
              style={{ width: `${Math.min(power / 6, 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Power" value={`${power} W`} />
            <Stat label="Voltage" value={`${voltage} V`} />
            <Stat label="Current" value={`${current} A`} />
            <Stat label="Units" value={`${unitsConsumed} kWh`} />
          </div>
        </div>

        {/* Points Status */}
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold gap-4 mb-4">Connection Status</h2>
            <div className="space-y-4">
                <Stat label="Total Points" value={totalPoints} />
                <Stat label="Active" value={activePoints} green />
                <Stat label="Offline" value={offlinePoints} red />
            </div>
        </div>

        {/* Billing */}
        <div className="bg-slate-900 p-6 rounded-2xl col-span-2">
          <h2 className="text-xl font-semibold mb-4">Billing Estimation</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              label="Peak Hour Rate (₹/unit)"
              value={peakRate}
              setValue={setPeakRate}
            />
            <Input
              label="Non-Peak Rate (₹/unit)"
              value={nonPeakRate}
              setValue={setNonPeakRate}
            />
            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Expected Bill</p>
              <p className="text-2xl font-bold text-green-400">
                ₹ {expectedBill.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const Stat = ({ label, value, green, red }) => (
  <div className="bg-slate-800 p-4 rounded-xl">
    <p className="text-gray-400 text-sm">{label}</p>
    <p
      className={`text-xl font-semibold ${
        green ? "text-green-400" : red ? "text-red-400" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

const Input = ({ label, value, setValue }) => (
  <div className="bg-slate-800 p-4 rounded-xl">
    <label className="text-gray-400 text-sm">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full bg-slate-900 mt-2 p-2 rounded-md outline-none"
    />
  </div>
);

export default EnergyMeterDashboard;
