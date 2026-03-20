import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import {
  createDeviceApi,
  getAllDevicesApi,
  deleteDeviceApi
} from "../services/operations/deviceApi";

const CreateUniqueid = () => {
  const [devices, setDevices] = useState([]);
  const [deviceType, setDeviceType] = useState("bulb");

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await getAllDevicesApi();
      console.log("Responce is for details ", res);

      const sortedDevices = res.devices.sort((a, b) => {
        if (a.user && !b.user) return -1;
        if (!a.user && b.user) return 1;
        return 0;
      });

      setDevices(sortedDevices);
    } catch (error) {
      toast.error(error);
    }
  };

  const generateDevice = async () => {
    try {
      await createDeviceApi(deviceType);
      toast.success("Device Generated 🔥");
      fetchDevices();
    } catch (error) {
      toast.error(error);
    }
  };

  /* ================= DELETE DEVICE ================= */

  const openDeleteModal = (id) => {
    setSelectedDeviceId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {

      await deleteDeviceApi(selectedDeviceId);

      toast.success("Device deleted successfully 🗑");

      setShowModal(false);
      setSelectedDeviceId(null);

      fetchDevices();

    } catch (error) {
      toast.error("Failed to delete device");
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
              className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition duration-300 flex flex-col gap-4"
            >

              {/* Top Row */}
              <div className="flex justify-between items-start">

                {/* Device ID */}
                <div>
                  <p className="text-sm text-slate-400">Device ID</p>
                  <p className="font-mono text-lg">{device.deviceId}</p>
                </div>

                {/* Status + Delete */}
                <div className="flex items-center gap-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      device.user
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {device.user ? "Paired" : "Unpaired"}
                  </span>

                  <button
                    onClick={() => openDeleteModal(device._id)}
                    disabled={device.user}
                    className={`transition ${
                      device.user
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-red-400 hover:text-red-600"
                    }`}
                  >
                    <FiTrash2 size={18} />
                  </button>

                </div>
              </div>

              {/* Appliance */}
              <div>
                <p className="text-sm text-slate-400">Appliance</p>
                <p className="text-white font-semibold capitalize">
                  {device.name || device.deviceType}
                </p>
              </div>

              {/* User */}
              <div>
                <p className="text-sm text-slate-400">User</p>

                {device.user ? (
                  <>
                    <p className="text-blue-400 text-sm font-medium">
                      {device.user.firstname || ""}
                    </p>
                    <p className="text-slate-300 text-xs">
                      {device.user.email}
                    </p>
                  </>
                ) : (
                  <p className="text-yellow-400 text-sm">Not Assigned</p>
                )}
              </div>

            </div>
          ))}

        </div>
      )}

    </div>

    {/* DELETE MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-[320px] text-center shadow-xl">

          <h2 className="text-lg font-semibold mb-3">
            Delete Device
          </h2>

          <p className="text-sm text-slate-400 mb-6">
            Are you sure you want to delete this device?
          </p>

          <div className="flex justify-center gap-4">

            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    )}

  </div>
);
};

export default CreateUniqueid;