import React, { useState } from "react";

export default function WhyEnersense() {
  const [enabled, setEnabled] = useState(false);

  const beforeData = [
    [
      "Energy data scattered across systems",
      "No centralized visibility",
      "Hard to track consumption trends",
    ],
    [
      "Manual tracking & inefficiency",
      "Time-consuming processes",
      "High chance of human error",
    ],
    [
      "No real-time insights",
      "Delayed decision making",
      "Reactive instead of proactive",
    ],
    [
      "Difficult reporting & analysis",
      "Fragmented reports",
      "No automation available",
    ],
  ];

  const afterData = [
    {
      title: "Centralized Dashboard",
      points: [
        "All data in one place",
        "Unified energy visibility",
        "Easy monitoring",
      ],
    },
    {
      title: "Real-time Monitoring",
      points: [
        "Live energy tracking",
        "Instant alerts",
        "Better control",
      ],
    },
    {
      title: "Smart Insights",
      points: [
        "AI-driven analytics",
        "Predictive insights",
        "Cost optimization",
      ],
    },
    {
      title: "Automated Reports",
      points: [
        "Auto-generated reports",
        "Time saving",
        "Accurate data",
      ],
    },
  ];

  const positions = [
  "top-2 right-2 sm:left-2 sm:right-auto rotate-[-6deg]",

  "top-[180px] left-2 sm:top-28 sm:right-2 sm:left-auto rotate-[6deg]",
  "top-[320px] right-2 sm:bottom-28 sm:left-6 sm:right-auto rotate-[-4deg]",

  "top-[450px] left-2 sm:bottom-2 sm:right-4 sm:left-auto rotate-[4deg]",
];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 w-full max-w-md shadow-2xl overflow-hidden border border-white/10">

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 via-yellow-300/20 to-yellow-500/30 blur-3xl animate-pulse" />

        {/* Lightning */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
          <path
            d="M95 0 L130 75 L105 75 L120 160 L70 85 L95 85 Z"
            fill="none"
            stroke="url(#lightningGradient)"
            strokeWidth="2.5"
            strokeDasharray="200"
            strokeDashoffset="200"
          >

        <animate
              attributeName="stroke-dashoffset"
              values="200;0;200"
              keyTimes="0;0.2;1"
              dur="6s"
              repeatCount="indefinite"
            />

          <animate
              attributeName="opacity"
              values="0;1;0;0"
              keyTimes="0;0.2;0.25;1"
              dur="6s"
              repeatCount="indefinite"
            />
            </path>

                <defs>
                  <linearGradient id="lightningGradient">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#fde047" />
                  </linearGradient>
                  </defs>
        </svg>

        {/* Header */}
        <div className="flex flex-col items-center mb-6 relative z-10">
          <img
            src="https://res.cloudinary.com/harshpatel0901/image/upload/v1768970755/EnerSence_logo_oarobg.png"
            alt="EnerSense Logo"
            className="w-14 sm:w-16 mb-2 animate-bounce"
          />
          <h1 className="text-white font-semibold text-lg">EnerSense</h1>
          <p className="text-green-400 text-xs">
            Smart Energy. Smarter Living.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center mb-6 gap-4 relative z-10">
          <span className={`${!enabled ? "text-white" : "text-gray-500"}`}>
            Before EnerSense
          </span>

          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition ${
              enabled ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
                enabled ? "translate-x-6" : ""
              }`}
            />
          </button>

          <span className={`${enabled ? "text-white" : "text-gray-500"}`}>
            After EnerSense
          </span>
        </div>

        {/* Content */}
        <div className="relative h-[570px] z-10">

          {/* BEFORE */}
          {!enabled &&
            beforeData.map((points, index) => (
              <Card
                key={index}
                points={points}
                className={`${positions[index]} animate-float`}
              />
            ))}

          {/* AFTER */}
          {enabled &&
            afterData.map((item, index) => (
              <Card
                key={index}
                points={[item.title, ...item.points]}
                success
                className={`${positions[index]} animate-float`}
              />
            ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

/* Card */
function Card({ points, className, success }) {
  return (
    <div
      className={`absolute text-xs p-4 sm:p-4 rounded-xl shadow-lg w-[70%] max-w-[180px] backdrop-blur-lg border ${
        success
          ? "bg-green-500/10 border-green-400 shadow-green-500/20"
          : "bg-zinc-800/80 border-red-400/20"
      } ${className}`}
    >
      {points.map((p, i) => (
        <p key={i} className="mb-1 text-white leading-tight">
          • {p}
        </p>
      ))}

      <div
        className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
          success ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {success ? "✓" : "×"}
      </div>
    </div>
  );
}

/* unchanged */
function Feature({ title, points }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-3">
      <h3 className="text-green-400 text-sm font-medium mb-1">{title}</h3>
      {points.map((p, i) => (
        <p key={i} className="text-white text-xs">
          • {p}
        </p>
      ))}
    </div>
  );
}