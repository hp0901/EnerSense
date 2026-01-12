import {
  Cpu,
  Wifi,
  Activity,
  PlugZap,
  AlertTriangle,
} from "lucide-react";

const devices = [
  {
    title: "ESP32 Controller",
    icon: Cpu,
    description:
      "ESP32 is the core IoT controller used in EnerSense. It collects real-time voltage and current data from sensors and sends it securely to the server over Wi-Fi.",
  },
  {
    title: "Current & Voltage Sensors",
    icon: Activity,
    description:
      "EnerSense uses current and voltage sensors to measure power consumption accurately. These sensors enable calculation of power, energy units, and usage trends.",
  },
  {
    title: "Relay Modules",
    icon: PlugZap,
    description:
      "Relay modules allow EnerSense to remotely control electrical appliances. Users can turn devices ON or OFF directly from the dashboard.",
  },
  {
    title: "Wi-Fi Connectivity",
    icon: Wifi,
    description:
      "All EnerSense IoT devices use Wi-Fi for real-time data transmission. Stable connectivity ensures accurate monitoring and low-latency control.",
  },
  {
    title: "Offline Detection",
    icon: AlertTriangle,
    description:
      "If no data is received from a device for more than 5 minutes, EnerSense automatically marks it as offline and alerts the user.",
  },
];

const IoTDevices = () => {
  return (
    <div className="min-h-screen py-20 flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      
      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <h1 className="text-3xl font-bold mb-2">
            🌐 IoT Devices
          </h1>
          <p className="text-gray-400 mb-8">
            Hardware components powering real-time energy monitoring in EnerSense
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-700 rounded-2xl p-5
                  hover:border-blue-500 transition-all duration-300
                  hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-600 p-3 rounded-xl">
                      <Icon className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Safety Section */}
          <div className="mt-10 bg-slate-900 p-6 rounded-2xl border border-slate-700">
            <h2 className="text-xl font-semibold mb-2">
              Device Reliability & Safety
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              EnerSense IoT devices are designed to assist in monitoring and
              optimization. They do not replace certified electricity meters and
              should be installed following electrical safety guidelines.
            </p>
          </div>
            
        </div>
      </main>
      {/* FOOTER */}
            <footer className="bg-slate-950 border-t py-10 border-slate-800">    
                <p className="text-center  text-gray-500  text-sm ">
                  © 2026 EnerSense • Smart • Secure • Connected
                </p>
            </footer>

    </div>
  );
};

export default IoTDevices;
