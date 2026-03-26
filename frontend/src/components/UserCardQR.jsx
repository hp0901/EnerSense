import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ShieldCheck } from "lucide-react";

const UserCardQR = ({ card }) => {

  // Only frontend route
const qrUrl =`https://enersense.netlify.app/verify/${card.userUID}`;

  // const qrUrl = `http://localhost:4000/verify/${card.userUID}`;

  return (
    <div className="flex flex-col items-center gap-2">

      <div className="rounded-3xl">
        <div className="relative rounded-2xl inline-flex items-center justify-center">

          <div className="bg-white p-3 rounded-xl">
            <QRCodeCanvas
              value={qrUrl}
              size={110}
              fgColor="#2d2f31"
              level="H"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white rounded-full p-1 shadow-md border border-gray-100">
              <ShieldCheck size={16} className="text-green-600" />
            </div>
          </div>

        </div>
      </div>

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
