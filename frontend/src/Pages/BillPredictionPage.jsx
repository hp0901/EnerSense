import { LineChart as LineIcon } from "lucide-react";
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

/* MOCK BACKEND DATA */

const billData = [
  { month: "Jan", bill: 1200 },
  { month: "Feb", bill: 1350 },
  { month: "Mar", bill: 1100 },
  { month: "Apr", bill: 980 },
];

const predictionData = {
  estimatedBill: 1050,
  message: "Your bill is expected to decrease due to reduced consumption.",
};

export default function BillPredictionPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const isPremium = user?.isPremium;

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

          <p className="text-5xl font-bold text-indigo-600">
            ₹{predictionData.estimatedBill}
          </p>

          <p className="text-gray-600 mt-2">
            {predictionData.message}
          </p>
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
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-indigo-50 to-blue-50 border rounded-2xl p-8">
            <h3 className="font-semibold mb-2">
              Unlock Smart Bill Prediction
            </h3>

            <button
              onClick={() => navigate("/pricing")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
