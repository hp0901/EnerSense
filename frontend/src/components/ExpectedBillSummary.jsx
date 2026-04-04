import React from "react";

const ExpectedBillSummary = ({
  peakUnits,
  nonPeakUnits,
  peakRate,
  nonPeakRate,
}) => {
  const peakAmount = peakUnits * peakRate;
  const nonPeakAmount = nonPeakUnits * nonPeakRate;
  const total = peakAmount + nonPeakAmount;

  // 🕒 New Logic
  const hour = new Date().getHours();

  // Peak: 6 PM → 6 AM
  const isPeakHour = hour >= 18 || hour < 6;

  return (
    <div className="border-slate-700 mb-5 shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          💡 Expected Bill Summary
        </h2>

        {/* Status Badge */}
        <span
          className={`text-xs px-2 py-1 text-center rounded-full font-medium ${
            isPeakHour
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {isPeakHour ? "🔥 Peak Hour (6PM–6AM)" : "☀️ Non-Peak (6AM–6PM)"}
        </span>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-sm">

        {/* Peak */}
        <div className="flex justify-between items-center text-gray-300 bg-slate-800/60 px-3 py-2 rounded-lg">
          <span>
            ⚡ Peak ({peakUnits} kWh × ₹{peakRate})
          </span>
          <span className="text-yellow-400 font-medium">
            ₹ {peakAmount.toFixed(2)}
          </span>
        </div>

        {/* Non Peak */}
        <div className="flex justify-between items-center text-gray-300 bg-slate-800/60 px-3 py-2 rounded-lg">
          <span>
            🌙 Non-Peak ({nonPeakUnits} kWh × ₹{nonPeakRate})
          </span>
          <span className="text-blue-400 font-medium">
            ₹ {nonPeakAmount.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-2"></div>

        {/* Total */}
        <div className="flex justify-between items-center font-semibold text-lg">
          <span className="text-white flex items-center gap-2">
            💰 Total
          </span>
          <span className="text-green-400 text-xl">
            ₹ {total.toFixed(2)}
          </span>
        </div>

        {/* ✅ Polite Message */}
        <p className="text-xs text-gray-400 mt-2">
          {isPeakHour
            ? "⚠️ Peak hours are currently active. Electricity rates may be higher — consider reducing heavy usage if possible."
            : "✅ You are currently in non-peak hours. This is a good time to use high-power appliances efficiently."}
        </p>

      </div>
    </div>
  );
};

export default ExpectedBillSummary;