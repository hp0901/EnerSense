import { BarChart3 } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

/* MOCK DATA */

const reports = [
  {
    month: "April 2026",
    usage: "230 kWh",
    saving: "12%",
    insight: "Reduced AC usage lowered energy consumption.",
  },
  {
    month: "March 2026",
    usage: "260 kWh",
    saving: "5%",
    insight: "Night-time usage increased slightly.",
  },
];

export default function ReportsPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const isPremium = user?.isPremium;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-md border rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-blue-600" size={28} />
            <h1 className="text-3xl font-bold">Monthly Reports</h1>
          </div>

          <p className="text-gray-600 max-w-2xl">
            Receive detailed monthly energy reports with insights,
            trends, and optimization suggestions.
          </p>
        </div>

        {/* REPORT LIST */}
        <div className="space-y-4 mb-12">
          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <h3 className="font-semibold">{report.month}</h3>
              <p className="text-sm text-gray-600">
                Usage: {report.usage}
              </p>
              <p className="text-sm text-green-600">
                Saving: {report.saving}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {report.insight}
              </p>
            </div>
          ))}
        </div>

        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-2xl p-8">
            <h3 className="font-semibold mb-2">
              Unlock Detailed Reports
            </h3>

            <button
              onClick={() => navigate("/pricing")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
