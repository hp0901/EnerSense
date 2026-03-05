import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useAuth } from "../context/AuthContex";
import Footer from "../Footer/Footer";
import Logo from "../assets/EnerSence_logo.png";

/* ================= FEATURE CARD ================= */

const Feature = ({ icon, title }) => (
  <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/10 transition duration-300">
    <div className="text-green-400 text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-slate-400">
      Efficient, secure and scalable monitoring.
    </p>
  </div>
);

/* ================= STEP ================= */

const Step = ({ number, text }) => (
  <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl">
    <div className="text-2xl font-bold text-green-400">{number}</div>
    <p className="mt-2 text-slate-300">{text}</p>
  </div>
);

/* ================= SECURITY CARD ================= */

const SecurityCard = ({ title }) => (
  <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl text-center">
    <h3 className="text-lg font-semibold text-green-400">{title}</h3>
    <p className="mt-2 text-sm text-slate-400">
      Enterprise-grade protection.
    </p>
  </div>
);

/* ================= FUTURE ITEM ================= */

const FutureItem = ({ text }) => (
  <div className="p-4 bg-[#0f172a] border border-white/10 rounded-xl text-center text-slate-300">
    {text}
  </div>
);

/* ================= MAIN PAGE ================= */

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  return (
    <div className="bg-[#020617] text-white w-full min-h-screen overflow-x-hidden">

      {/* ================= HERO ================= */}

      <section className="py-24 border-b border-white/10 bg-gradient-to-b from-[#020617] via-[#0b1220] to-[#020617]">
        <h1 className="mb-4 text-center font-semibold text-blue-400">
          <b className="text-4xl block">WELCOME TO ENERSENSE</b>
        </h1>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-green-400">
              ⚡ EnerSense
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300">
              Smart Energy Monitoring System for Modern Homes & Industries
            </p>

            <p className="mt-4 text-slate-400">
              Monitor electricity usage in real-time, analyze power consumption,
              reduce energy costs, and build a smarter sustainable future 🌍
            </p>

            {/* Quick Features */}

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
              <div>⚡ Real-time Monitoring</div>
              <div>📊 Smart Analytics</div>
              <div>🔔 Energy Alerts</div>
              <div>☁️ Cloud Connected</div>
            </div>

            {/* Buttons */}

            <div className="mt-10 flex gap-4 flex-wrap">
              {!isAuth ? (
                <>
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
                </>
              ) : (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold"
                >
                  🚀 Go to Dashboard
                </button>
              )}
            </div>

            {/* Stats */}

            <div className="mt-10 flex gap-10 text-sm text-slate-400">
              <div>
                <div className="text-green-400 text-xl font-bold">⚡ 24/7</div>
                Monitoring
              </div>

              <div>
                <div className="text-green-400 text-xl font-bold">📊 Live</div>
                Analytics
              </div>

              <div>
                <div className="text-green-400 text-xl font-bold">🌱 Smart</div>
                Energy
              </div>
            </div>
          </div>

          {/* Logo */}

          <div className="flex justify-center">
            <img
              src={Logo}
              alt="EnerSense"
              className="rounded-xl shadow-xl border border-white/10"
            />
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

      <section className="py-20 bg-[#020617]">
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

      <section className="py-20 bg-[#020617]">
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

          <Link to="/faqs">
            <div className="mt-10 text-center">
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold">
                View FAQs
              </button>
            </div>
          </Link>

        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="py-10 bg-[#020617] border-t border-white/10 text-slate-300 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        </div>
      </footer>

      <Footer />

    </div>
  );
};

export default HomePage;