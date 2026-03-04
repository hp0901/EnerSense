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
  { appliance: "Heating & AC", usage: 1.4 },
  { appliance: "EV Charge", usage: 0.9 },
  { appliance: "Plug Loads", usage: 0.8 },
  { appliance: "Refrigeration", usage: 0.7 },
  { appliance: "Lighting", usage: 0.4 },
];

const ActiveAppliancesChart = () => {
  return (
    <div className="bg-[#020617] p-6 rounded-xl">

      <h2 className="text-center text-lg font-semibold text-green-400 mb-4">
        Active Appliances
      </h2>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
          >

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="4 6"
              horizontal={false}
            />

            <XAxis
              type="number"
              stroke="#94a3b8"
              tick={{ fill: "#cbd5f5", fontSize: 12 }}
            />

            <YAxis
              type="category"
              dataKey="appliance"
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
              dataKey="usage"
              fill="#a855f7"
              radius={[0, 6, 6, 0]}
              animationDuration={1200}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ActiveAppliancesChart;