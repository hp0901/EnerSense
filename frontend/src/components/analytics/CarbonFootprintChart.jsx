import React from "react";

const CarbonFootprintChart = () => {
  const carbonValue = 1.2; // tons
  const progress = 68; // percent progress

  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">

      <h2 className="text-center text-lg font-semibold text-green-400 mb-4">
        Carbon Footprint
      </h2>

      {/* Carbon Value */}
      <div className="text-center mb-4">
        <p className="text-3xl font-bold text-white">{carbonValue} t</p>
        <p className="text-sm text-slate-400">CO₂ Emissions</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-3 mb-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-green-400 text-center">
        🌱 8% reduction compared to last month
      </p>

    </div>
  );
};

export default CarbonFootprintChart;