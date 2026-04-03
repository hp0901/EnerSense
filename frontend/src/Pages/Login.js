import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimage from "../assets/loginpage.png";
import logo from "../assets/EnerSence_logo.png";
import { login as loginApi } from "../services/operations/authapi";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContex";
import { useUser } from "../context/UserContext";
import { useRef } from "react";
import { googleLoginApi } from "../services/operations/authapi";

const EnerSenseLogin = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUser } = useUser();

  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [turnstileToken,setTurnstileToken] = useState("");
  const [formData,setFormData] = useState({
    email:"",
    password:""
  });
  

  // 🔥 AUTO LOAD TURNSTILE (NO POPUP)

const turnstileRendered = useRef(false);
const widgetIdRef = useRef(null);

useEffect(() => {
  const interval = setInterval(() => {
    if (window.turnstile) {
      clearInterval(interval);

      if (widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render("#turnstile-container", {
        sitekey: "0x4AAAAAACuBTrjH-DttfUj8",

        callback: (token) => {
          setTurnstileToken(token);
        },

        "expired-callback": () => {
          setTurnstileToken("");
          window.turnstile.reset(widgetIdRef.current);
        },

        "error-callback": (err) => {
          console.error("Turnstile Error:", err);
        },
      });
    }
  }, 500);

  return () => clearInterval(interval);
}, []);

  const handleChange = (e)=>{
    setFormData(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const redirectBasedOnRole = (user)=>{
    if(user.role==="admin" || user.role==="MainAdmin"){
      navigate("/admin",{replace:true});
    }else{
      navigate("/",{replace:true});
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.error("Please fill all fields");
    return;
  }

  if (!turnstileToken) {
    toast.error("Verifying... Please wait");
    return;
  }

  const toastId = toast.loading("Logging in...");

  try {
    setLoading(true);

    const res = await loginApi(
      formData.email,
      formData.password,
      turnstileToken,
      setUser
    );

    console.log("LOGIN RESPONSE:", res);

    // 🔥 FIX: normalize response
    const response = res?.data || res;

    // 🔥 NEW ADMIN → FORCE 2FA SETUP
    if (response.requires2FASetup) {
      localStorage.setItem("admin2FAUserId", response.userId);
      toast.dismiss(toastId);
      navigate("/admin/setup-2fa", { replace: true });
      return;
    }

    // 🔐 EXISTING ADMIN → VERIFY OTP
    if (response.require2FA) {
      localStorage.setItem("admin2FAUserId", response.userId);
      toast.dismiss(toastId);
      navigate("/admin-2fa", { replace: true });
      return;
    }

    // ✅ NORMAL LOGIN
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setUser(response.user);
    login();

    toast.success(
      "Welcome, " +
        response.user.firstName +
        " " +
        response.user.lastName +
        " 👋",
      { id: toastId }
    );

    redirectBasedOnRole(response.user);

  } catch (error) {
    setTurnstileToken("");

    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }

    toast.error("Invalid credentials", { id: toastId });

  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = async (credentialResponse) => {
  const toastId = toast.loading("Logging in...");

  try {
    setLoading(true);

    const res = await googleLoginApi(credentialResponse.credential);

    console.log("GOOGLE LOGIN RESPONSE:", res);

    const response = res?.data || res;

    // 🔥 NEW ADMIN → FORCE 2FA SETUP
    if (response.requires2FASetup) {
      localStorage.setItem("admin2FAUserId", response.userId);
      toast.dismiss(toastId);
      navigate("/admin/setup-2fa");
      return;
    }

    // 🔐 EXISTING ADMIN → VERIFY OTP
    if (response.require2FA) {
      localStorage.setItem("admin2FAUserId", response.userId);
      toast.dismiss(toastId);
      navigate("/admin-2fa");
      return;
    }

    // ✅ NORMAL LOGIN
    if (response.token) {
      localStorage.setItem("token", response.token);
    }

    setUser(response.user);
    login();

    toast.success(
      "Welcome, " +
        response.user.firstName +
        " " +
        response.user.lastName +
        " 👋",
      { id: toastId }
    );

    redirectBasedOnRole(response.user);

  } catch (error) {
    console.error("Google Login Error:", error);
    toast.error(error || "Google login failed");
  } finally {
    setLoading(false);
  }
};

  return( 

<div className="min-h-screen flex items-center justify-center bg-[#2E436E] px-4">

<div className="flex w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-[#3F5680]">

{/* LEFT SIDE */}
<div className="w-full md:w-1/2 p-10 text-[#F1F5F9]">

<div className="flex items-center gap-3 mb-10">
<img src={logo} className="w-10"/>
<h1 className="text-xl font-bold text-green-400">EnerSense</h1>
</div>

<h2 className="text-3xl font-bold text-green-400 mb-2">
Welcome Back
</h2>

<p className="text-[#CBD5E1] mb-8">
Login to continue monitoring your energy.
</p>

<form onSubmit={handleSubmit} className="space-y-5">

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
className="w-full p-4 rounded-xl bg-[#6F89A8] text-white"
/>

<div className="relative w-full group">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    // pr-12 ensures text doesn't hide under the icon
    // focus:ring-1 adds a subtle border when typing
    className="w-full p-4 pr-12 rounded-xl bg-[#6F89A8] text-white placeholder-white/50 outline-none focus:ring-1 focus:ring-green-400 transition-all"
  />

  <button
    type="button" // Prevents form submission when clicking the eye
    onClick={() => setShowPassword(!showPassword)}
    // inset-y-0 + flex items-center keeps it perfectly centered regardless of height
    className="absolute inset-y-0 right-4 flex items-center text-white/70 hover:text-green-400 transition-colors z-10"
  >
    {showPassword ? <FiEyeOff className="text-slate-700" size={20} /> : <FiEye className="text-slate-700" size={20} />}
  </button>
</div>

{/* 🔥 TURNSTILE CONTAINER */}
<div id="turnstile-container" className="flex justify-center"></div>


<div className="text-right">
<Link to="/forget-password" className="text-sm text-[#CBD5E1]">
Forgot Password?
</Link>
</div>
<button
type="submit"
disabled={loading || !turnstileToken}
className="w-full bg-green-500 text-white py-3 rounded-xl font-bold"
>
{loading ? "Logging in..." : "Login"}
</button>

<div className="flex items-center gap-2 my-4">
<hr className="flex-1 border-white/20"/>
<span className="text-sm text-[#CBD5E1]">OR</span>
<hr className="flex-1 border-white/20"/>
</div>

<div className="flex flex-col items-center gap-4 mt-6">
<GoogleLogin
  onSuccess={handleGoogleLogin}
  onError={() => toast.error("Google Login Failed ❌")}
/>  <Link to="/signup" className="text-sm text-[#CBD5E1] mt-2">
    Don't have an account? <span className="text-green-400 font-bold">Sign Up</span>
  </Link>
</div>

</form>
</div>

{/* RIGHT IMAGE */}
<div className="hidden md:block md:w-1/2 relative">
<img src={loginimage} className="absolute inset-0 w-full h-full object-cover"/>
</div>

</div>

</div>
  )
}

export default EnerSenseLogin;