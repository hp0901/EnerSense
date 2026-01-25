import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ShieldCheck } from "lucide-react";

const UserCardQR = ({ card }) => {
  const qrData = JSON.stringify({
    userUID: card.userUID,
    boardUID: card.boardUID,
    boardName: card.boardName,
    name: card.name,
    email: card.email,
    phone: card.phone,
    state: card.state,
    gender: card.gender,
    role: card.role,
    joinDate: card.joinDate,
    cardType: card.cardType,
    deviceCount: card.deviceCount,
  });

  return (
    <div className="flex flex-col items-center gap-2">
      {/* QR Container */}
      <div className="relative p-3 bg-white rounded-xl shadow-md border">
        <QRCodeCanvas
          value={qrData}
          size={110}
          bgColor="#ffffff"
          fgColor="#000000"
        />

        {/* Center Badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full p-1 shadow">
            <ShieldCheck size={16} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="text-center leading-tight">
        <p className="text-xs font-semibold text-gray-700">
          EnerSense Verified QR
        </p>
        <p className="text-[10px] text-gray-500">
          Scan to verify user identity
        </p>
      </div>
    </div>
  );
};

export default UserCardQR;
