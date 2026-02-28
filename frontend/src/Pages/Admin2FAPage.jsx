import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login2FAApi } from "../services/operations/twofa"; // Adjust the path as necessary
import toast from "react-hot-toast";

const Admin2FAPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("admin2FAUserId");

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      const toastId = toast.loading("Verifying OTP...");

      const res = await login2FAApi(userId, otp);

      localStorage.setItem("token", res.token);
      localStorage.removeItem("admin2FAUserId");

      toast.success("2FA Verified Successfully", { id: toastId });

      navigate("/admin");

    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Admin 2FA Verification</h2>

        <input
          type="text"
          maxLength="6"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />

        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Admin2FAPage;