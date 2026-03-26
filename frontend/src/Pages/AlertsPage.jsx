import { Zap, Bell, Activity, AlertTriangle } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AlertsPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const isPremium = user?.isPremium;

  const alertTypes = [
    {
      title: "Power Spike Alerts",
      desc: "Instant notification when sudden energy spikes are detected.",
      icon: <Activity className="text-red-500" />,
    },
    {
      title: "Device Activity Alerts",
      desc: "Know when devices turn on/off or behave unusually.",
      icon: <Bell className="text-blue-500" />,
    },
    {
      title: "Abnormal Usage Alerts",
      desc: "Detect unexpected energy consumption patterns early.",
      icon: <AlertTriangle className="text-yellow-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-yellow-500" size={28} />
            <h1 className="text-3xl font-bold">Unlimited Alerts</h1>
          </div>

          <p className="text-gray-600 max-w-2xl">
            Get real-time notifications for power usage spikes, device activity,
            and abnormal energy behavior without limits. EnerSense keeps you
            informed instantly so you can prevent energy waste and electrical issues.
          </p>
        </div>

        {/* LIVE PREVIEW */}
        <div className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold text-lg mb-4">
            Live Alerts Preview
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              ⚡ High power usage detected in Living Room
            </div>

            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
              ⚠️ Unusual energy pattern detected
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              🔔 Washing Machine turned ON
            </div>
          </div>
        </div>

        {/* ALERT TYPES */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Alert Types</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {alertTypes.map((item, index) => (
              <div
                key={index}
                className="p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>

          <ul className="space-y-2 text-gray-600">
            <li>• EnerSense monitors real-time power consumption.</li>
            <li>• AI detects abnormal or risky patterns.</li>
            <li>• Instant alerts are sent to your dashboard.</li>
            <li>• Take action before energy loss or device damage.</li>
          </ul>
        </div>

        {/* CTA */}
        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">
              Unlock Unlimited Alerts
            </h3>

            <p className="text-gray-600 mb-4">
              Upgrade to premium to receive unlimited real-time alerts.
            </p>

            <button
              onClick={() => navigate("/pricing")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
