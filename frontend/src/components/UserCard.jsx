import React from "react";
import UserCardQR from "./UserCardQR";

const cardStyles = {
  Silver: {
    bg: "bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200",
    border: "border-gray-300",
    badge: "text-gray-700 border-gray-400 bg-gray-200/50",
  },
  Gold: {
    bg: "bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200",
    border: "border-yellow-500",
    badge: "text-yellow-800 border-yellow-600 bg-yellow-300/50",
  },
  Platinum: {
    bg: "bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200",
    border: "border-purple-600",
    badge: "text-purple-800 border-purple-700 bg-purple-300/50",
  },
};

const UserCard = ({ card }) => {
  const style = cardStyles[card.cardType] || cardStyles.Silver;

  return (
    <div
      className={`
        w-full mx-auto rounded-2xl border-2 shadow-2xl overflow-hidden
        /* Mobile: Skinny (340px) | Laptop: Broad (750px) */
        max-w-[340px] md:max-w-[750px]
        ${style.bg} ${style.border}
      `}
    >
      {/* HEADER: Flexible padding for laptop */}
      <div className="flex justify-between items-center px-5 md:px-8 py-4 border-b border-black/5 bg-white/20">
        <div className="uppercase tracking-tighter">
          <h2 className="text-base md:text-xl font-black leading-none">
            EnerSense Smart Card
          </h2>
          <p className="text-[10px] md:text-xs font-bold opacity-60">
            Government of Smart Energy
          </p>
        </div>

        <div className={`text-[10px] md:text-xs font-black px-3 py-1 rounded-full border-2 ${style.badge}`}>
          {card.cardType.toUpperCase()} CARD
        </div>
      </div>

      {/* BODY: Swaps from Column (mobile) to Row (laptop) */}
      <div className="p-5 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
        
        {/* Left Side: Name & Info */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="mb-6">
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-tight">
              {card.name}
            </h1>
            <p className="text-xs md:text-base text-gray-500 font-medium lowercase">
              {card.email}
            </p>
          </div>

          {/* Grid for Laptop (2x2 or 3x2) */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[11px] md:text-sm uppercase font-bold text-slate-700">
            <div className="flex flex-col border-l-2 border-slate-300 pl-3">
              <span className="opacity-50 text-[9px] md:text-[10px]">User UID</span>
              <span className="font-mono">{card.userUID}</span>
            </div>
            <div className="flex flex-col border-l-2 border-slate-300 pl-3">
              <span className="opacity-50 text-[9px] md:text-[10px]">Board UID</span>
              <span className="font-mono">{card.boardUID}</span>
            </div>
            <div className="flex flex-col border-l-2 border-slate-300 pl-3">
              <span className="opacity-50 text-[9px] md:text-[10px]">Phone</span>
              <span>{card.phone}</span>
            </div>
            <div className="flex flex-col border-l-2 border-slate-300 pl-3">
              <span className="opacity-50 text-[9px] md:text-[10px]">Devices</span>
              <span>{card.deviceCount} Units</span>
            </div>
          </div>
        </div>

        {/* Right Side: QR Code Area */}
        <div className="w-full md:w-auto flex flex-col items-center gap-2">
          <div className="bg-white p-3 rounded-xl shadow-inner border border-black/5">
            <UserCardQR card={card} size={140} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-slate-900  text-white/80 py-2 px-5 md:px-8 flex justify-between items-center text-[9px] md:text-[11px] font-bold tracking-widest">
        <span>OFFICIAL ENERSENSE DIGITAL IDENTITY</span>
        </div>
    </div>
  );
};

export default UserCard;