import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
// import { resetPassword } from "../services/operations/authapi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ email must come from OTP page
  const { email } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2,setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  // ===============================
  // 🚨 SAFETY GUARD
  // ===============================
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 🔐 BACKEND CALL (later)
      // await resetPassword({ email, password });

      toast.success("✅ Password reset successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      toast.error("❌ Failed to reset password");
      console.error(error);
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
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Confirm Password
            </label>
            <input
              type={showPassword2 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
             <span
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-4 top-10 cursor-pointer text-slate-400 hover:text-slate-600"
            >
              {showPassword2 ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600
            text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
