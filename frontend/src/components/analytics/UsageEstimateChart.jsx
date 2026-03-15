import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Jun 1", usage: 50 },
  { day: "Jun 8", usage: 120 },
  { day: "Jun 15", usage: 190 },
  { day: "Jun 22", usage: 300 },
  { day: "Jun 29", usage: 390 },
];

const UsageEstimateChart = () => {
  return (
    <div className="w-full ">

      {/* Chart */}

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid
              stroke="#8b9cb3"
              strokeDasharray="4 6"
              vertical={false}
              opacity={0.4}
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tick={{ fill: "#e2e8f0", fontSize: 12 }}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#e2e8f0", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#304678",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="usage"
              stroke="#4ade80"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
              animationDuration={1500}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Prediction Info */}

      <div className="mt-6 pt-4 border-t border-[#334155] text-center text-sm text-gray-300">

        Till Now:
        <span className="text-white font-semibold ml-1">
          164 kWh
        </span>

        <span className="mx-3 text-gray-500">|</span>

        Predicted:
        <span className="text-white font-semibold ml-1">
          439 kWh
        </span>

      </div>

    </div>
  );
};

export default UsageEstimateChart;