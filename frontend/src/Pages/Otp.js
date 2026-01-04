import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "../index.css";
const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [Success, setSuccess] = useState(false);

  // ⏳ Resend timer
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleVerify = () => {
    if (otp !== "12345678") {
      setError(true);
      setOtp("");
      setTimeout(() => setError(false), 400);
      return;
    }
    // alert("OTP Verified ✅");
    setError(false);
    setSuccess(true);
  };

  const handleResend = () => {
    setTimeLeft(30);
    setOtp("");
    setError(false);
    alert("OTP Resent 📩");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div
        className={`w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 ${
          error ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-2xl font-semibold text-center text-slate-800">
          Verify OTP
        </h2>
        <p className="text-sm text-center text-slate-500 mt-2">
          Enter the 8-digit code sent to your email
        </p>

        {/* OTP INPUTS */}
        <div className="mt-8 flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={8}
            shouldAutoFocus
            containerStyle={{
              display: "flex",
              gap: "12px",
            }}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "9999px",   // 🔥 FORCE CIRCLE
                  backgroundColor: "#676c76ff",
                  color: "#ffffff",
                  fontSize: "22px",
                  textAlign: "center",
                  border: error ? "2px solid #ef4444" : "2px solid #366fbeff",
                  outline: "none",
                }}
                className="focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            )}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center mt-4">
            ❌ Invalid OTP. Please try again.
          </p>
        )}

        {Success && (
          <p className="text-sm text-green-600 text-center mt-4">
            ✅ Verification Successful!  🎉 Check your email for OTP.
          </p>
        )}

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={otp.length !== 8}
          className={`mt-8 w-full py-3 rounded-xl text-white font-medium transition-all
            ${
              otp.length === 8
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
        >
          Verify OTP
        </button>

        {/* RESEND */}
        <div className="mt-6 text-center text-sm text-slate-500">
          {timeLeft > 0 ? (
            <span>
              Resend OTP in <b>{timeLeft}s</b>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-indigo-600 font-medium hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
