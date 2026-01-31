import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../index.css";

/* ===============================
   AUTH APIs
================================ */
import {
  signup,
  verifyForgotPasswordOtp,
  sendOtp,
  sendForgotPasswordOtp,
} from "../services/operations/authapi";

const OTP_RESEND_TIME = 30;

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_RESEND_TIME);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // flow: "signup" | "forgot"
  const { flow, email } = location.state || {};

  const signupData = JSON.parse(localStorage.getItem("signupData"));

  /* ===============================
     SAFETY GUARD
  ================================ */
  useEffect(() => {
    if (!flow) navigate("/login");
  }, [flow, navigate]);

  /* ===============================
     TIMER
  ================================ */
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ===============================
     VERIFY OTP
  ================================ */
  const handleVerify = async () => {
    const enteredOtp = otp.trim();

    if (enteredOtp.length !== 6) return;

    try {
      // 🔐 SIGNUP FLOW
      if (flow === "signup") {
        if (!signupData) {
          navigate("/signup");
          return;
        }

        await signup({
          ...signupData,
          otp: enteredOtp,
        });

        localStorage.removeItem("signupData");
        setSuccess(true);
        setError(false);

        toast.success("✅ Signup successful!");
        setTimeout(() => navigate("/login"), 1200);
      }

      // 🔐 FORGOT PASSWORD FLOW
      else if (flow === "forgot") {
        await verifyForgotPasswordOtp(email, enteredOtp);

        setSuccess(true);
        setError(false);

        toast.success("✅ OTP verified!");
        setTimeout(
          () => navigate("/reset-password", { state: { email } }),
          1200
        );
      }

      else {
        navigate("/login");
      }
    } catch (err) {
      console.error("OTP VERIFY ERROR:", err);
      setError(true);
      setOtp("");
      setTimeout(() => setError(false), 400);
    }
  };

  /* ===============================
     RESEND OTP
  ================================ */
  const handleResend = async () => {
    try {
      setResending(true);
      setOtp("");
      setError(false);
      setSuccess(false);
      setTimeLeft(OTP_RESEND_TIME);

      // 🔁 SIGNUP RESEND
      if (flow === "signup") {
        if (!signupData) {
          navigate("/signup");
          return;
        }
        await sendOtp(signupData.email, signupData.firstName);
      }

      // 🔁 FORGOT PASSWORD RESEND
      else if (flow === "forgot") {
        await sendForgotPasswordOtp(email);
      }

      else {
        navigate("/login");
      }

      // toast.success("📩 OTP resent successfully");
    } catch (err) {
      console.error("RESEND OTP ERROR:", err);
      toast.error("❌ Failed to resend OTP");
      setTimeLeft(0);
    } finally {
      setResending(false);
    }
  };

  /* ===============================
     UI
  ================================ */
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div
        className={`w-full max-w-md bg-white rounded-2xl shadow-xl p-6 transition-all ${
          error ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-2xl font-semibold text-center text-slate-800">
          Verify OTP
        </h2>

        <p className="text-sm text-center text-slate-500 mt-2">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP INPUT */}
        <div className="mt-8 flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            containerStyle={{ display: "flex", gap: "10px" }}
            renderInput={(props) => (
              <input
                {...props}
                className="focus:ring-2 focus:ring-indigo-500 transition-all"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "9999px",
                  backgroundColor: "#676C76",
                  color: "#fff",
                  fontSize: "20px",
                  textAlign: "center",
                  border: error
                    ? "2px solid #ef4444"
                    : "2px solid #4f46e5",
                  outline: "none",
                }}
              />
            )}
          />
        </div>

        {/* ERROR / SUCCESS */}
        {error && (
          <p className="text-sm text-red-600 text-center mt-4">
            ❌ Invalid OTP. Please try again.
          </p>
        )}

        {success && (
          <p className="text-sm text-green-600 text-center mt-4">
            ✅ Verification successful!
          </p>
        )}

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={otp.length !== 6}
          className={`mt-8 w-full py-3 rounded-xl text-white font-semibold transition-all ${
            otp.length === 6
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
              Resend OTP in <b>{timeLeft}</b> seconds
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-indigo-600 font-medium hover:underline disabled:opacity-50"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
