import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { sendOtpApi, verifyOtpApi } from "../services/operations/adminapi.js";

const Setup2FA = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30); // ⏱️ 30 sec timer

  const navigate = useNavigate();

  // ⏱️ TIMER LOGIC
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // 📩 SEND OTP
  const sendOTP = async () => {
    if (!email) {
      toast.error("Enter email");
      return;
    }

    try {
      setLoading(true);

      await sendOtpApi(email);

      setOtpSent(true);
      setTimer(30); // reset timer
      toast.success("OTP sent to your email 📩");

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const resendOTP = async () => {
    if (timer > 0) return;

    try {
      setLoading(true);

      await sendOtpApi(email);

      setTimer(30);
      toast.success("OTP resent 📩");

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 VERIFY OTP
  const verifyOTP = async () => {
    if (loading) return;

    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtpApi(email, otp);

      localStorage.setItem("token", res.token);
      window.dispatchEvent(new Event("loginSuccess"));

      toast.success("🎉 Login Successful");

      navigate("/admin", { replace: true });

    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 CHANGE EMAIL
  const handleChangeEmail = () => {
    setOtpSent(false);
    setOtp("");
    setTimer(30);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2E436E] px-4">
      <div className="bg-[#3F5680] p-8 rounded-2xl shadow-xl w-full max-w-md text-white">

        <h2 className="text-2xl font-bold text-green-400 text-center mb-6">
          🔐 Email Login (Admin Only)
        </h2>

        {/* EMAIL SECTION */}
        {!otpSent && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl text-black mb-4"
            />

            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full bg-blue-500 py-3 rounded-xl font-bold mb-4 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* OTP SECTION */}
        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-xl text-black mb-4 text-center tracking-widest"
              maxLength={6}
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-green-500 py-3 rounded-xl font-bold mb-3"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            {/* ⏱️ RESEND TIMER */}
            <div className="text-center text-sm mb-3">
              {timer > 0 ? (
                <span className="text-gray-300">
                  Resend OTP in {timer}s
                </span>
              ) : (
                <button
                  onClick={resendOTP}
                  className="text-blue-400 font-bold"
                >
                  Resend OTP
                </button>
              )}
            </div>

            {/* 🔄 CHANGE EMAIL */}
            <button
              onClick={handleChangeEmail}
              className="w-full bg-gray-500 py-2 rounded-xl font-bold"
            >
              Change Email
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Setup2FA;