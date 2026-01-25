import React from "react";
import UserCardQR from "./UserCardQR";

const cardStyles = {
 Silver: {
  bg: "bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200",
  border: "border-gray-400",
  badge: "text-gray-700",
 },
  Gold: {
    bg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    border: "border-yellow-500",
    badge: "text-yellow-800",
  },
  Platinum: {
    bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    border: "border-purple-600",
    badge: "text-purple-800",
  },
};

const UserCard = ({ card }) => {
  const style = cardStyles[card.cardType] || cardStyles.Silver;

  return (
    <div
      className={`w-full max-w-[360px] md:max-w-[520px] mx-auto
      rounded-xl border shadow-lg ${style.bg} ${style.border}`}
    >
      {/* Header */}
      <div className="flex justify-between px-4 py-3 border-b">
        <div>
          <h2 className="text-sm font-bold">EnerSense Smart Card</h2>
          <p className="text-[10px] text-gray-600">
            Government of Smart Energy
          </p>
        </div>

        <span className={`text-[10px] font-semibold ${style.badge}`}>
          {card.cardType.toUpperCase()} CARD
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-3 text-[11px] space-y-2">
        {/* Name */}
        <div>
          <p className="font-semibold text-sm">{card.name}</p>
          <p className="text-[10px] text-gray-600 break-all">
            {card.email}
          </p>
        </div>

        {/* Details + QR (mobile inline) */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 items-start">
          <p><b>UID:</b> {card.userUID}</p>
          <p><b>Board UID:</b> {card.boardUID}</p>

          <p><b>Board:</b> {card.boardName}</p>
          <p><b>State:</b> {card.state}</p>

          <p><b>Phone:</b> {card.phone}</p>
          <p><b>Gender:</b> {card.gender}</p>

          <p><b>Role:</b> {card.role}</p>
          <p><b>Devices:</b> {card.deviceCount}</p>
        </div>

        {/* QR (mobile centered & compact) */}
        <div className="flex justify-center pt-2">
          <div className="scale-90">
            <UserCardQR card={card} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center px-4 py-2 border-t text-[9px] text-gray-600">
        {/* <span>Valid for lifetime</span> */}
        <span>Official EnerSense Digital Identity</span>
      </div>
    </div>
  );
};

export default UserCard;
