import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ShieldCheck } from "lucide-react";

const UserCardQR = ({ card }) => {
  // ✅ ONLY URL, NO JSON
  const qrUrl = `https://enersense.duckdns.org/verify/${card.userUID}`;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* QR Container */}
      <div className="relative p-3 bg-white rounded-xl shadow-md border">
        <QRCodeCanvas
          value={qrUrl}
          size={110}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />

        {/* Center Badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
