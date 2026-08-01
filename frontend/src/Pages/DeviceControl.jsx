import React, { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import {
  getMyDevicesApi,
  getLatestTelemetryApi,
  toggleDeviceApi,
  unpairDeviceApi,
  pairDeviceApi,
} from "../services/operations/deviceApi";

const DeviceControl = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State for Pairing
  const [deviceName, setDeviceName] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [deviceType, setDeviceType] = useState("Bulb");
  const [pairingLoading, setPairingLoading] = useState(false);
  const [pairError, setPairError] = useState("");

  // Fetch registered devices & merge live telemetry
  const fetchDevices = async () => {
    try {
      const res = await getMyDevicesApi();
      const rawDevices = res?.devices || res || [];

      // Fetch live telemetry in parallel for all paired devices
      const hydratedDevices = await Promise.all(
        rawDevices.map(async (device) => {
          try {
            const telemetryRes = await getLatestTelemetryApi(device.deviceId);
            return {
              ...device,
              telemetry: telemetryRes?.telemetry || device.telemetry || {},
            };
          } catch (err) {
            return device;
          }
        })
      );

      setDevices(hydratedDevices);
    } catch (error) {
      console.error("Failed to load dashboard devices:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pair Device Form Handler
  const handlePairDevice = async (e) => {
    e.preventDefault();
    if (!uniqueCode.trim()) {
      setPairError("Please enter a valid unique device code.");
      return;
    }

    setPairingLoading(true);
    setPairError("");

    try {
      const payload = {
        deviceId: uniqueCode.trim(),
        name: deviceName.trim() || undefined,
        deviceType: deviceType,
      };

      await pairDeviceApi(payload);

      // Reset form
      setDeviceName("");
      setUniqueCode("");
      setDeviceType("Bulb");

      // Refresh devices list
      await fetchDevices();
    } catch (error) {
      console.error("Pairing Error:", error);
      setPairError(typeof error === "string" ? error : "Failed to pair device.");
    } finally {
      setPairingLoading(false);
    }
  };

  // Toggle relay state for a device
  const handleToggle = async (deviceId) => {
    const currentDevice = devices.find(
      (d) => d.deviceId === deviceId || d._id === deviceId
    );
    const currentRelay =
      currentDevice?.telemetry?.relayState ??
      currentDevice?.relayState ??
      false;
    const targetState = !currentRelay;

    try {
      // Optimistic UI update
      setDevices((prevDevices) =>
        prevDevices.map((d) =>
          d.deviceId === deviceId || d._id === deviceId
            ? {
                ...d,
                relayState: targetState,
                telemetry: { ...d.telemetry, relayState: targetState },
              }
            : d
        )
      );

      await toggleDeviceApi(deviceId, targetState);
      fetchDevices();
    } catch (error) {
      console.error("Toggle error:", error);
      fetchDevices();
    }
  };

  // Unpair / Delete a device
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to unpair this device?")) return;

    try {
      await unpairDeviceApi(id);
      setDevices((prevDevices) =>
        prevDevices.filter((d) => d._id !== id && d.deviceId !== id)
      );
    } catch (error) {
      console.error("Unpair error:", error);
    }
  };

  useEffect(() => {
    fetchDevices();

    // Poll live data every 3 seconds
    const interval = setInterval(fetchDevices, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold flex items-center gap-2">
          <span className="text-orange-500">⚡</span> Device Control Panel
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage and control all your connected smart devices.
        </p>
      </div>

      {/* PAIR NEW DEVICE PANEL */}
      <div className="bg-[#121824] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <span className="text-purple-400 text-xl">+</span> Pair New Device
        </h2>

        <form
          onSubmit={handlePairDevice}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          {/* Device Name Input */}
          <input
            type="text"
            placeholder="Device name (optional)"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="w-full md:w-1/3 bg-[#1A2232] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />

          {/* Unique Code Input */}
          <input
            type="text"
            placeholder="Enter Unique Code"
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
            required
            className="w-full md:w-1/3 bg-[#1A2232] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />

          {/* Device Type Selector */}
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="w-full md:w-auto bg-[#1A2232] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer transition"
          >
            <option value="Bulb">💡 Bulb</option>
            <option value="Fan">🌀 Fan</option>
            <option value="AC">❄️ AC</option>
            <option value="Meter">⚡ Meter</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={pairingLoading}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-blue-500/20 disabled:opacity-50 cursor-pointer whitespace-nowrap"
          >
            {pairingLoading ? "Pairing..." : "Add Device"}
          </button>
        </form>

        {pairError && (
          <p className="text-red-400 text-xs mt-3">{pairError}</p>
        )}
      </div>

      {/* DEVICES GRID */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[30vh] text-slate-400 font-mono">
          Loading EnerSence Dashboard...
        </div>
      ) : devices.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-slate-400 gap-2 border border-dashed border-slate-800 rounded-2xl p-8">
          <p className="text-lg font-medium text-slate-300">
            No paired devices found.
          </p>
          <p className="text-xs text-slate-500">
            Use the panel above to pair your ESP32 node (e.g. ENR-0KDOY8).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <DeviceCard
              key={device._id || device.deviceId}
              device={device}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceControl;