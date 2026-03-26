import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login2FAApi } from "../services/operations/twofa";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useUser } from "../context/UserContext";
import logo from "../assets/EnerSence_logo.png";
import { FiArrowLeft, FiLock } from "react-icons/fi";

const Admin2FAPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  // const userId = localStorage.getItem("admin2FAUserId");

  const handleVerify = async () => {

  const userId = localStorage.getItem("admin2FAUserId");

  if (!userId) {
    toast.error("Session expired. Please login again.");
    navigate("/login");
    return;
  }

  if (!otp || otp.length !== 6) {
    toast.error("Please enter valid 6-digit OTP");
    return;
  }

  const toastId = toast.loading("Verifying OTP...");

  try {

    const res = await login2FAApi(userId, otp);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    setUser(res.user);

    localStorage.removeItem("admin2FAUserId");

    toast.success("2FA Verified Successfully", { id: toastId });

    navigate("/admin", { replace: true });

  } catch (err) {

    console.error("2FA VERIFY ERROR:", err);

    toast.error(
      err?.response?.data?.message || "Invalid OTP",
      { id: toastId }
    );

    setOtp("");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex flex-col">

      {/* 🔥 TOP BRAND BAR */}
      <div className="w-full bg-slate-100 shadow-sm px-4 py-3 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="EnerSense Logo" className="h-10" />
          <span className="text-lg font-semibold text-blue-600">
            EnerSense Admin
          </span>
        </div>

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-gray-800 hover:text-blue-600 transition border border-gray-300 hover:border-blue-600 rounded-md px-3 py-1 bg-blue-400 hover:bg-gray-200"
        >
          <FiArrowLeft />
          Back to Login
        </button>
      </div>

      {/* 🔥 CENTER CONTENT */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-all hover:shadow-indigo-300/40">

          {/* 🔒 Lock Icon */}
          <div className="flex justify-center mb-4 text-indigo-600">
            <FiLock size={32} />
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-800">
            Admin 2FA Verification
          </h2>

          <p className="text-sm text-center text-slate-500 mt-2">
            Enter the 6-digit code sent to your registered email
          </p>

          {/* OTP INPUT */}
          <div className="mt-8 flex justify-center">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              containerStyle={{ display: "flex", gap: "12px" }}
              renderInput={(props) => (
                <input
                  {...props}
                  className="focus:ring-2 focus:ring-indigo-500 transition-all"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "9999px",
                    backgroundColor: "#535261",
                    color: "#ffffff",
                    fontSize: "20px",
                    textAlign: "center",
                    border: "2px solid #4f46e5",
                    outline: "none",
                  }}
                />
              )}
            />
          </div>

          {/* VERIFY BUTTON */}
          <button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            className={`mt-10 w-full py-3 rounded-xl text-white font-semibold transition-all ${
              otp.length === 6
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
          >
            Verify OTP
          </button>

          {/* Extra helper text */}
          <p className="text-xs text-center text-gray-400 mt-6">
            Secure verification required for admin access 🔐
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin2FAPage;