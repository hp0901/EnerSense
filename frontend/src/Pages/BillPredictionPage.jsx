import { LineChart as LineIcon, TrendingDown, Zap } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* MOCK BACKEND DATA */

const billData = [
  { month: "Jan", bill: 1200 },
  { month: "Feb", bill: 1350 },
  { month: "Mar", bill: 1100 },
  { month: "Apr", bill: 980 },
];

const predictionData = {
  estimatedBill: 1050,
  message:
    "Your bill is expected to decrease due to reduced consumption.",
};

export default function BillPredictionPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const isPremium = user?.isPremium;

  /* -------- Animated Counter -------- */
  const [displayBill, setDisplayBill] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = predictionData.estimatedBill;
    const duration = 900;
    const stepTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 10;
      setDisplayBill(start);
      if (start >= end) {
        setDisplayBill(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  /* Savings Calculation */
  const lastMonthBill = billData[billData.length - 1].bill;
  const savings = Math.max(0, lastMonthBill - predictionData.estimatedBill);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-md border rounded-2xl p-6 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <LineIcon className="text-indigo-600" size={28} />
            <h1 className="text-3xl font-bold">Bill Prediction</h1>
          </div>

          <p className="text-gray-600 max-w-2xl">
            Estimate your upcoming electricity bill based on your current
            consumption trends and historical usage patterns.
          </p>
        </div>

        {/* PREDICTION CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold text-lg mb-4">
            Estimated Next Bill
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Animated Bill */}
            <div>
              <p className="text-5xl font-bold text-indigo-600 transition-all">
                ₹{displayBill}
              </p>

              <p className="text-gray-600 mt-2">
                {predictionData.message}
              </p>

              {savings > 0 && (
                <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-lg text-sm">
                  <TrendingDown size={16} />
                  Expected savings ₹{savings}
                </div>
              )}
            </div>

            {/* Visual Hint */}
            <div className="text-6xl animate-pulse">⚡</div>
          </div>
        </div>

        {/* QUICK INSIGHTS */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <Zap className="text-indigo-600 mb-2" />
            <p className="font-semibold">Lower Usage</p>
            <p className="text-sm text-gray-500">
              Reduced energy consumption detected this month.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <TrendingDown className="text-green-600 mb-2" />
            <p className="font-semibold">Cost Decrease</p>
            <p className="text-sm text-gray-500">
              Your estimated bill is trending lower.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <LineIcon className="text-indigo-600 mb-2" />
            <p className="font-semibold">Smart Prediction</p>
            <p className="text-sm text-gray-500">
              Prediction based on historical usage patterns.
            </p>
          </div>
        </div>

        {/* CHART */}
        <div className="bg-white border rounded-2xl p-6 shadow-md mb-12">
          <h2 className="font-semibold text-lg mb-6">
            Monthly Bill Trend
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={billData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bill"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  animationDuration={1200}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CTA */}
        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-indigo-50 to-blue-50 border rounded-2xl p-8">
            <h3 className="font-semibold mb-2">
              Unlock Smart Bill Prediction
            </h3>

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
