import { Zap, AlertTriangle, Activity } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

/* ---------------- MOCK BACKEND DATA ---------------- */

const faultData = [
  {
    id: 1,
    device: "Air Conditioner",
    fault: "Power overload detected",
    severity: "critical",
    time: "Today, 10:42 AM",
  },
  {
    id: 2,
    device: "Refrigerator",
    fault: "Voltage fluctuation detected",
    severity: "medium",
    time: "Today, 08:15 AM",
  },
  {
    id: 3,
    device: "Washing Machine",
    fault: "Unusual power consumption",
    severity: "low",
    time: "Yesterday, 09:30 PM",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function FaultDetectionPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const isPremium = user?.isPremium;

  const getSeverityStyle = (severity) => {
    if (severity === "critical")
      return "bg-red-50 border-red-200 text-red-700";
    if (severity === "medium")
      return "bg-yellow-50 border-yellow-200 text-yellow-700";
    return "bg-green-50 border-green-200 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-red-500" size={28} />
            <h1 className="text-3xl font-bold">Fault Detection</h1>
          </div>

          <p className="text-gray-600 max-w-2xl">
            EnerSense automatically detects electrical faults, overloads,
            and unusual power patterns to help prevent failures, reduce
            energy loss, and protect your devices.
          </p>
        </div>

        {/* FAULT LIST */}
        <div className="bg-white border rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold text-lg mb-6">
            Detected Faults (Demo Data)
          </h2>

          <div className="space-y-4">
            {faultData.map((fault) => (
              <div
                key={fault.id}
                className={`p-4 rounded-xl border flex justify-between items-center ${getSeverityStyle(
                  fault.severity
                )}`}
              >
                <div>
                  <h3 className="font-semibold">
                    {fault.device}
                  </h3>
                  <p className="text-sm">{fault.fault}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {fault.time}
                  </p>
                </div>

                <span className="capitalize font-semibold">
                  {fault.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* HOW DETECTION WORKS */}
        <div className="mb-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            How Fault Detection Works
          </h2>

          <ul className="space-y-2 text-gray-600">
            <li>• EnerSense continuously monitors energy usage patterns.</li>
            <li>• AI models compare real-time data with normal behavior.</li>
            <li>• Abnormal voltage or load patterns are detected instantly.</li>
            <li>• Users receive alerts before device failure occurs.</li>
          </ul>
        </div>

        {/* CTA */}
        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">
              Unlock Smart Fault Detection
            </h3>

            <p className="text-gray-600 mb-4">
              Upgrade to premium to enable automatic fault detection
              and advanced protection features.
            </p>

            <button
              onClick={() => navigate("/pricing")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
