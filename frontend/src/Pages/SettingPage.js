import React from "react";
import { FiUser, FiBell, FiCpu, FiShield, FiLogOut } from "react-icons/fi";

const SettingPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] h-full overflow-x-hidden text-white px-6 py-10">

      <h1 className="text-3xl font-bold text-green-400 mb-10">
        Settings
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* ================= PROFILE ================= */}
        <Section icon={<FiUser />} title="Profile Settings">
          <Input label="Full Name" placeholder="EnerSence" />
          <Input label="Email" placeholder="EnerSence@email.com" disabled />
          <Input label="Phone Number" placeholder="+91 XXXXXXXXXX" />
          <button className="btn-primary">Save Profile</button>
        </Section>

        {/* ================= ENERGY ================= */}
        <Section icon={<FiCpu />} title="Energy Preferences">
          <Select
            label="Tariff Type"
            options={["Domestic", "Commercial", "Industrial"]}
          />
          <Toggle label="Peak Hour Alerts" />
        </Section>

        {/* ================= NOTIFICATIONS ================= */}
        <Section icon={<FiBell />} title="Notifications">
          <Toggle label="Email Alerts" />
          <Toggle label="SMS Alerts" />
          <Toggle label="Weekly Energy Reports" />
        </Section>

        {/* ================= SECURITY ================= */}
        <Section icon={<FiShield />} title="Security & Privacy">
          <button className="btn-secondary">Change Password</button>
          <button className="btn-secondary">Enable 2FA</button>
        </Section>

        {/* ================= LOGOUT ================= */}
        <div className="pt-6 border-t border-white/10">
          <button className="flex items-center gap-2 text-red-400 hover:text-red-500">
            <FiLogOut />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

/* ================= REUSABLE ================= */

const Section = ({ icon, title, children }) => (
  <div className="bg-[#020617] p-6 rounded-xl space-y-4">
    <h2 className="flex items-center gap-2 text-xl font-semibold text-green-400">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-slate-400 mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label className="block text-sm text-slate-400 mb-1">{label}</label>
    <select className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/10">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Toggle = ({ label }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <span className="text-slate-300">{label}</span>
    <input type="checkbox" className="accent-green-500 w-5 h-5" />
  </label>
);

export default SettingPage;
