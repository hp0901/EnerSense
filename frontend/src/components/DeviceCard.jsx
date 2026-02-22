import { useState } from "react";
import {
  FaLightbulb,
  FaFan,
  FaPlug,
  FaSnowflake,
  FaTrash,
  FaFire,
  FaTv,
  FaSnowflake as FaFridge,
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
  const [isOn, setIsOn] = useState(device.status);

  const toggleDevice = () => {
    setIsOn((prev) => !prev);

    setDevices((prevDevices) =>
      prevDevices.map((d) =>
        d.id === device.id
          ? {
              ...d,
              status: !isOn,
              voltage: !isOn ? 228 : 0,
              usage: !isOn ? Math.floor(Math.random() * 80 + 20) : 0,
            }
          : d
      )
    );
  };

  const inUse = device.status && device.usage > 0;

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-700 shadow-lg relative">
      {/* Delete */}
      <button
        onClick={() => onDelete(device._id)}
        className="absolute top-3 right-3 text-red-400 hover:text-red-600"
      >
        <FaTrash />
      </button>

      {/* Icon */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full mb-4
        ${device.status ? "bg-yellow-500 text-black" : "bg-slate-700 text-gray-300"}`}
      >
        {iconMap[device.icon] || <FaQuestionCircle size={26} />}
      </div>

      <h3 className="text-white text-lg font-semibold">{device.name}</h3>

      <p className="text-sm text-gray-400">
        Power: {device.status ? "ON" : "OFF"}
      </p>

      <p className="text-sm text-blue-400">Voltage: {device.voltage} V</p>
      <p className="text-sm text-green-400">Usage: {device.usage} W</p>

      <p
        className={`text-sm font-medium ${
          inUse ? "text-green-500" : "text-gray-500"
        }`}
      >
        {inUse ? "● In Use" : "○ Idle"}
      </p>

      <button
        onClick={toggleDevice}
        className={`w-full mt-4 py-2 rounded-lg font-medium
        ${device.status ? "bg-green-500 text-black" : "bg-red-500 text-white"}`}
      >
        {device.status ? "Turn OFF" : "Turn ON"}
      </button>
    </div>
  );
};

export default DeviceCard;
