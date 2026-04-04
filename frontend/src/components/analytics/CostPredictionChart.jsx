import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Electricity", value: 150 },
  { name: "Gas", value: 64 },
];

const COLORS = ["#22c55e", "#eab308"];

const CostPredictionChart = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">

      <h2 className="text-center text-lg font-semibold text-green-400 mb-4">
        Cost Predicted
      </h2>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mt-3">
        <p className="text-slate-400 text-sm">Total Cost</p>
        <p className="text-xl font-bold text-slate-400 ">₹ 214</p>
      </div>

    </div>
  );
};

export default CostPredictionChart;