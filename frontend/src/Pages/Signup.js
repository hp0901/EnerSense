import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import signupBg from "../assets/EnerSence_Signup.png";
import { sendOtp } from "../services/operations/authapi";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

// ===============================
// STATES & BOARDS
// ===============================
const statesOfIndia = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu and Kashmir",
  "Ladakh","Puducherry"
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
    gender: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // ===============================
  // VALIDATION HELPERS
  // ===============================
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[0-9]{10}$/.test(phone);

  const getPasswordStrength = (password) => {
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    if (password.length < 6) return "weak";
    if (hasNumber && hasSpecial && password.length >= 8) return "strong";
    return "medium";
  };

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { board: "" } : {})
    }));

    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email format");
    }

    if (name === "phone") {
      setPhoneError(validatePhone(value) ? "" : "Enter valid 10-digit number");
    }

    if (name === "password") {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  // ===============================
  // FORM VALIDITY
  // ===============================
  const isFormValid =
    Object.values(formData).every((v) => v !== "") &&
    !emailError &&
    !phoneError &&
    passwordStrength !== "weak";

  // ===============================
  // HANDLE SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const toastId = toast.loading("📩 Sending OTP...");
    try {
      setLoading(true);
      await sendOtp(formData.email, navigate, dispatch);
      localStorage.setItem("signupData", JSON.stringify(formData));
      toast.success("✅ OTP sent!", { id: toastId });
      setTimeout(() => navigate("/otp"), 1500);
    } catch {
      toast.error("❌ Failed to send OTP", { id: toastId });
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
      className="absolute inset-0 w-full h-full object-cover"
      alt="Signup background"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />

    {/* CARD */}
    <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 sm:p-8 text-white">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Create Account
      </h2>
      <p className="text-center text-sm text-slate-300 mt-1">
        Sign up to continue to <span className="text-green-400">EnerSense</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">

        {/* NAME */}
        <div>
          <input
            name="firstName"
            placeholder="First Name"
            className="input"
            onChange={handleChange}
          />
          </div>
          <div >
          <input
            name="lastName"
            placeholder="Last Name"
            className="input"
            onChange={handleChange}
          />
        </div>

        {/* EMAIL */}
        <div>
          <input
            name="email"
            placeholder="Email address"
            className="input"
            onChange={handleChange}
          />
          {emailError && (
            <p className="mt-1 text-xs text-red-400">{emailError}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input pr-10"
              onChange={handleChange}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-600 hover:text-black transition"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {formData.password && (
            <p
              className={`mt-1 text-xs font-medium ${
                passwordStrength === "weak"
                  ? "text-red-400"
                  : passwordStrength === "medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {passwordStrength === "weak" && "Weak password (min 6 chars)"}
              {passwordStrength === "medium" &&
                "Medium strength (add number & symbol)"}
              {passwordStrength === "strong" && "Strong password"}
            </p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <input
            name="phone"
            placeholder="Phone number"
            className="input"
            onChange={handleChange}
          />
          {phoneError && (
            <p className="mt-1 text-xs text-red-400">{phoneError}</p>
          )}
        </div>

        {/* STATE */}
        <select
          name="state"
          className="input"
          onChange={handleChange}
        >
          <option value="">Select State</option>
          {statesOfIndia.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* BOARD */}
        <select
          name="board"
          className="input disabled:opacity-50"
          onChange={handleChange}
          disabled={!formData.state}
        >
          <option value="">Select Electricity Board</option>
          {(electricityBoards[formData.state] || []).map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* GENDER */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Gender</span>
          <div className="flex gap-6">
            {["Male", "Female", "Other"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                  className="accent-green-400 scale-110"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={!isFormValid || loading}
          className={`w-full mt-4 py-3 rounded-xl font-semibold tracking-wide transition-all duration-200 ${
            isFormValid
              ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-lg"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Sending OTP..." : "Sign Up"}
        </button>
      </form>

      {/* FOOTER */}
      <p className="text-sm text-center mt-6 text-slate-300">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-green-400 cursor-pointer inline-flex items-center gap-1 hover:underline"
        >
          <FiLogIn /> Sign in
        </span>
      </p>
    </div>

    {/* TAILWIND INPUT UTILITY */}
    <style jsx>{`
      .input {
        width: 100%;
        padding: 0.6rem 0.75rem;
        border-radius: 0.75rem;
        background: rgba(255, 255, 255, 0.9);
        color: black;
        outline: none;
        transition: box-shadow 0.2s ease, border-color 0.2s ease;
      }
      .input:focus {
        box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.6);
      }
    `}</style>
  </div>
);

};

export default Signup;
