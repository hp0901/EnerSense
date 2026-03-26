import React from "react";

const GuestCard = () => {
  const card = {
    userUID: "GUEST-USER",
    boardUID: "GUEST-METER",
    boardName: "Demo Electricity Board",
    name: "Guest User",
    email: "guest@enersense.io",
    phone: "+91 XXXXXXXXXX",
    state: "NA",
    gender: "NA",
    role: "guest",
    joinDate: "2024-01-01",
    cardType: "Silver",
    deviceCount: 0,
  };

  return (
    <div className="w-full max-w-lg rounded-2xl shadow-xl border border-gray-400
      bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-black/10">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            EnerSense Smart Card
          </h2>
          <p className="text-xs text-gray-600">Guest Access Mode</p>
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider">
          {card.cardType} Card
        </span>
      </div>

      {/* Body */}
      <div className="flex gap-4 px-6 py-5">
        {/* Left Info */}
        <div className="flex-1 space-y-1 text-sm text-gray-800">
          <p className="text-lg font-semibold">{card.name}</p>
          <p className="text-xs text-gray-600">{card.email}</p>

          <div className="mt-2 space-y-0.5">
            <p><b>User UID:</b> {card.userUID}</p>
            <p><b>Board UID:</b> {card.boardUID}</p>
            <p><b>Board:</b> {card.boardName}</p>
            <p><b>State:</b> {card.state}</p>
            <p><b>Gender:</b> {card.gender}</p>
            <p><b>Role:</b> {card.role}</p>
            <p><b>Joined:</b> {card.joinDate}</p>
            <p><b>Devices:</b> {card.deviceCount}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-24 h-24 rounded-lg bg-white/70 flex items-center justify-center text-xs text-gray-500">
            QR Locked
          </div>
          <p className="text-[10px] mt-1 text-gray-600">
            Login to unlock QR
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-black/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-[11px] text-gray-600">
          Limited access for guest users
        </p>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm
            hover:bg-blue-700 transition"
          onClick={() => window.location.href = "/login"}
        >
          Login to Activate Card
        </button>
      </div>
    </div>
  );
};

export default GuestCard;
