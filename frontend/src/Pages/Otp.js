import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { verifyForgotPasswordOtp } from "../services/operations/authapi";
import { useNavigate, useLocation } from "react-router-dom";
import "../index.css";

// 🔐 backend signup API (real OTP check)
import { signup } from "../services/operations/authapi";

// 🧪 hardcoded OTP for forgot-password testing

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get flow info from router
  const { flow, email } = location.state || {};
  console.log("FLOW:", flow, "EMAIL:", email);

  const signupData = JSON.parse(localStorage.getItem("signupData"));

  // ===============================
  // 🚨 SAFETY GUARD
  // ===============================
  useEffect(() => {
    if (!flow) {
      navigate("/login");
    }
  }, [flow, navigate]);

  // ===============================
  // ⏱️ TIMER
  // ===============================
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ===============================
  // VERIFY OTP (MIXED MODE)
  // ===============================
  const handleVerify = async () => {
    const enteredOtp = String(otp).trim();
    console.log("ENTERED OTP:", enteredOtp);

    try {
      // ===============================
      // 🔐 SIGNUP → REAL BACKEND OTP
      // ===============================
      if (flow === "signup") {
        if (!signupData) {
          navigate("/signup");
          return;
        }

        // backend verifies OTP sent via email
        await signup({
          ...signupData,
          otp: enteredOtp,
        });

        localStorage.removeItem("signupData");

        setError(false);
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }

      
        // 🔐 FORGOT → BACKEND OTP VERIFY
        // ===============================
        else if (flow === "forgot") {
          await verifyForgotPasswordOtp(email, enteredOtp);

          setError(false);
          setSuccess(true);

          setTimeout(() => {
            navigate("/reset-password", { state: { email } });
          }, 1200);
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

  // ===============================
  // RESEND OTP
  // ===============================
  const handleResend = () => {
    setOtp("");
    setError(false);
    setSuccess(false);
    setTimeLeft(30);
    // later: call resend OTP API
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-3 sm:px-4">
      <div
        className={`w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-xl 
        p-5 sm:p-6 md:p-8 transition-all ${error ? "animate-shake" : ""}`}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-slate-800">
          Verify OTP
        </h2>

        <p className="text-xs sm:text-sm text-center text-slate-500 mt-2">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP INPUT */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            containerStyle={{ display: "flex", gap: "8px" }}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  width: "clamp(36px, 9vw, 48px)",
                  height: "clamp(36px, 9vw, 48px)",
                  borderRadius: "9999px",
                  backgroundColor: "#676c76ff",
                  color: "#ffffff",
                  fontSize: "clamp(16px, 4vw, 22px)",
                  textAlign: "center",
                  border: error
                    ? "2px solid #ef4444"
                    : "2px solid #366fbeff",
                  outline: "none",
                }}
                className="focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            )}
          />
        </div>

        {error && (
          <p className="text-xs sm:text-sm text-red-600 text-center mt-4">
            ❌ Invalid OTP. Please try again.
          </p>
        )}

        {success && (
          <p className="text-xs sm:text-sm text-green-600 text-center mt-4">
            ✅ Verification Successful! 🎉
          </p>
        )}

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={otp.length !== 6}
          className={`mt-6 sm:mt-8 w-full py-2.5 sm:py-3 rounded-xl 
          text-sm sm:text-base text-white font-medium transition-all
          ${
            otp.length === 6
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-300 cursor-not-allowed"
          }`}
        >
          Verify OTP
        </button>

        {/* RESEND */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-slate-500">
          {timeLeft > 0 ? (
            <span>
              Resend OTP in <b>{timeLeft} Second</b>
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
