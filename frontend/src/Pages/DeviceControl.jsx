import { useState, useEffect } from "react";
import DeviceCard from "../components/DeviceCard";
import IconPicker from "../components/IconPicker";
import toast from "react-hot-toast";
import {
  pairDeviceApi,
  getMyDevicesApi,
  unpairDeviceApi,
} from "../services/operations/deviceApi";

const DeviceControl = () => {
  const [devices, setDevices] = useState([]);
  const [icon, setIcon] = useState("bulb");
  const [name, setName] = useState("");
  const [deviceCode, setDeviceCode] = useState("");

  // ✅ Load Devices on Mount
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await getMyDevicesApi();
      setDevices(res.devices || []);
    } catch (error) {
      toast.error(error);
    }
  };

  // ✅ Pair Device
  const addDevice = async () => {
    if (!deviceCode) {
      toast.error("Enter device code");
      return;
    }

    try {
      await pairDeviceApi(deviceCode);
      toast.success("Device paired successfully 🔥");

      setDeviceCode("");
      setName("");
      fetchDevices(); // reload devices
    } catch (error) {
      toast.error(error);
    }
  };

  // ✅ Unpair Device
  const deleteDevice = async (id) => {
    try {
      await unpairDeviceApi(id);
      toast.success("Device removed");
      fetchDevices();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-10">

    {/* Header */}
    <div className="max-w-7xl mx-auto mb-10">
      <h1 className="text-4xl font-bold text-white tracking-wide">
        ⚡ Device Control Panel
      </h1>
      <p className="text-slate-400 mt-2">
        Manage and control all your connected smart devices.
      </p>
    </div> 

    <div className="max-w-7xl mx-auto">

      {/* Add Device Card */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl mb-12">

        <h2 className="text-xl font-semibold text-white mb-6">
          ➕ Pair New Device
        </h2>

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Device name (optional)"
            className="flex-1 bg-slate-800/70 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            value={deviceCode}
            onChange={(e) => setDeviceCode(e.target.value)}
            placeholder="Enter Unique Code"
            className="flex-1 bg-slate-800/70 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="flex items-center">
            <IconPicker icon={icon} setIcon={setIcon} />
          </div>

          <button
            onClick={addDevice}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Add Device
          </button>

        </div>
      </div>

      {/* Devices Section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">
          🔌 Your Devices
        </h2>

        <span className="text-sm text-slate-400">
          {devices.length} device{devices.length !== 1 && "s"} connected
        </span>
      </div>

      {devices.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-slate-400">
          No devices paired yet. Add your first smart device 🚀
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {devices.map((device) => (
            <div
              key={device._id}
              className="hover:scale-[1.02] transition duration-300"
            >
              <DeviceCard
                device={device}
                setDevices={setDevices}
                onDelete={deleteDevice}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
};

export default DeviceControl;