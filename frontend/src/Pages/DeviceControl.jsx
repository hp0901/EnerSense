import { useState } from "react";
import DeviceCard from "../components/DeviceCard";
import IconPicker from "../components/IconPicker";

const DeviceControl = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Living Room Light",
      icon: "bulb",
      status: false,
      voltage: 0,
      usage: 0,
    },
    {
      id: 2,
      name: "Ceiling Fan",
      icon: "fan",
      status: true,
      voltage: 228,
      usage: 75,
    },
    {
      id: 3,
      name: "Smart Plug",
      icon: "plug",
      status: false,
      voltage: 0,
      usage: 0,
    },
  ]);

  const [icon, setIcon] = useState("bulb");
  const [name, setName] = useState("");

  const addDevice = () => {
    if (!name) return;

    setDevices((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        icon,
        status: false,
        voltage: 0,
        usage: 0,
      },
    ]);
    setName("");
  };

  const deleteDevice = (id) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
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
          placeholder="Device name"
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
            key={device.id}
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
