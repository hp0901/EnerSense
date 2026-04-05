import React, { useState } from "react";

export default function WhyEnersense() {
  const [enabled, setEnabled] = useState(false);

  const beforeData = [
    ["Energy data scattered across systems", "No centralized visibility", "Hard to track trends"],
    ["Manual tracking & inefficiency", "Time-consuming processes", "High human error"],
    ["No real-time insights", "Delayed decision making", "Reactive instead of proactive"],
    ["Difficult reporting & analysis", "Fragmented reports", "No automation available"],
  ];

  const afterData = [
    { title: "Centralized Dashboard", points: ["All data in one place", "Unified energy visibility", "Easy monitoring"] },
    { title: "Real-time Monitoring", points: ["Live energy tracking", "Instant alerts", "Better control"] },
    { title: "Smart Insights", points: ["AI-driven analytics", "Predictive insights", "Cost optimization"] },
    { title: "Automated Reports", points: ["Auto-generated reports", "Time saving", "Accurate data"] },
  ];

  const positions = [
    "top-4 left-4 sm:left-8 rotate-[-6deg]",
    "top-32 right-4 sm:right-8 rotate-[6deg]",
    "bottom-36 left-4 sm:left-8 rotate-[-4deg]",
    "bottom-10 right-4 sm:right-8 rotate-[4deg]",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 w-full max-w-md shadow-2xl overflow-hidden border border-white/10">
        
        {/* Animated Glow */}
        <div className={`absolute inset-0 transition-colors duration-500 blur-3xl ${enabled ? "bg-green-500/20" : "bg-red-500/10"}`} />

        {/* Header */}
        <div className="flex flex-col items-center mb-6 relative z-10">
          <img
            src="https://res.cloudinary.com/harshpatel0901/image/upload/v1768970755/EnerSence_logo_oarobg.png"
            alt="EnerSense Logo"
            className="w-14 mb-2"
          />
          <h1 className="text-white font-semibold text-lg">EnerSense</h1>
          <p className="text-green-400 text-[10px] tracking-widest uppercase">Smart Energy. Smarter Living.</p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center mb-8 gap-4 relative z-10">
          <span className={`text-xs transition-opacity ${!enabled ? "text-white" : "text-gray-500 opacity-50"}`}>Without EnerSense</span>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${enabled ? "bg-green-500" : "bg-gray-600"}`}
          >
            <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${enabled ? "translate-x-7" : ""}`} />
          </button>
          <span className={`text-xs transition-opacity ${enabled ? "text-white" : "text-gray-500 opacity-50"}`}>With EnerSense</span>
        </div>

        {/* Content Area */}
        <div className="relative h-[500px] z-10">
          {!enabled ? (
            beforeData.map((points, index) => (
              <Card key={index} points={points} className={positions[index]} />
            ))
          ) : (
            afterData.map((item, index) => (
              <Card key={index} title={item.title} points={item.points} success className={positions[index]} />
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-8px) rotate(var(--tw-rotate)); }
        }
      `}</style>
    </div>
  );
}

function Card({ title, points, className, success }) {
  return (
    <div className={`absolute p-4 rounded-xl shadow-xl w-[70%] max-w-[180px] backdrop-blur-lg border animate-float transition-all duration-500 ${
        success ? "bg-green-500/10 border-green-400 shadow-green-500/20" : "bg-zinc-900/90 border-red-400/20 shadow-black/40"
      } ${className}`}
    >
      {/* Show title only if it exists (Success state) */}
      {title && <h3 className="text-green-400 font-bold text-[11px] mb-2 uppercase tracking-tight">{title}</h3>}
      
      {points.map((p, i) => (
        <p key={i} className="text-white text-[10px] leading-tight mb-1.5 opacity-90">
          {success ? "✓ " : "• "} {p}
        </p>
      ))}

      <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-md ${
          success ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {success ? "✓" : "✕"}
      </div>
    </div>
  );
}