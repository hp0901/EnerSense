import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import loginimage from "../assets/loginpage.png";
import logo from "../assets/EnerSence_logo.png";
import { login } from "../services/operations/authapi";
import toast from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // Optional: npm install jwt-decode to read user info
import { FiEye, FiEyeOff } from "react-icons/fi";



const EnerSenseLogin = () => {

  const [showPassword, setShowPassword] = useState(false);


  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Info:", decoded);
    
    toast.success(`Welcome ${decoded.name}!`);
    localStorage.setItem("token", credentialResponse.credential);
    navigate("/dashboard");
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In Failed");
  };


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ===============================
  // HANDLE NORMAL LOGIN
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("❌ Please fill all fields");
      return;
    }

    const toastId = toast.loading("🔐 Logging you in...");

    try {
      setLoading(true);

      await login(formData.email, formData.password, navigate);

      toast.success("✅ Login successful! Welcome back 🚀", {
        id: toastId,
      });

      navigate("/dashboard");

    } catch (error) {
      toast.error("❌ Invalid email or password", {
        id: toastId,
      });
      console.error("LOGIN ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // HANDLE GOOGLE LOGIN (FRONTEND MOCK)
  // ===============================
  const handleGoogleLogin = () => {
    toast.success("🔐 Signed in with Google successfully!", {
      icon: "🌐",
    });

    localStorage.setItem("authType", "google");
    navigate("/dashboard");
  };

  return (
    <div className="relative h-dvh w-full flex items-center justify-center bg-[#0f172a] overflow-hidden">

      {/* MOBILE BACKGROUND */}
      <img
        src={loginimage}
        alt="EnerSense Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 md:hidden"
      />
      <div className="absolute inset-0 bg-black/50 md:hidden" />

      {/* MAIN CARD */}
      <div className="relative z-10 flex w-full max-w-6xl bg-[#0f172a]/90 md:bg-[#0f172a]
        backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 mx-3 sm:mx-6">

        {/* LEFT: FORM */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-16">

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="EnerSense Logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">EnerSense</h1>
              <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">
                Smart Energy Monitoring
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="w-full max-w-sm">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-500 mb-2">
              Welcome Back!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              Please enter your details.
            </p>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-800/70
                border border-slate-700 text-white placeholder:text-slate-400
                focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-800/70
                  border border-slate-700 text-white placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-green-500/50 pr-12"
                  required
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                  cursor-pointer text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>


              <div className="flex justify-end">
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white
                py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg
                shadow-lg shadow-green-500/20 transition active:scale-[0.98]"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              {/* GOOGLE LOGIN */}
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                />


            </form>

            <p className="mt-6 text-sm text-slate-300">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-green-500 font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:block md:w-1/2 lg:w-7/12 relative">
          <img
            src={loginimage}
            alt="EnerSense Dashboard"
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]
            via-[#0f172a]/30 to-transparent" />

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <p className="text-xl lg:text-2xl font-medium italic opacity-90">
              “Powering the future with precision.”
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnerSenseLogin;
