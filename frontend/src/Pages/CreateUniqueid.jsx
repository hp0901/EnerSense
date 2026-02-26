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
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          className="bg-slate-800 p-2 rounded"
        >
          <option value="bulb">Bulb</option>
          <option value="fan">Fan</option>
          <option value="plug">Plug</option>
        </select>

        <button
          onClick={generateDevice}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Generate Device
        </button>
      </div>

      <div className="space-y-3">
        {devices.map((device) => (
          <div
            key={device._id}
            className="bg-slate-900 p-4 rounded flex justify-between"
          >
            <span>{device.deviceId}</span>
            <span>
              {device.user ? "Paired" : "Unpaired"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateUniqueid;