import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiBell,
  FiCpu,
  FiShield,
  FiLogOut,
} from "react-icons/fi";

import { toast } from "react-hot-toast";
import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../services/operations/notificationAPI";

const SettingPage = () => {
  /* ================= NOTIFICATION STATE ================= */
  const [notifications, setNotifications] = useState({
    emailAlerts: false,
    smsAlerts: false,
    weeklyReports: false,
  });

  const [loading, setLoading] = useState(false);

  const NOTIFICATION_META = {
  emailAlerts: { number: 1, label: "Email Alerts" },
  smsAlerts: { number: 2, label: "SMS Alerts" },
  weeklyReports: { number: 3, label: "Weekly Reports" },
  };

  /* ================= FETCH SETTINGS ================= */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getNotificationSettings();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notification settings", err);
      }
    };
    fetchSettings();
  }, []);

  /* ================= TOGGLE HANDLER ================= */


const handleToggle = async (key) => {
  const previousState = { ...notifications };

  const updatedState = {
    ...notifications,
    [key]: !notifications[key],
  };

  const { number, label } = NOTIFICATION_META[key];

  // Optimistic UI
  setNotifications(updatedState);
  setLoading(true);

  // 🔔 Show numbered toast
  toast.loading(`${number}. Updating ${label}...`, { id: key });

  try {
    await updateNotificationSettings(updatedState);

    toast.success(
      ` ${label} ${updatedState[key] ? "Enabled" : "Disabled"}`,
      { id: key }
    );
  } catch (err) {
    setNotifications(previousState);
    toast.error(`${number}. Failed to update ${label}`, { id: key });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10 overflow-x-hidden">

      <h1 className="text-3xl font-bold text-green-400 mb-10">
        Settings
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* ================= PROFILE ================= */}
        <Section icon={<FiUser />} title="Profile Settings">
          <Input label="Full Name" placeholder="EnerSense" />
          <Input label="Email" placeholder="enersense@email.com" disabled />
          <Input label="Phone Number" placeholder="+91 XXXXXXXXXX" />
          <button className="btn-primary">Save Profile</button>
        </Section>

        {/* ================= ENERGY ================= */}
        <Section icon={<FiCpu />} title="Energy Preferences">
          <Select
            label="Tariff Type"
            options={["Domestic", "Commercial", "Industrial"]}
          />
          <Toggle
            label="Peak Hour Alerts"
            value={true}
            disabled
          />
        </Section>

        {/* ================= NOTIFICATIONS ================= */}
        <Section icon={<FiBell />} title="Notifications">
          <Toggle
            label="Email Alerts"
            value={notifications.emailAlerts}
            loading={loading}
            onChange={() => handleToggle("emailAlerts")}
          />
          <Toggle
            label="SMS Alerts"
            value={notifications.smsAlerts}
            loading={loading}
            onChange={() => handleToggle("smsAlerts")}
          />
          <Toggle
            label="Weekly Energy Reports"
            value={notifications.weeklyReports}
            loading={loading}
            onChange={() => handleToggle("weeklyReports")}
          />
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

/* ================= REUSABLE COMPONENTS ================= */

const Section = ({ icon, title, children }) => (
  <div className="bg-[#020617] p-6 rounded-xl space-y-4 shadow-md">
    <h2 className="flex items-center gap-2 text-xl font-semibold text-green-400">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-slate-400 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="
        w-full p-3 rounded-lg
        bg-[#0f172a]
        border border-white/10
        focus:outline-none
        focus:ring-2 focus:ring-green-500
      "
    />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label className="block text-sm text-slate-400 mb-1">
      {label}
    </label>
    <select
      className="
        w-full p-3 rounded-lg
        bg-[#0f172a]
        border border-white/10
        focus:outline-none
        focus:ring-2 focus:ring-green-500
      "
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

/* ================= CONTROLLED TOGGLE ================= */

const Toggle = ({ label, value, onChange, loading, disabled }) => {
  return (
    <div className="flex items-center justify-between select-none">
      <span className="text-slate-300">{label}</span>

      <button
        disabled={loading || disabled}
        onClick={onChange}
        className={`
          relative w-11 h-6 rounded-full transition-all duration-300
          ${value ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" : "bg-slate-600"}
          ${(loading || disabled) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5
            w-5 h-5 rounded-full bg-white
            transition-transform duration-300
            ${value ? "translate-x-5" : ""}
          `}
        />
      </button>
    </div>
  );
};

export default SettingPage;
