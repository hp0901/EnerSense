import React from "react";
import loginimage from "../assets/loginpage.png";
import logo from "../assets/EnerSence_logo.png";

const EnerSenseLogin = () => {
  return (
    <div className="relative h-dvh w-full flex items-center justify-center bg-[#0f172a] overflow-hidden">
      
      {/* Background Image (VISIBLE ON ALL SCREENS) */}
      <img
        src={loginimage}
        alt="EnerSense Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 md:hidden"
      />
      <div className="absolute inset-0 bg-black/50 md:hidden" />

      {/* Main Card */}
      <div className="relative z-10 flex w-full max-w-6xl bg-[#0f172a]/90 md:bg-[#0f172a] backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 mx-3 sm:mx-6">

        {/* LEFT: FORM */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src={logo}
              alt="EnerSense Logo"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">
                EnerSense
              </h1>
              <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">
                Smart Energy Monitoring
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full max-w-sm">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-500 mb-2">
              Welcome Back!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              Please enter your details.
            </p>

            <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-800/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-slate-800/70 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />

              <div className="flex justify-end">
                <a href="/otp" className="text-xs sm:text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </a>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-green-500/20 transition active:scale-[0.98]">
                Login
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-300">
              Don’t have an account?{" "}
              <a href="/signup" className="text-green-500 font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE (Tablet + Desktop) */}
        <div className=" md:block md:w-1/2 lg:w-7/12 relative">
          <img
            src={loginimage}
            alt="EnerSense Dashboard"
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />

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
