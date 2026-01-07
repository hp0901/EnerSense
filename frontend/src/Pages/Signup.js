import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import signupBg from "../assets/EnerSence_Signup.png";
import { sendOtp } from "../services/operations/authapi";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

const electricityBoards = {
  Andhra_Pradesh: ["APSPDCL", "APEPDCL"],
  Arunachal_Pradesh: ["Department of Power, Arunachal Pradesh"],
  Assam: ["APDCL"],
  Bihar: ["NBPDCL", "SBPDCL"],
  Chhattisgarh: ["CSPDCL"],
  Goa: ["Goa Electricity Department"],
  Gujarat: ["PGVCL", "DGVCL", "UGVCL", "MGVCL"],
  Haryana: ["DHBVN", "UHBVN"],
  Himachal_Pradesh: ["HPSEBL"],
  Jharkhand: ["JBVNL"],
  Karnataka: ["BESCOM", "MESCOM", "HESCOM", "GESCOM", "CESCOM"],
  Kerala: ["KSEB"],
  Madhya_Pradesh: ["MPPKVVCL", "MPMKVVCL", "MPWZ"],
  Maharashtra: ["MSEDCL"],
  Manipur: ["Department of Power, Manipur"],
  Meghalaya: ["MePDCL"],
  Mizoram: ["Power & Electricity Department, Mizoram"],
  Nagaland: ["Department of Power, Nagaland"],
  Odisha: ["TPCODL", "TPWODL", "TPSODL", "TPNODL"],
  Punjab: ["PSPCL"],
  Rajasthan: ["JVVNL", "AVVNL", "JDVVNL"],
  Sikkim: ["Sikkim Power Development Corporation"],
  Tamil_Nadu: ["TANGEDCO"],
  Telangana: ["TSSPDCL", "TSNPDCL"],
  Tripura: ["TSECL"],
  Uttar_Pradesh: ["PVVNL", "MVVNL", "DVVNL", "PUVVNL", "KESCO"],
  Uttarakhand: ["UPCL"],
  West_Bengal: ["WBSEDCL", "CESC"],

  // Union Territories
  Delhi: ["BSES Rajdhani", "BSES Yamuna", "Tata Power Delhi"],
  Jammu_and_Kashmir: ["JKPDD"],
  Ladakh: ["Power Development Department, Ladakh"],
  Chandigarh: ["Electricity Wing, Chandigarh"],
  Dadra_and_Nagar_Haveli_and_Daman_and_Diu: ["DNH Power Distribution"],
  Lakshadweep: ["Electricity Department, Lakshadweep"],
  Puducherry: ["Electricity Department, Puducherry"],
  Andaman_and_Nicobar_Islands: ["Electricity Department, A&N Islands"]
};


// ===============================
// SIGNUP COMPONENT
// ===============================

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    board: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { board: "" } : {}),
    }));
  };

  // ===============================
  // HANDLE SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => v === "")) {
      toast.error("❌ Please fill all fields");
      return;
    }

    const toastId = toast.loading("📩 Sending OTP...");

    try {
      setLoading(true);

      // 🔹 SEND OTP
      console.log("Comes here at signup form")
      await sendOtp(formData.email, navigate, dispatch);

      // 🔹 STORE DATA TEMPORARILY
      localStorage.setItem("signupData", JSON.stringify(formData));
      toast.success("✅ OTP sent to your email!", {
        id: toastId,
      });
      setSuccess(true);

      // 🔹 REDIRECT TO OTP PAGE
      setTimeout(() => {
        navigate("/otp");
      }, 1500);

    } catch (error) {
      toast.error("❌ Failed to send OTP. Try again.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="relative min-h-dvh w-full flex items-center justify-center px-4">
      
      {/* BACKGROUND */}
      <img
        src={signupBg}
        alt="Signup Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-lg bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-white">
        
        <h2 className="text-2xl font-semibold text-center text-green-400">
          Create Account
        </h2>
        <p className="text-sm text-center text-slate-300 mt-1">
          Sign up to continue to EnerSense
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input type="text" name="firstName" placeholder="First Name"
            className="w-full p-2 rounded-lg text-black"
            onChange={handleChange} required />

          <input type="text" name="lastName" placeholder="Last Name"
            className="w-full p-2 rounded-lg text-black"
            onChange={handleChange} required />

          <input type="email" name="email" placeholder="Email"
            className="w-full p-2 rounded-lg text-black"
            onChange={handleChange} required />

          <input type="password" name="password" placeholder="Password"
            className="w-full p-2 rounded-lg text-black"
            onChange={handleChange} required />

          <input type="tel" name="phone" placeholder="Phone Number"
            className="w-full p-2 rounded-lg text-black"
            onChange={handleChange} required />

          <select name="state"
            className="w-full p-2 rounded-lg text-black"
            onChange={handleChange} required>
            <option value="">Select State</option>
            {statesOfIndia.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select name="board"
            className="w-full p-2 rounded-lg text-black"
            onChange={handleChange}
            disabled={!formData.state}
            required>
            <option value="">Select Electricity Board</option>
            {(electricityBoards[formData.state] || []).map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <div className="flex gap-4 text-sm">
            Gender:
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input type="radio" name="gender" value={g}
                  onChange={handleChange} required />
                {g}
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition">
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>

        {success && (
          <p className="text-green-400 text-center mt-4">
            ✅ OTP sent! Redirecting…
          </p>
        )}

        <p className="text-sm text-center mt-4 flex justify-center gap-2">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 cursor-pointer flex items-center gap-1">
            <FiLogIn /> Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;