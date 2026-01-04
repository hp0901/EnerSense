import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiCpu,
  FiCloud,
  FiBarChart2,
  FiShield,
  FiZap,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Footer from "./Footer";



const Feature = ({ icon, title }) => (
  <div className="p-6 bg-[#0f172a] rounded-xl hover:scale-105 transition">
    <div className="text-green-400 text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-slate-400">
      Efficient, secure and scalable monitoring.
    </p>
  </div>
);

const Step = ({ number, text }) => (
  <div className="p-6 bg-[#0f172a] rounded-xl">
    <div className="text-2xl font-bold text-green-400">{number}</div>
    <p className="mt-2 text-slate-300">{text}</p>
  </div>
);

const SecurityCard = ({ title }) => (
  <div className="p-6 bg-[#0f172a] rounded-xl text-center">
    <h3 className="text-lg font-semibold text-green-400">{title}</h3>
    <p className="mt-2 text-sm text-slate-400">
      Enterprise-grade protection.
    </p>
  </div>
);

const FutureItem = ({ text }) => (
  <div className="p-4 bg-[#0f172a] rounded-xl text-center text-slate-300">
    {text}
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f172a] text-white w-full h-full  overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="py-24 text-center border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400">
            EnerSense
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300">
            Smart Energy Monitoring System for Modern Homes & Industries
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold"
            >
              <FiLogIn /> Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-6 py-3 border border-green-400 rounded-xl hover:bg-green-400/10"
            >
              <FiUserPlus /> Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-[#0b1220]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-green-400">
            Key Features
          </h2>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Feature icon={<FiActivity />} title="Real-time Monitoring" />
            <Feature icon={<FiBarChart2 />} title="Energy Analytics" />
            <Feature icon={<FiZap />} title="Power Usage Alerts" />
            <Feature icon={<FiCloud />} title="Cloud Integration" />
            <Feature icon={<FiShield />} title="Secure Data" />
            <Feature icon={<FiCpu />} title="IoT Based System" />
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-green-400">
            Why EnerSense?
          </h2>
          <p className="mt-6 text-slate-300">
            Traditional energy systems lack real-time visibility, leading to
            power wastage and high bills. EnerSense enables intelligent,
            data-driven decisions with live monitoring and analytics.
          </p>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-[#0b1220]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-green-400">
            How EnerSense Works
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <Step number="1" text="Sensors collect energy data" />
            <Step number="2" text="ESP32 processes readings" />
            <Step number="3" text="Data sent securely to cloud" />
            <Step number="4" text="User views insights on dashboard" />
          </div>
        </div>
      </section>

      {/* ================= SECURITY ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-green-400">
            Security & Privacy
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <SecurityCard title="Encrypted Data" />
            <SecurityCard title="Secure Authentication" />
            <SecurityCard title="Role-Based Access Control" />
          </div>
        </div>
      </section>

      {/* ================= FUTURE ================= */}
      <section className="py-20 bg-[#0b1220]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-green-400">
            Future Scope
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FutureItem text="AI-based energy prediction" />
            <FutureItem text="Mobile app integration" />
            <FutureItem text="Smart billing automation" />
            <FutureItem text="Solar & renewable tracking" />
            <FutureItem text="Carbon footprint analysis" />
            <FutureItem text="Smart grid compatibility" />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
    <footer className="py-10 bg-[#020617] text-slate-300 text-sm">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
  </div>
  </footer>
    <Footer />
    </div>
  );
};


export default HomePage;
