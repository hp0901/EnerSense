import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

const AdminLogin = () => {
  const navigate = useNavigate();
//   const { login } = useAuth();
  const { setUser } = useUser();

  const [step, setStep] = useState("credentials"); 
  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: ""
  });

  const [tempUserId, setTempUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===============================
  // STEP 1 – Verify Email & Password
  // ===============================
  const handleCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/admin/login", {
        email: form.email,
        password: form.password
      });

      if (res.data.require2FA) {
        setTempUserId(res.data.tempUserId);
        setStep("otp");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  // ===============================
  // STEP 2 – Verify TOTP
  // ===============================
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/admin/verify-2fa", {
        token: form.otp,
        userId: tempUserId
      });

    //   login(res.data.token);
      setUser(res.data.user);

      toast.success("Admin login successful");
      navigate("/admin");

    } catch (err) {
      toast.error("Invalid or expired code");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900 text-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-700">

        <h2 className="text-2xl font-bold text-center mb-6 text-red-500">
          Admin Portal
        </h2>

        {step === "credentials" && (
          <form onSubmit={handleCredentials} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition"
            >
              {loading ? "Checking..." : "Continue"}
            </button>

          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">

            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit Authenticator Code"
              required
              maxLength={6}
              value={form.otp}
              onChange={handleChange}
              className="w-full text-center tracking-widest text-lg bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;