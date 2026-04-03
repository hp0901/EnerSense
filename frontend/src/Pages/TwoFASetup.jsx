import React, { useState } from "react";
import toast from "react-hot-toast";

const TwoFASetup = () => {
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const generate2FA = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:4000/api/v1/2fa/generate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setQrCode(data.qrCode);
      setEnabled(true);

      toast.success("Scan QR in Google Authenticator 📱");

    } catch (err) {
      toast.error(err.message || "Failed to setup 2FA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#3F5680] p-6 rounded-2xl shadow-lg text-white mb-6">

      <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">
        🔐 Google Authenticator Setup
      </h3>

      {/* BUTTON */}
      {!enabled && (
        <button
          onClick={generate2FA}
          disabled={loading}
          className="w-full bg-purple-600 py-3 rounded-xl font-bold mb-4"
        >
          {loading ? "Generating..." : "Enable Google 2FA"}
        </button>
      )}

      {/* QR CODE */}
      {qrCode && (
        <div className="text-center">
          <p className="mb-2 text-sm">
            Scan this QR in Google Authenticator
          </p>

          <img
            src={qrCode}
            alt="QR Code"
            className="mx-auto w-44 h-44 bg-white p-2 rounded-lg"
          />

          <p className="text-xs text-gray-300 mt-2">
            ⚠️ Scan once. Do not regenerate.
          </p>
        </div>
      )}
    </div>
  );
};

export default TwoFASetup;