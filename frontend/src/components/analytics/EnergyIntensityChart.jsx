import React from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

const data = [
  {
    name: "Energy Intensity",
    value: 47,
    fill: "#22c55e",
  },
];

const EnergyIntensityChart = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">

      <h2 className="text-center text-lg font-semibold text-green-400 mb-4">
        Energy Intensity
      </h2>

      <div className="h-56 w-full relative">

        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >

            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />

            <RadialBar
              background
              clockWise
              dataKey="value"
              cornerRadius={10}
              animationDuration={1500}
            />

          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-white">47</p>
          <p className="text-xs text-slate-400">kWh / Sqft</p>
        </div>

      </div>

    </div>
  );
};

export default EnergyIntensityChart;