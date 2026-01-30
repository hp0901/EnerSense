import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { resetPassword } from "../services/operations/authapi";

/* ===============================
   PASSWORD STRENGTH HELPERS
================================ */
const getPasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "moderate";
  return "strong";
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds


  const strength = getPasswordStrength(password);

  const passwordRules = (password) => ({
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  });

  const rules = passwordRules(password);

  /* ===============================
     SAFETY GUARD
  ================================ */
  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  /* ===============================
     AUTO REDIRECT AFTER 3 MIN
  ================================ */
  useEffect(() => {
  if (timeLeft <= 0) {
    toast("⏳ Session expired. Redirecting to login...", { icon: "⚠️" });
    navigate("/login");
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft, navigate]);

  /* ===============================
     SUBMIT HANDLER
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (strength === "weak") {
      toast.error(
        "❌ Weak password. Please meet the password requirements."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      if (strength === "moderate") {
        toast(
          "⚠️ Password is moderate. Strong password is recommended.",
          { icon: "⚠️" }
        );
      }

      await resetPassword({ email, password });

      toast.success("✅ Password reset successfully!");

      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "❌ Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Set New Password
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Create a new password for <b>{email}</b>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NEW PASSWORD */}
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              New Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 cursor-pointer text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>

            {/* PASSWORD STRENGTH BAR */}
            {password && (
              <div className="mt-2">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      strength === "weak"
                        ? "w-1/3 bg-red-500"
                        : strength === "moderate"
                        ? "w-2/3 bg-yellow-400"
                        : "w-full bg-green-500"
                    }`}
                  />
                </div>

                <p
                  className={`mt-1 text-sm font-semibold ${
                    strength === "weak"
                      ? "text-red-500"
                      : strength === "moderate"
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  {strength === "weak" && "Weak password"}
                  {strength === "moderate" && "Moderate password"}
                  {strength === "strong" && "Strong password"}
                </p>
              </div>
            )}

            {/* CONFIRM PASSWORD */}
            <div className="relative mt-2">
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                Confirm Password
              </label>

              <input
                type={showPassword2 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                required
              />

              <span
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-4 top-10 cursor-pointer text-slate-400 hover:text-slate-600"
              >
                {showPassword2 ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* PASSWORD REQUIREMENTS LABEL */}
            <ul className="mt-3 text-xs space-y-1">
              <li
                className={`flex items-center gap-2 ${
                  rules.uppercase ? "text-green-600" : "text-slate-400"
                }`}
              >
                {rules.uppercase ? "✔" : "✖"} One uppercase letter (A–Z)
              </li>

              <li
                className={`flex items-center gap-2 ${
                  rules.lowercase ? "text-green-600" : "text-slate-400"
                }`}
              >
                {rules.lowercase ? "✔" : "✖"} One lowercase letter (a–z)
              </li>

              <li
                className={`flex items-center gap-2 ${
                  rules.number ? "text-green-600" : "text-slate-400"
                }`}
              >
                {rules.number ? "✔" : "✖"} One number (0–9)
              </li>

              <li
                className={`flex items-center gap-2 ${
                  rules.special ? "text-green-600" : "text-slate-400"
                }`}
              >
                {rules.special ? "✔" : "✖"} One special character (!@#$%^&*)
              </li>
            </ul>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading || strength === "weak"}
            className={`w-full font-semibold py-3 rounded-xl transition ${
              strength === "weak"
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          {/* SESSION TIMER */}
          <p className="text-center text-xs text-slate-500 mt-4">
            ⏳ Redirecting to login in{" "}
            <span className="font-semibold text-slate-700">
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
