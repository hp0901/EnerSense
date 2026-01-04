import React from "react";
import loginimage from "../assets/loginpage.png";
import logo from "../assets/EnerSence_logo.png";

const EnerSenseLogin = () => {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center">
      {/* Main Card */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-[2rem] overflow-hidden">

        {/* Left Side */}
        <div className="w-full md:w-5/12 p-8 md:p-12 flex flex-col justify-between bg-[#0f172a]">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <img src={logo} alt="EnerSense Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-white">EnerSense</h1>
              <p className="text-[10px] text-white/70 uppercase">
                Smart Energy Monitoring System
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold text-green-600 mb-8">
              Welcome Back!
            </h2>

            <form className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl focus:outline-none"
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl focus:outline-none"
                required
              />

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="/otp"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition">
                Login
              </button>
            </form>
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-500 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Side: Image as Background */}
        <div className="hidden md:block w-7/12 relative">
          <img
            src={loginimage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0b111e]/80 to-black/40" />
        </div>

      </div>
    </div>
  );
};

export default EnerSenseLogin;
