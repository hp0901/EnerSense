import { Leaf } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- RANDOM DATA GENERATOR ---------------- */

const months = [
  "Jan","Feb","Mar","Apr","May",
  "Jun","Jul","Aug","Sep","Oct"
];

const generateRandomCO2Data = () => {
  let base = 50;

  return months.map((month) => {
    base = base - Math.random() * 3 + Math.random() * 2;
    return {
      month,
      co2: Math.max(20, Math.round(base)),
    };
  });
};

const generateGreenScore = () => {
  const score = Math.floor(Math.random() * 20) + 70;

  return {
    score,
    status: score >= 80 ? "Good" : "Average",
    message:
      score >= 80
        ? "Your energy usage is more efficient than most households."
        : "You can improve efficiency by reducing peak-time consumption.",
  };
};

/* ---------------- COMPONENT ---------------- */

export default function GreenScorePage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const isPremium = user?.isPremium;

  const co2Data = useMemo(() => generateRandomCO2Data(), []);
  const greenScoreData = useMemo(() => generateGreenScore(), []);

  /* CO2 REDUCTION CALC */
  const reductionPercent = useMemo(() => {
    const first = co2Data[0]?.co2 || 0;
    const last = co2Data[co2Data.length - 1]?.co2 || 0;
    return first > 0
      ? Math.max(0, Math.round(((first - last) / first) * 100))
      : 0;
  }, [co2Data]);

  /* GAUGE CONFIG */
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference -
    (greenScoreData.score / 100) * circumference;

  const getScoreColor = () => {
    if (greenScoreData.score >= 80) return "#16a34a";
    if (greenScoreData.score >= 60) return "#ca8a04";
    return "#dc2626";
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

        {/* GREEN SCORE SECTION */}
        <div className="bg-white border rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold text-lg mb-6">
            Your Green Score
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* GAUGE */}
            <div className="relative flex items-center justify-center">
              <svg width="180" height="180">
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke={getScoreColor()}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 1.2s ease",
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">
                  {greenScoreData.score}
                </span>
                <Leaf className="text-green-600 mt-1" size={20} />
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1">
              <p className="text-gray-600">
                Status:{" "}
                <span className="font-semibold">
                  {greenScoreData.status}
                </span>
              </p>

              <p className="text-sm text-gray-500 mt-2 max-w-md">
                {greenScoreData.message}
              </p>

              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 inline-flex items-center gap-2">
                <Leaf className="text-green-600" size={18} />
                <span>
                  CO₂ reduced by{" "}
                  <span className="font-semibold text-green-600">
                    {reductionPercent}%
                  </span>{" "}
                  over last months
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CO2 CHART */}
        <div className="bg-white border rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold text-lg mb-6">
            CO₂ Emission Trend (Demo Data)
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
                  animationDuration={1200}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Last updated: {co2Data[co2Data.length - 1]?.month}
          </p>
           </div>

          {/* HOW IT WORKS */}
          <div className="mt-6 text-sm text-gray-600 rounded-lg p-4 bg-green-50 border border-green-200">
            <p className="font-semibold mb-2">How Green Score Works</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>EnerSense analyzes energy consumption patterns.</li>
              <li>CO₂ emissions are estimated from energy usage.</li>
              <li>Efficient usage improves your green score.</li>
              <li>Suggestions help reduce environmental impact.</li>
            </ul>

            <p className="mt-3">
              Your Green Score is calculated based on energy consumption,
              time-of-use patterns, and estimated carbon emissions.
              A higher score indicates more efficient and eco-friendly
              energy usage.
            </p>
         
        </div>

        {/* CTA */}
        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">
              Unlock Sustainability Insights
            </h3>

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
