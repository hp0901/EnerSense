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
  Bronze: {
  bg: "bg-gradient-to-br from-[#f5e6c8] via-[#e0b97a] to-[#b07a3f]",
  border: "border-[#8b5a2b]",
  badge: "text-[#5c3a1e] border-[#8b5a2b] bg-[#e6c79c]/70",
},


};

const UserCard = ({ card }) => {
  const style = cardStyles[card.cardType] || cardStyles.Bronze;

  return (
    <div
      className={`
        w-full mx-auto rounded-2xl border-2 shadow-2xl overflow-hidden
        max-w-[340px] md:max-w-[750px]
        ${style.bg} ${style.border}
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-5 md:px-8 py-4 border-b border-black/5 bg-white/20">
        <div className="uppercase tracking-tighter">
          <h2 className="text-base md:text-xl font-black ">
            EnerSense Smart Card
          </h2>
          <p className="text-[10px] md:text-xs font-bold opacity-60">
            Government of Enersense
          </p>
        </div>

        <div
          className={`text-[10px] md:text-xs font-black px-3 py-1 rounded-full border-2 ${style.badge}`}
        >
          {card.cardType.toUpperCase()} CARD
        </div>
      </div>

      {/* BODY */}
      <div className="p-5 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
        
        {/* LEFT SIDE */}
        <div className="flex-1 w-80 text-center md:text-center">
          <div className="mb-6">
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-tight break-words">
              {card.name}
            </h1>

            <p className="text-xs md:text-base text-gray-500 font-medium lowercase ">
              {card.email?.replace(/(.{2}).+(@.+)/, "$1****$2")}
            </p>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[11px] md:text-sm uppercase font-bold text-slate-700">
            <div className="flex flex-col border-l-2 border-slate-300 pl-3">
              <span className="opacity-50 text-[9px] md:text-[10px]">
                User UID
              </span>
              <span className="font-mono">{card.userUID}</span>
            </div>
            <div className="flex flex-col border-l-2 border-slate-300 pl-3">
              <span className="opacity-50 text-[9px] md:text-[10px]">
                Board UID
              </span>
              <span className="font-mono">{card.boardUID}</span>
            </div>
            <div className="flex flex-col border-l-2 border-slate-300 pl-3 min-w-0">
              <span className="opacity-50 text-[9px] md:text-[10px]">
                Phone
              </span>
            <span className="font-mono tracking-wide">
              {card.phone}
            </span>
            </div>
            <div className="flex flex-col border-l-2 border-slate-300 pl-3 min-w-0">
              <span className="opacity-50 text-[9px] md:text-[10px]">
                Devices
              </span>
              <span>{card.deviceCount} Units</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - QR */}
        <div className="w-full md:w-auto flex flex-col items-center gap-2 shrink-0">
          <div className="rounded-xl w-[120px] sm:w-[130px] md:w-[140px] lg:w-[150px]">
            <UserCardQR card={card} size={120} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-slate-900 text-white/80 py-2 px-5 md:px-8 flex justify-between items-center text-[9px] md:text-[11px] font-bold tracking-widest">
        <span>OFFICIAL ENERSENSE DIGITAL IDENTITY</span>
      </div>
    </div>
  );
};

export default UserCard;
