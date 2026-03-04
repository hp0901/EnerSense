import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "May", cost: 203 },
  { month: "Jun", cost: 214 },
];

const CostChangeChart = () => {
  return (
    <div className="bg-[#020617] p-6 rounded-xl">

      <h2 className="text-center text-lg font-semibold text-green-400 mb-4">
        Change in Cost
      </h2>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 6"
              vertical={false}
            />

            <XAxis
              dataKey="month"
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

            <Bar
              dataKey="cost"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-center text-red-400 text-sm mt-3">
        ▲ 5.42% increase in cost
      </p>

    </div>
  );
};

export default CostChangeChart;