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
    <div className="bg-[#020617] p-6 rounded-xl">

      <h2 className="text-center text-lg font-semibold text-green-400 mb-4">
        Usage Estimate
      </h2>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 6"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tick={{ fill: "#cbd5f5", fontSize: 12 }}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#cbd5f5", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #334155",
                borderRadius: "6px",
              }}
            />

            <Line
              type="monotone"
              dataKey="usage"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              animationDuration={1500}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-sm mt-3  text-slate-400">
        Till Now: <span className="text-white font-semibold">164 kWh</span>
        <br />
        Predicted: <span className="text-white font-semibold">439 kWh</span>
      </div>

    </div>
  );
};

export default UsageEstimateChart;