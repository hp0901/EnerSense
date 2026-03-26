import React from "react";
import { useNavigate } from "react-router-dom";
import errorBg from "../assets/EnerSence_logo.png"; // update path if needed

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={errorBg}
        alt="EnerSense Error"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="text-center px-6 max-w-xl">
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
           404 - Energy Route Not Found ⚡
          </h1>

          <p className="text-gray-300 mb-6">
            We can't seem to find the page you're looking for! 🕵️‍♀️ It might have moved, or the link might have a typo. 🔗 Let's get you back on the right path! 🌟
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
