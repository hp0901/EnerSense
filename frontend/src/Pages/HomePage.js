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
import "../css/HomePage.css";
import { TypeAnimation } from "react-type-animation";

/* FEATURE CARD */

const Feature = ({ icon, title }) => (
  <div className="p-6 bg-[#3F5680] border border-white/10 rounded-xl hover:border-[#96C37C] transition duration-300">
    <div className="text-[#96C37C] text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-[#F1F5F9]">{title}</h3>
    <p className="mt-2 text-sm text-[#CBD5E1]">
      Efficient, secure and scalable monitoring.
    </p>
  </div>
);

/* STEP */

const Step = ({ number, text }) => (
  <div className="p-6 bg-[#3F5680] border border-white/10 rounded-xl">
    <div className="text-2xl font-bold text-[#96C37C]">{number}</div>
    <p className="mt-2 text-[#F1F5F9]">{text}</p>
  </div>
);

/* SECURITY */

const SecurityCard = ({ title }) => (
  <div className="p-6 bg-[#3F5680] border border-white/10 rounded-xl text-center">
    <h3 className="text-lg font-semibold text-[#96C37C]">{title}</h3>
    <p className="mt-2 text-sm text-[#CBD5E1]">
      Enterprise-grade protection.
    </p>
  </div>
);

/* FUTURE ITEM */

const FutureItem = ({ text }) => (
  <div className="p-4 bg-[#3F5680] border border-white/10 rounded-xl text-center text-[#F1F5F9]">
    {text}
  </div>
);

/* HERO CARD */

const EnergyPreview = () => {
  return (
    <div className="bg-[#3F5680] border border-white/10 rounded-2xl p-10 shadow-xl w-full max-w-md flex items-center justify-center text-center">

      <div className="space-y-6">

        <div className="text-5xl">⚡</div>

        <h2 className="text-3xl font-bold text-[#96C37C]">
          EnerSense
        </h2>

        <p className="text-[#CBD5E1]">
          Intelligent Energy Monitoring Platform
        </p>

        <p className="text-lg text-[#F1F5F9] leading-relaxed">

          Transform the way you interact with
          <span className="text-[#96C37C] font-semibold"> electricity</span>.
          Gain complete
          <span className="text-[#CEDBA6] font-semibold"> visibility</span> into your
          <span className="text-[#96C37C] font-semibold"> energy ecosystem </span>
          and move toward a smarter, cleaner future.

        </p>

        <p className="text-sm text-[#CBD5E1]">
          🌱 Powering the next generation of intelligent energy systems
        </p>

      </div>

    </div>
  );
};

/* MAIN PAGE */

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  return (
    <div className="bg-[#2E436E] text-[#F1F5F9] w-full min-h-screen overflow-x-hidden">

      {/* HERO */}

      <section className="py-24 border-b border-white/10 bg-[#2E436E]">

        <h1 className="mb-4 text-center font-semibold text-[#CEDBA6]">
          <b className="text-4xl block">WELCOME TO ENERSENSE</b>
        </h1>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <h1 className="text-4xl md:text-6xl font-bold text-[#96C37C]">
              ⚡ EnerSense
            </h1>

            <div className="mt-6 text-lg md:text-xl text-[#F1F5F9] h-[40px]">

              <TypeAnimation
                sequence={[
                  "Smart Energy Monitoring for Homes",
                  2000,
                  "Real-Time Power Analytics",
                  2000,
                  "AI Powered Energy Insights",
                  2000,
                  "Reduce Electricity Costs Smartly",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />

            </div>

            <p className="mt-4 text-[#CBD5E1]">
              Monitor electricity usage in real-time, analyze power consumption,
              reduce energy costs, and build a smarter sustainable future 🌍
            </p>

            {/* QUICK FEATURES */}

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-[#F1F5F9]">
              <div>⚡ Real-time Monitoring</div>
              <div>📊 Smart Analytics</div>
              <div>🔔 Energy Alerts</div>
              <div>☁️ Cloud Connected</div>
            </div>

            {/* BUTTONS */}

            <div className="mt-10 flex gap-4 flex-wrap">

              {!isAuth ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 px-6 py-3 bg-[#96C37C] text-[#1F2937] hover:bg-[#84b468] rounded-xl font-semibold"
                  >
                    <FiLogIn /> Login
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className="flex items-center gap-2 px-6 py-3 border border-[#96C37C] rounded-xl hover:bg-[#96C37C]/10"
                  >
                    <FiUserPlus /> Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 px-6 py-3 bg-[#96C37C] text-[#1F2937] rounded-xl font-semibold"
                >
                  🚀 Go to Dashboard
                </button>
              )}

            </div>

            {/* STATS */}

            <div className="mt-10 flex gap-10 text-sm text-[#CBD5E1]">

              <div>
                <div className="text-[#96C37C] text-xl font-bold">⚡ 24/7</div>
                Monitoring
              </div>

              <div>
                <div className="text-[#96C37C] text-xl font-bold">📊 Live</div>
                Analytics
              </div>

              <div>
                <div className="text-[#96C37C] text-xl font-bold">🌱 Smart</div>
                Energy
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">
            <EnergyPreview />
          </div>

        </div>
      </section>

      {/* FEATURES */}

      <section className="py-20 bg-[#6F89A8]">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center text-[#CEDBA6]">
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

      {/* WHY */}

      <section className="py-20 bg-[#2E436E]">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-semibold text-[#96C37C]">
            Why EnerSense?
          </h2>

          <p className="mt-6 text-[#CBD5E1]">
            Traditional energy systems lack real-time visibility, leading to
            power wastage and high bills. EnerSense enables intelligent,
            data-driven decisions with live monitoring and analytics.
          </p>

        </div>
      </section>

      {/* HOW */}

      <section className="py-20 bg-[#6F89A8]">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center text-[#CEDBA6]">
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

      {/* SECURITY */}

      <section className="py-20 bg-[#2E436E]">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center text-[#96C37C]">
            Security & Privacy
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

            <SecurityCard title="Encrypted Data" />
            <SecurityCard title="Secure Authentication" />
            <SecurityCard title="Role-Based Access Control" />

          </div>
        </div>
      </section>

      {/* FUTURE */}

      <section className="py-20 bg-[#6F89A8]">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-center text-[#CEDBA6]">
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
              <button className="px-6 py-3 bg-[#96C37C] text-[#1F2937] hover:bg-[#84b468] rounded-xl font-semibold">
                View FAQs
              </button>
            </div>
          </Link>

        </div>
      </section>

      <Footer />

    </div>
  );
};

export default HomePage;