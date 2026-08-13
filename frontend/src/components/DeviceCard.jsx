import React from "react";
import {
  FaLightbulb,
  FaFan,
  FaPlug,
  FaSnowflake,
  FaTrash,
  FaChargingStation,
  FaFire,
  FaTv,
  FaBlender,
  FaUtensils,
  FaVolumeUp,
  FaLaptop,
  FaWifi,
  FaCogs,
  FaQuestionCircle,
  FaTachometerAlt,
} from "react-icons/fa";

const iconMap = {
  bulb: <FaLightbulb size={22} />,
  chargingpoint: <FaChargingStation size={22} />,
  meter: <FaTachometerAlt size={22} />,
  fan: <FaFan size={22} />,
  plug: <FaPlug size={22} />,
  ac: <FaSnowflake size={22} />,
  heater: <FaFire size={22} />,
  tv: <FaTv size={22} />,
  fridge: <FaSnowflake size={22} />,
  washer: <FaBlender size={22} />,
  oven: <FaUtensils size={22} />,
  speaker: <FaVolumeUp size={22} />,
  computer: <FaLaptop size={22} />,
  router: <FaWifi size={22} />,
  "washing-machine": <FaCogs size={22} />,
  other: <FaQuestionCircle size={22} />,
};

const DeviceCard = ({ device, onToggle, onDelete }) => {
  const telemetry = device?.telemetry || {};

  const VIRTUAL_DEVICE_MAP = {
    "ENR-OOI0VW": 2,
  };

  const channel =
    VIRTUAL_DEVICE_MAP[device?.deviceId] ||
    device?.relayChannel ||
    device?.channel ||
    1;

  let relayState = false;
  if (channel === 2) {
    relayState = Boolean(
      telemetry.relay2State ?? device?.relay2State ?? false
    );
  } else {
    relayState = Boolean(
      telemetry.relay1State ?? device?.relay1State ?? false
    );
  }

  const rawVoltage = Number(telemetry.voltage ?? device?.voltage ?? 0);
  const rawCurrent = Number(telemetry.current ?? device?.current ?? 0);
  const rawPower = Number(telemetry.power ?? device?.power ?? 0);

  // 🔑 Zero-out ALL electrical and sensor metrics when device is OFF
  const voltage = relayState ? rawVoltage : 0;
  const current = relayState ? rawCurrent : 0;
  const power = relayState ? rawPower : 0;
  
  // 🌡️ Temp and Hum now zero-out when relayState is false
  const temperature = relayState ? (telemetry.temperature ?? device?.temperature ?? 0) : 0;
  const humidity = relayState ? (telemetry.humidity ?? device?.humidity ?? 0) : 0;

  const inUse = relayState && power > 0;

  const rawType = (device?.deviceType || device?.type || "other")
    .toString()
    .toLowerCase()
    .replace(/[\s_-]/g, "");

  const IconComponent = iconMap[rawType] || iconMap["other"];

  return (
    <div className="bg-[#131B2E] rounded-2xl p-5 border border-slate-800/80 shadow-xl relative transition duration-300 hover:border-slate-700/80">
      {/* Delete / Unpair Button */}
      <button
        onClick={() => onDelete?.(device?._id || device?.deviceId)}
        className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 transition-colors p-1"
        title="Unpair Device"
      >
        {/* <FaTrash size={14} /> */}
      </button>

      {/* Device Category Icon */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-all duration-300 ${
          relayState
            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-md shadow-amber-500/10"
            : "bg-slate-800/80 text-slate-400 border border-slate-700/50"
        }`}
      >
        {IconComponent}
      </div>

      {/* Device Name and Code */}
      <h3 className="text-white text-lg font-semibold capitalize tracking-wide">
        {device?.name || device?.deviceType || "EnerSence Device"}
      </h3>
      <p className="text-[11px] font-mono text-slate-400 mb-4 tracking-wider">
        {device?.deviceId || device?._id || "ENR-000000"}
      </p>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs my-3">
        <div className="bg-[#0B0F17]/90 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Status</span>
          <span
            className={`font-semibold ${
              relayState ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {relayState ? "● ON" : "○ OFF"}
          </span>
        </div>

        <div className="bg-[#0B0F17]/90 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Load State</span>
          <span
            className={`font-semibold ${
              inUse ? "text-emerald-400" : "text-slate-400"
            }`}
          >
            {inUse ? "● In Use" : "○ Idle"}
          </span>
        </div>

        <div className="bg-[#0B0F17]/90 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Voltage</span>
          <span className="font-mono font-semibold text-sky-400">
            {voltage.toFixed(1)} V
          </span>
        </div>

        <div className="bg-[#0B0F17]/90 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Current</span>
          <span className="font-mono font-semibold text-indigo-400">
            {current.toFixed(2)} A
          </span>
        </div>

        <div className="bg-[#0B0F17]/90 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Power</span>
          <span className="font-mono font-semibold text-amber-400">
            {Math.round(power)} W
          </span>
        </div>

        <div className="bg-[#0B0F17]/90 border border-slate-800/80 rounded-xl p-2.5">
          <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">Temp / Hum</span>
          <span className="font-mono font-semibold text-orange-400">
            {temperature}°C / {humidity}%
          </span>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() =>
          onToggle?.(device?.deviceId || device?._id, channel, !relayState)
        }
        className={`w-full mt-3 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all duration-300 cursor-pointer ${
          relayState
            ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
            : "bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/20"
        }`}
      >
        {relayState ? "Turn OFF" : "Turn ON"}
      </button>
    </div> 
  );
};

export default DeviceCard;