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
    <div className="p-3 rounded-xl">

      <h2 className="text-center text-lg font-semibold text-yellow-300 mb-4">
        Usage Estimate
      </h2>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              stroke="#E3EDC2"
              strokeDasharray="4 6"
              vertical={false}
              opacity={0.3}
            />

            <XAxis
              dataKey="day"
              stroke="#E3EDC2"
              tick={{ fill: "#ffffff", fontSize: 12 }}
            />

            <YAxis
              stroke="#E3EDC2"
              tick={{ fill: "#ffffff", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#3F5480",
                border: "none",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />

            <Line
              type="monotone"
              dataKey="usage"
              stroke="#9FD487"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
              animationDuration={1500}
            />

          </LineChart>

        </ResponsiveContainer>
      </div>

      <div className="text-center text-sm mt-4 text-[#E3EDC2]">

        Till Now:
        <span className="text-white font-semibold ml-1">
          164 kWh
        </span>

        <br />

        Predicted:
        <span className="text-white font-semibold ml-1">
          439 kWh
        </span>

      </div>

    </div>
  );
};

export default UsageEstimateChart;