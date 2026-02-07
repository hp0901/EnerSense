import { Leaf } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- MOCK BACKEND DATA ---------------- */

const co2Data = [
  { month: "Jan", co2: 42 },
  { month: "Feb", co2: 38 },
  { month: "Mar", co2: 34 },
  { month: "Apr", co2: 30 },
];

const greenScoreData = {
  score: 82,
  status: "Good",
  message:
    "Your energy usage is more efficient than 68% of similar households.",
};

/* ---------------- COMPONENT ---------------- */

export default function GreenScorePage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const isPremium = user?.isPremium;

  const getScoreColor = () => {
    if (greenScoreData.score >= 80) return "text-green-600";
    if (greenScoreData.score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="text-green-600" size={28} />
            <h1 className="text-3xl font-bold">CO₂ & Green Score</h1>
          </div>

          <p className="text-gray-600 max-w-2xl">
            Track your carbon footprint and understand how eco-friendly your
            energy consumption is. EnerSense helps you reduce emissions and
            improve sustainability through smarter energy usage.
          </p>
        </div>

        {/* GREEN SCORE CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold text-lg mb-4">
            Your Green Score
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className={`text-5xl font-bold ${getScoreColor()}`}>
                {greenScoreData.score}
              </p>
              <p className="text-gray-600 mt-1">
                Status: {greenScoreData.status}
              </p>
              <p className="text-sm text-gray-500 mt-2 max-w-md">
                {greenScoreData.message}
              </p>
            </div>

            <div className="text-6xl">🌱</div>
          </div>
        </div>

        {/* CO2 CHART */}
        <div className="bg-white border rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold text-lg mb-6">
            CO₂ Emission Trend
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={co2Data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="co2"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            How Green Score Works
          </h2>

          <ul className="space-y-2 text-gray-600">
            <li>• EnerSense analyzes energy consumption patterns.</li>
            <li>• CO₂ emissions are estimated from energy usage.</li>
            <li>• Efficient usage improves your green score.</li>
            <li>• Suggestions help reduce environmental impact.</li>
          </ul>
        </div>

        {/* CTA */}
        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">
              Unlock Sustainability Insights
            </h3>

            <p className="text-gray-600 mb-4">
              Upgrade to premium to track your carbon footprint and improve
              your green score with advanced analytics.
            </p>

            <button
              onClick={() => navigate("/pricing")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
