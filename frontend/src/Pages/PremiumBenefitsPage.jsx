import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

/* Icons */
import {
  Leaf,
  Zap,
  BarChart3,
  LineChart as LineIcon,
  FileText,
  Headphones,
} from "lucide-react";

/* Charts */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- STATIC DEMO DATA ---------------- */

const co2Data = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 38 },
  { month: "Mar", value: 34 },
  { month: "Apr", value: 30 },
];

const billData = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1350 },
  { month: "Mar", value: 1100 },
  { month: "Apr", value: 980 },
];

const usageData = [
  { month: "Jan", value: 320 },
  { month: "Feb", value: 290 },
  { month: "Mar", value: 260 },
  { month: "Apr", value: 230 },
];

/* ---------------- BENEFITS CONFIG ---------------- */

const benefits = [
  {
    title: "Unlimited alerts",
    description:
      "Get real-time notifications for power usage spikes, device activity, and abnormal energy behavior without limits.",
    icon: <Zap className="text-yellow-500" />,
    link: "/alerts",
  },
  {
    title: "Fault detection",
    description:
      "Automatically detects electrical faults, overloads, and unusual power patterns to help prevent failures.",
    icon: <Zap className="text-red-500" />,
    link: "/fault-detection",
  },
  {
    title: "CO₂ & Green score",
    description:
      "Track your carbon footprint and see how eco-friendly your energy usage is.",
    icon: <Leaf className="text-green-600" />,
    chart: "co2",
    link: "/green-score",
  },
  {
    title: "Bill prediction",
    description:
      "Estimate your upcoming electricity bill based on current consumption.",
    icon: <LineIcon className="text-indigo-600" />,
    chart: "bill",
    link: "/bill-prediction",
  },
  {
    title: "Monthly reports",
    description:
      "Receive detailed monthly energy reports with insights and optimization suggestions.",
    icon: <BarChart3 className="text-blue-600" />,
    chart: "usage",
    link: "/reports",
  },
  {
    title: "Priority support",
    description:
      "Get faster responses and dedicated assistance from EnerSense support.",
    icon: <Headphones className="text-purple-600" />,
    link: "/support",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function PremiumBenefitsPage() {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">Loading benefits...</p>
      </div>
    );
  }

  const isPremium = user?.isPremium;

  const getChartData = (type) => {
    if (type === "co2") return co2Data;
    if (type === "bill") return billData;
    if (type === "usage") return usageData;
    return [];
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-4">Premium Benefits 💎</h1>
      <p className="text-gray-600 mb-10">
        {isPremium
          ? "You have full access to all premium features."
          : "Explore premium features with live previews. Upgrade to unlock full access."}
      </p>

      {/* BENEFITS LIST */}
      <div className="space-y-6">
        {benefits.map((item, index) => (
          <div
  key={index}
  className={`p-6 rounded-2xl border transition-all duration-200
  ${
    isPremium
      ? "bg-green-50 border-green-200"
      : "bg-white border-gray-200 hover:shadow-md"
  }`}
>
  <div className="flex justify-between items-start gap-4">
    <div className="flex items-start gap-3">
      <div className="mt-1">{item.icon}</div>

      <div>
        <h3 className="font-semibold text-lg text-gray-900">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 mt-1 max-w-xl">
          {item.description}
        </p>
      </div>
    </div>

    <span className="text-xl">
      {isPremium ? "✔" : "🔒"}
    </span>
  </div>

  {/* GRAPH PREVIEW */}
  {item.chart && (
    <div
      className={`mt-6 h-40 ${
        !isPremium ? "opacity-70 blur-[1px]" : ""
      }`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={getChartData(item.chart)}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4f46e5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )}

  {/* ACTION BUTTON */}
  <div className="mt-5 flex gap-3">
    <button
      onClick={() => navigate(item.link)}
      className="px-4 py-2 text-sm rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
    >
      View Feature
    </button>

    {!isPremium && (
      <button
        onClick={() => navigate("/pricing")}
        className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Upgrade
      </button>
    )}
  </div>
</div>

        ))}
      </div>

      {/* CTA */}
      {!isPremium && (
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/pricing")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
          >
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
}
