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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <h1 className="text-3xl text-white font-bold mb-6">
        ⚡ Device Control Panel
      </h1>

      {/* Add Device */}
      <div className="flex flex-wrap gap-3 mb-8 bg-slate-900 p-4 rounded-xl">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Device name (optional)"
          className="bg-slate-800 text-white p-2 rounded-md outline-none"
        />

        <input
          value={deviceCode}
          onChange={(e) => setDeviceCode(e.target.value)}
          placeholder="Enter Unique Code"
          className="bg-slate-800 text-white p-2 rounded-md outline-none"
        />

        <IconPicker icon={icon} setIcon={setIcon} />

        <button
          onClick={addDevice}
          className="bg-blue-500 px-4 rounded-md text-white hover:bg-blue-600"
        >
          Add Device
        </button>
      </div>

      {/* Devices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <DeviceCard
            key={device._id}
            device={device}
            setDevices={setDevices}
            onDelete={deleteDevice}
          />
        ))}
      </div>
    </div>
  );
};

export default DeviceControl;