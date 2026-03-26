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

const DeviceCard = ({ device, setDevices, onDelete }) => {

  const toggleDevice = () => {
    setDevices((prevDevices) =>
      prevDevices.map((d) =>
        d._id === device._id
          ? {
              ...d,
              powerStatus: !d.powerStatus,
              voltage: !d.powerStatus ? 228 : 0,
              usage: !d.powerStatus
                ? Math.floor(Math.random() * 80 + 20)
                : 0,
            }
          : d
      )
    );
  };

  const inUse = device.powerStatus && device.usage > 0;

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-lg relative transition hover:scale-[1.02]">

      {/* Delete Button */}
      <button
        onClick={() => onDelete(device._id)}
        className="absolute top-3 right-3 text-red-400 hover:text-red-600"
      >
        <FaTrash />
      </button>

      {/* Device Icon */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full mb-4
        ${
          device.powerStatus
            ? "bg-yellow-500 text-black"
            : "bg-slate-700 text-gray-300"
        }`}
      >
        {iconMap[device.deviceType] || <FaQuestionCircle size={26} />}
      </div>

      {/* Device Name */}
      <h3 className="text-white text-lg font-semibold capitalize">
        {device.deviceType || "EnerSense Device"}
      </h3>

      {/* Power Status */}
      <p className="text-sm text-gray-400">
        Power: {device.powerStatus ? "ON" : "OFF"}
      </p>

      {/* Voltage */}
      <p className="text-sm text-blue-400">
        Voltage: {device.voltage} V
      </p>

      {/* Usage */}
      <p className="text-sm text-green-400">
        Usage: {device.usage} W
      </p>

      {/* Usage State */}
      <p
        className={`text-sm font-medium ${
          inUse ? "text-green-500" : "text-gray-500"
        }`}
      >
        {inUse ? "● In Use" : "○ Idle"}
      </p>

      {/* Toggle Button */}
      <button
        onClick={toggleDevice}
        className={`w-full mt-4 py-2 rounded-lg font-medium transition
        ${
          device.powerStatus
            ? "bg-green-500 text-black hover:bg-green-400"
            : "bg-red-500 text-white hover:bg-red-400"
        }`}
      >
        {device.powerStatus ? "Turn OFF" : "Turn ON"}
      </button>
    </div>
  );
};

export default DeviceCard;