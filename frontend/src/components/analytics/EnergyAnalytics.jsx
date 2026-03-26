import React, { useState } from "react";

import CostPredictionChart from "./CostPredictionChart";
import CostChangeChart from "./CostChangeChart";
import UsageEstimateChart from "./UsageEstimateChart";
import ActiveAppliancesChart from "./ActiveAppliancesChart";
import EnergyIntensityChart from "./EnergyIntensityChart";
import CarbonFootprintChart from "./CarbonFootprintChart";

const EnergyAnalytics = () => {

  const [timeFilter, setTimeFilter] = useState("Month");

  const filters = ["Day", "Week", "Month", "Year"];

  return (
    <div className="px-4 sm:px-6 py-6 bg-gray-700 min-h-screen">

      {/* ===== Header + Filters ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-green-400">
          Energy Analytics
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 bg-[#020617] p-1 rounded-lg">

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-5 sm:px-4 py-1 text-xs sm:text-sm rounded-md transition-all duration-200 ${
                timeFilter === filter
                  ? "bg-green-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}

        </div>
      </div>

      {/* ===== Charts Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <CostPredictionChart />
        <CostChangeChart />
        <UsageEstimateChart />
        <ActiveAppliancesChart />
        <EnergyIntensityChart />
        <CarbonFootprintChart />

      </div>

    </div>
  );
};

export default EnergyAnalytics;