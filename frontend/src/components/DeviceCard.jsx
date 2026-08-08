import React from "react";
import {
  FaLightbulb,
  FaFan,
  FaPlug,
  FaSnowflake,
  FaTrash,
  FaFire,
  FaTv,
  FaBlender,
  FaUtensils,
  FaVolumeUp,
  FaLaptop,
  FaWifi,
  FaCogs,
  FaQuestionCircle,
} from "react-icons/fa";

const iconMap = {
  bulb: <FaLightbulb size={26} />,
  fan: <FaFan size={26} />,
  plug: <FaPlug size={26} />,
  ac: <FaSnowflake size={26} />,
  heater: <FaFire size={26} />,
  tv: <FaTv size={26} />,
  fridge: <FaSnowflake size={26} />,
  washer: <FaBlender size={26} />,
  oven: <FaUtensils size={26} />,
  speaker: <FaVolumeUp size={26} />,
  computer: <FaLaptop size={26} />,
  router: <FaWifi size={26} />,
  "washing-machine": <FaCogs size={26} />,
  Other: <FaQuestionCircle size={26} />,
};

const DeviceCard = ({ device, onToggle, onDelete }) => {
  // Extract values safely from nested telemetry or flat device properties
  const telemetry = device?.telemetry || device || {};

  // Identify channel (default to 1 if not specified)
  const channel = device?.relayChannel || device?.channel || 1;

  // Channel-aware Relay State check
  let relayState = false;
  if (channel === 1) {
    relayState = telemetry.relay1State ?? telemetry.relayState ?? device?.relayState ?? device?.powerStatus ?? false;
  } else if (channel === 2) {
    relayState = telemetry.relay2State ?? telemetry.relayState ?? device?.relayState ?? device?.powerStatus ?? false;
  } else {
    relayState = telemetry.relayState ?? telemetry.relay1State ?? telemetry.relay2State ?? device?.relayState ?? device?.powerStatus ?? false;
  }

  // Get raw telemetry metrics
  const rawVoltage = Number(telemetry.voltage ?? device?.voltage ?? 0);
  const rawCurrent = Number(telemetry.current ?? device?.current ?? 0);
  const rawPower   = Number(telemetry.power ?? device?.power ?? 0);

  // ZERO-OUT metrics ONLY if THIS channel is OFF
  const voltage = relayState ? rawVoltage : 0;
  const current = relayState ? rawCurrent : 0;
  const power   = relayState ? rawPower : 0;
  
  // Ambient room sensor readings remain active
  const temperature = telemetry.temperature ?? device?.temperature ?? 0;
  const humidity    = telemetry.humidity ?? device?.humidity ?? 0;

  const inUse = relayState && power > 0;

  // Icon lookup helper (case-insensitive)
  const rawType = (device?.deviceType || device?.type || "Other").toLowerCase();
  const IconComponent = iconMap[rawType] || iconMap[device?.deviceType] || <FaQuestionCircle size={26} />;

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-lg relative transition hover:scale-[1.02]">
      {/* Delete / Unpair Button */}
      <button
        onClick={() => onDelete?.(device?._id || device?.deviceId)}
        className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition p-1"
        title="Unpair Device"
      >
        {/* <FaTrash /> */}
      </button>

      {/* Device Icon */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 transition-colors ${
          relayState ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" : "bg-slate-700 text-gray-300"
        }`}
      >
        {IconComponent}
      </div>

      {/* Device Name / Code */}
      <h3 className="text-white text-lg font-semibold capitalize tracking-wide">
        {device?.name || device?.deviceType || "EnerSence Device"}
      </h3>
      <p className="text-xs font-mono text-slate-400 mb-3">
        {device?.deviceId || device?._id || "ENR-0KDOY8"}
      </p>

      {/* Sensor Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs my-3">
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2">
          <span className="text-gray-400 block">Status</span>
          <span className={`font-semibold ${relayState ? "text-emerald-400" : "text-rose-400"}`}>
            {relayState ? "● ON" : "○ OFF"}
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2">
          <span className="text-gray-400 block">Load State</span>
          <span className={`font-semibold ${inUse ? "text-green-400" : "text-gray-400"}`}>
            {inUse ? "● In Use" : "○ Idle"}
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2">
          <span className="text-gray-400 block">Voltage</span>
          <span className="font-mono font-semibold text-blue-400">{voltage.toFixed(1)} V</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2">
          <span className="text-gray-400 block">Current</span>
          <span className="font-mono font-semibold text-indigo-400">{current.toFixed(2)} A</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2">
          <span className="text-gray-400 block">Power</span>
          <span className="font-mono font-semibold text-amber-400">{Math.round(power)} W</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2">
          <span className="text-gray-400 block">Temp / Hum</span>
          <span className="font-mono font-semibold text-orange-400">
            {temperature}°C / {humidity}%
          </span>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => onToggle?.(device?.deviceId || device?._id)}
        className={`w-full mt-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
          relayState
            ? "bg-green-500 text-black hover:bg-green-400 shadow-lg shadow-green-500/20"
            : "bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20"
        }`}
      >
        {relayState ? "Turn OFF" : "Turn ON"}
      </button>
    </div>
  );
};

export default DeviceCard;