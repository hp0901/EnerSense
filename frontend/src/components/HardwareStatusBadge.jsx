import React from "react";

const HardwareStatusBadge = ({ isOnline, lastSeen, showText = true, className = "" }) => {
  // Format lastSeen time nicely if available
  const formattedLastSeen = lastSeen
    ? new Date(lastSeen).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
        isOnline
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
      } ${className}`}
      title={formattedLastSeen ? `Last ping: ${formattedLastSeen}` : undefined}
    >
      {/* Pulse Dot Indicator */}
      <span className="relative flex h-2.5 w-2.5">
        {isOnline && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isOnline ? "bg-emerald-400" : "bg-rose-500"
          }`}
        ></span>
      </span>

      {/* Label Text */}
      {showText && (
        <span>
          {isOnline ? "Hardware Online" : "Hardware Offline"}
        </span>
      )}
    </div>
  );
};

export default HardwareStatusBadge;