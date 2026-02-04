import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import signupBg from "../assets/EnerSence_Signup.png";
import { sendOtp } from "../services/operations/authapi";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";

/* ===============================
   STATES & BOARDS
================================ */
const statesOfIndia = [
  "Andhra_Pradesh",
  "Arunachal_Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal_Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya_Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil_Nadu",
  "Telangana",
  "Tripura",
  "Uttar_Pradesh",
  "Uttarakhand",
  "West_Bengal",
  "Delhi",
  "Jammu_and_Kashmir",
  "Ladakh",
  "Puducherry"
];


const electricityBoards = {
  Andhra_Pradesh: ["APSPDCL", "APEPDCL"],
  Arunachal_Pradesh: ["DOPAP"],
  Assam: ["APDCL"],
  Bihar: ["NBPDCL", "SBPDCL"],
  Chhattisgarh: ["CSPDCL"],
  Goa: ["GED"],
  Gujarat: ["PGVCL", "DGVCL", "UGVCL", "MGVCL"],
  Haryana: ["DHBVN", "UHBVN"],
  Himachal_Pradesh: ["HPSEBL"],
  Jharkhand: ["JBVNL"],
  Karnataka: ["BESCOM", "MESCOM", "HESCOM", "GESCOM", "CESCOM"],
  Kerala: ["KSEB"],
  Madhya_Pradesh: ["MPPKVVCL", "MPMKVVCL", "MPPKVVCL"],
  Maharashtra: ["MSEDCL"],
  Manipur: ["MSPDCL"],
  Meghalaya: ["MePDCL"],
  Mizoram: ["PED_Mizoram"],
  Nagaland: ["DOPN"],
  Odisha: ["TPCODL", "TPNODL", "TPSODL", "TPWODL"],
  Punjab: ["PSPCL"],
  Rajasthan: ["JVVNL", "AVVNL", "JDVVNL"],
  Sikkim: ["Sikkim_Power"],
  Tamil_Nadu: ["TANGEDCO"],
  Telangana: ["TSSPDCL", "TSNPDCL"],
  Tripura: ["TSECL"],
  Uttar_Pradesh: ["PVVNL", "MVVNL", "DVVNL", "PUVVNL", "KESCO"],
  Uttarakhand: ["UPCL"],
  West_Bengal: ["WBSEDCL", "CESC"],
  Delhi: ["BRPL", "BYPL", "TPDDL", "NDMC"],
  Jammu_and_Kashmir: ["JKPDD"],
  Ladakh: ["Ladakh_PDD"],
  Puducherry: ["PED_Puducherry"],
  Andaman_and_Nicobar: ["Electricity_Department_AN"],
  Chandigarh: ["Electricity_Department_Chandigarh"],
  Dadra_and_Nagar_Haveli_and_Daman_and_Diu: ["DNH_Power"],
  Lakshadweep: ["Electricity_Department_Lakshadweep"]
};


/* ===============================
   SIGNUP COMPONENT
================================ */
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
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  /* ===============================
     VALIDATION HELPERS
  ================================ */
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[0-9]{10}$/.test(phone);

  /* ===============================
     HANDLE CHANGE
  ================================ */
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
  };

  /* ===============================
     FORM VALIDITY
     (password strength handled by PasswordInput)
  ================================ */
  const isFormValid =
    Object.values(formData).every((v) => v !== "") &&
    !emailError &&
    !phoneError &&
    formData.password.length >= 8;

  /* ===============================
     HANDLE SUBMIT
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const toastId = toast.loading("📩 Sending OTP...");
    try {
      setLoading(true);
      await sendOtp(formData.email, formData.firstName, navigate, dispatch);
      localStorage.setItem("signupData", JSON.stringify(formData));
      toast.success("✅ OTP sent!", { id: toastId });

      navigate("/otp", {
        state: { flow: "signup", email: formData.email }
      });
    } catch {
      toast.error("❌ Failed to send OTP", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     UI
  ================================ */
  return (
    <div className="relative min-h-dvh w-full flex items-center justify-center px-4">
      {/* BACKGROUND */}
      <img
        src={signupBg}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Signup background"
      />
      <div className="absolute inset-0" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 sm:p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-green-400">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {/* NAME */}
          <input name="firstName" placeholder="First Name" className="input" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" className="input" onChange={handleChange} />

          {/* EMAIL */}
          <input name="email" placeholder="Email" className="input" onChange={handleChange} />
          {emailError && <p className="text-xs text-red-400">{emailError}</p>}

          {/* PASSWORD (REUSABLE COMPONENT) */}
          <PasswordInput
            value={formData.password}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, password: val }))
            }
          />

          {/* PHONE */}
          <input name="phone" placeholder="Phone Number" className="input" onChange={handleChange} />
          {phoneError && <p className="text-xs text-red-400">{phoneError}</p>}

          {/* STATE */}
          <select name="state" className="input" onChange={handleChange}>
            <option value="">Select State</option>
            {statesOfIndia.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* BOARD */}
          <select
            name="board"
            className="input"
            disabled={!formData.state}
            onChange={handleChange}
          >
            <option value="">Select Electricity Board</option>
            {(electricityBoards[formData.state] || []).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>

          {/* GENDER */}
          <div className="flex gap-6 text-sm">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input type="radio" name="gender" value={g} onChange={handleChange} />
                {g}
              </label>
            ))}
          </div>

          {/* BUTTON */}
          <button
            disabled={!isFormValid || loading}
            className={`w-full mt-4 py-3 rounded-xl font-semibold ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 cursor-pointer inline-flex items-center gap-1"
          >
            <FiLogIn /> Sign in
          </span>
        </p>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.7rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.9);
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Signup;
