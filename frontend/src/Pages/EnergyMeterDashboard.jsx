import { useEffect, useState, useRef } from "react";
import { getMyProfile } from "../services/operations/profileapi";

const EnergyMeterDashboard = () => {
  const [user, setUser] = useState(null);

  // ================= USER =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setUser(res.data);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, []);

  // ================= DEVICE =================
  const [totalPoints] = useState(8);
  const [activePoints, setActivePoints] = useState(5);
  const offlinePoints = totalPoints - activePoints;

  // ================= LIVE VALUES =================
  const [voltage, setVoltage] = useState(228);
  const [power, setPower] = useState(420);
  const current = (power / voltage).toFixed(2);

  // ================= VOLTAGE STATUS =================
  const isHighVoltage = voltage > 260;
  const isLowVoltage = voltage < 150;

  let voltageStatus = "Normal";
  if (isHighVoltage) voltageStatus = "High";
  if (isLowVoltage) voltageStatus = "Low";

  // ================= UNITS =================
  const [peakUnits, setPeakUnits] = useState(1.8);
  const [nonPeakUnits, setNonPeakUnits] = useState(1.8);
  const totalUnits = (peakUnits + nonPeakUnits).toFixed(3);

  // ================= BILLING =================
  const [peakRate, setPeakRate] = useState(8);
  const [nonPeakRate, setNonPeakRate] = useState(5);

  const expectedBill =
    peakUnits * peakRate + nonPeakUnits * nonPeakRate;

  // ================= REALTIME =================
  useEffect(() => {
    const interval = setInterval(() => {
      const newPower = Math.floor(Math.random() * 200 + 300);

      setPower(newPower);
      setVoltage(Math.floor(Math.random() * 6 + 225));
      setActivePoints(Math.floor(Math.random() * totalPoints));

      const unitIncrement = +(newPower / 360000).toFixed(3);

      const hour = new Date().getHours();
      const isPeakHour = hour >= 18 && hour <= 23;

      if (isPeakHour) {
        setPeakUnits((prev) => +(prev + unitIncrement).toFixed(3));
      } else {
        setNonPeakUnits((prev) => +(prev + unitIncrement).toFixed(3));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [totalPoints]);

  // ================= SOUND SETUP =================
  

  // ================= ALERT SOUND =================
useEffect(() => {
  if (isHighVoltage || isLowVoltage) {
    let isCancelled = false;

    const playBeepAndVibrate = async () => {
      for (let i = 0; i < 10; i++) {
        if (isCancelled) break;

        try {
          // 🔊 SOUND
          const beep = new Audio(
            "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
          );

          beep.volume = 1;
          beep.playbackRate = 1.8;

          await beep.play();

          // 📳 VIBRATION (if supported)
          if ("vibrate" in navigator) {
            navigator.vibrate([200, 100, 200]);  // vibrate 200ms
          }

          // wait before next beep
          await new Promise((res) => setTimeout(res, 400));
        } catch (err) {
          console.log("Audio blocked once, retrying...");
        }
      }
    };

    playBeepAndVibrate();

    return () => {
      isCancelled = true;
      if ("vibrate" in navigator) {
        navigator.vibrate(0); // stop vibration
      }
    };
  }
}, [voltage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6 text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">⚡ EnerSense Live Meter</h1>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ================= LIVE METER ================= */}
        <div
          className={`p-6 rounded-2xl col-span-2 transition-all duration-300 border-2 ${
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

          {/* BUTTONS */}
          <div className="flex gap-3 mb-4 flex-wrap">
            <button
              onClick={() => setVoltage(270)}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              High ⚠️
            </button>

            <button
              onClick={() => setVoltage(120)}
              className="bg-orange-500 px-4 py-2 rounded-lg"
            >
              Low ⚡
            </button>

            <button
              onClick={() => setVoltage(230)}
              className="bg-green-600 px-4 py-2 rounded-lg"
            >
              Normal ✅
            </button>
          </div>

          {/* BAR */}
          <div className="w-full bg-slate-800 rounded-full h-5 mb-4">
            <div
              className="bg-green-500 h-full"
              style={{ width: `${Math.min(power / 6, 100)}%` }}
            />
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

        {/* STATUS */}
        <div className="bg-slate-900 p-6 rounded-2xl h-full flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <Stat label="Total Points" value={totalPoints} />
          <Stat label="Active" value={activePoints} green />
          <Stat label="Offline" value={offlinePoints} red />
        </div>

        {/* BILLING */}
        <div className="bg-slate-900 p-6 rounded-2xl col-span-2">
          <h2 className="text-xl font-semibold mb-4">Billing Estimation</h2>
          <Input label="Peak Rate" value={peakRate} setValue={setPeakRate} />
          <Input label="Non-Peak Rate" value={nonPeakRate} setValue={setNonPeakRate} />

          <div className="mt-4 text-2xl text-green-400">
            ₹ {expectedBill.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

// COMPONENTS
const Stat = ({ label, value, green, red }) => (
  <div className="bg-slate-800 p-4 rounded-xl">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className={`text-xl ${green ? "text-green-400" : red ? "text-red-400" : ""}`}>
      {value}
    </p>
  </div>
);

const Input = ({ label, value, setValue }) => (
  <div className="bg-slate-800 p-4 rounded-xl mb-2">
    <label className="text-gray-400 text-sm">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full bg-slate-900 mt-2 p-2 rounded-md"
    />
  </div>
);

export default EnergyMeterDashboard;