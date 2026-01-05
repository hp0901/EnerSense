import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import signupBg from "../assets/EnerSence_Signup.png";

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


const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    state: "",
    board: "",
    gender: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { board: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // All fields required
    if (Object.values(formData).some((v) => v === "")) {
      alert("Please fill all fields");
      return;
    }

    setSuccess(true);

    // Navigate to OTP page after success
    setTimeout(() => {
      navigate("/otp");
    }, 1500);
  };

  return (
  <div className="relative min-h-dvh w-full overflow-hidden flex items-center justify-center px-4">
    
    {/* BACKGROUND IMAGE */}
    <img
      src={signupBg}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50" />

    {/* FORM CARD */}
    <div className="relative z-10 w-full max-w-md sm:max-w-lg bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8">
      
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-green-400">
        Create Account
      </h2>

      <p className="text-xs sm:text-sm text-center text-slate-300 mt-1">
        Sign up to continue to EnerSense
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full p-2 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full p-2 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-2 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          required
        />

        <select
          name="state"
          className="w-full p-2 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          {statesOfIndia.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          name="board"
          className="w-full p-2 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
          required
          disabled={!formData.state}
        >
          <option value="">Select Electricity Board</option>
          {(electricityBoards[formData.state] || []).map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>

        {/* GENDER */}
        <div className="flex flex-wrap gap-4 text-white text-sm">
          Gender:
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value={g}
                onChange={handleChange}
                required
              />
              {g}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>

      {success && (
        <p className="text-green-400 text-center mt-4">
          ✅ Signup successful! Redirecting to OTP…
        </p>
      )}

      <p className="text-sm text-center text-slate-200 mt-4 flex items-center justify-center gap-2">
        Already have an account?
        <span
          onClick={() => navigate("/login")}
          className="flex items-center gap-1 text-green-500 font-semibold cursor-pointer hover:underline"
        >
          <FiLogIn className="text-lg" />
          Sign in
        </span>
      </p>

    </div>
  </div>
);

};

export default Signup;
