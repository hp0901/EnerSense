import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createDeviceApi,
  getAllDevicesApi,
} from "../services/operations/deviceApi";

const CreateUniqueid = () => {
  const [devices, setDevices] = useState([]);
  const [deviceType, setDeviceType] = useState("bulb");

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await getAllDevicesApi();
      setDevices(res.devices);
    } catch (error) {
      toast.error(error);
    }
  };

  const generateDevice = async () => {
    try {
      const res = await createDeviceApi(deviceType);
      toast.success("Device Generated 🔥");
      fetchDevices();
    } catch (error) {
      toast.error(error);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-10 text-white">

    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-wide">
          🛠 Admin Device Generator
        </h1>
        <p className="text-slate-400 mt-2">
          Generate and manage unique device IDs for EnerSense.
        </p>
      </div>

      {/* Generate Section */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl mb-10">

        <h2 className="text-xl font-semibold mb-6">
          ➕ Generate New Device
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="bg-slate-800/70 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500 transition w-full sm:w-auto"
          >
            <option value="bulb">Bulb</option>
            <option value="fan">Fan</option>
            <option value="plug">Plug</option>
          </select>

          <button
            onClick={generateDevice}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Generate Device
          </button>

        </div>
      </div>

      {/* Device List Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          📦 Generated Devices
        </h2>
        <span className="text-sm text-slate-400">
          {devices.length} device{devices.length !== 1 && "s"}
        </span>
      </div>

      {/* Device List */}
      {devices.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-slate-400">
          No devices generated yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {devices.map((device) => (
            <div
              key={device._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition duration-300 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-slate-400 mb-1">
                  Device ID
                </p>
                <p className="font-mono text-lg">
                  {device.deviceId}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  device.user
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {device.user ? "Paired" : "Unpaired"}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);
};

export default CreateUniqueid;