import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiBell,
  FiCpu,
  FiShield,
  FiLogOut,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

import { maskEmail } from "../utils/maskEmail";
import { maskPhone } from "../utils/maskPhone";

import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../services/operations/notificationAPI";
import { updateProfile } from "../services/operations/profileapi";
import { logout } from "../services/operations/authapi";
import { getMyProfile } from "../services/operations/profileapi";
import { useUser } from "../context/UserContext";


const SettingPage = () => {
  const navigate = useNavigate();

  /* ================= PROFILE STATE ================= */
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email:"",
    phone: "",
    profileImage: "",
    imageFile: null,
  });

  const { setUser } = useUser();

  /* ================= NOTIFICATION STATE ================= */
  const [notifications, setNotifications] = useState({
    emailAlerts: false,
    smsAlerts: false,
    weeklyReports: false,
  });

  const [loading, setLoading] = useState(false);
  const [deletePhoto, setDeletePhoto] = useState(false);


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

  useEffect(() => {
  const loadProfile = async () => {
    try {
      const res = await getMyProfile();

      const user = res.data;

      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        profileImage: user.profileImage || "",
        imageFile: null,
      });

    } catch (err) {
      console.log("Failed to load profile");
    }
  };

  loadProfile();
}, []);


  /* ================= PROFILE SAVE ================= */
  const handleProfileSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", profile.firstName || "");
      formData.append("lastName", profile.lastName || "");
      formData.append("phone", profile.phone || "");

      if (profile.imageFile) {
        formData.append("profileImage", profile.imageFile);
      }

      if (deletePhoto) {
        formData.append("removeProfileImage", true);
      }

      const res = await updateProfile(formData);

      // ✅ THIS LINE IS THE KEY
      setUser(res.user);

      setDeletePhoto(false);
      toast.success("✅ Profile updated successfully");

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "❌ Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= NOTIFICATION TOGGLE ================= */
  const handleToggle = async (key) => {
    const previousState = { ...notifications };
    const updatedState = { ...notifications, [key]: !notifications[key] };
    const { number, label } = NOTIFICATION_META[key];

    setNotifications(updatedState);
    setLoading(true);
    toast.loading(`${number}. Updating ${label}...`, { id: key });

    try {
      await updateNotificationSettings(updatedState);
      toast.success(
        `${label} ${updatedState[key] ? "Enabled" : "Disabled"}`,
        { id: key }
      );
    } catch (err) {
      setNotifications(previousState);
      toast.error(`${number}. Failed to update ${label}`, { id: key });
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    toast.success("Logout Successfully.");
    navigate("/login", { replace: true });
  };

  


  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-green-400 mb-10">Settings</h1>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* PROFILE */}
        <Section icon={<FiUser />} title="Profile Settings">

          {/* PROFILE IMAGE */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20">
              <img
                src={
                  profile.profileImage ||
                  "https://ui-avatars.com/api/?name=User&background=16a34a&color=fff"
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="cursor-pointer bg-green-600 px-3 py-2 rounded-md text-sm">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const preview = URL.createObjectURL(file);
                    setDeletePhoto(false);
                    setProfile({
                      ...profile,
                      profileImage: preview,
                      imageFile: file,
                    });
                  }}
                />
              </label>

              {profile.profileImage && (
                <button
                  type="button"
                  onClick={() => {
                    setDeletePhoto(true);
                    setProfile({
                      ...profile,
                      profileImage: "",
                      imageFile: null,
                    })
                  }}
                  className="text-red-400 text-sm hover:text-red-500"
                >
                  Delete Photo
                </button>
              )}
            </div>
          </div>

          <Input
            label="First Name"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />

          <Input
            label="Last Name"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />

          <div>
            <Input
              label="Email"
              value={maskEmail(profile.email)}
              disabled
            />
          </div>

          <Input
            label="Phone Number"
            value={maskPhone(profile.phone)}
            disabled
          />

          <button
            onClick={handleProfileSave}
            disabled={loading}
            className="bg-green-600 rounded-md p-2"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </Section>

        {/* ENERGY */}
        <Section icon={<FiCpu />} title="Energy Preferences">
          <Select
            label="Tariff Type"
            options={["Domestic", "Commercial", "Industrial"]}
          />
          <Toggle label="Peak Hour Alerts" value={true} disabled />
        </Section>

        {/* NOTIFICATIONS */}
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

        {/* SECURITY */}
        <Section icon={<FiShield />} title="Security & Privacy">
          <button
            className="btn-secondary"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/security/2fa")}
          >
            Enable 2FA
          </button>
        </Section>

        {/* LOGOUT */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-500"
          >
            <FiLogOut /> Logout
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
    <label className="block text-sm text-slate-400 mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/10
      focus:outline-none focus:ring-2 focus:ring-green-500"
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

const Toggle = ({ label, value, onChange, loading, disabled }) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-300">{label}</span>
    <button
      disabled={loading || disabled}
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full ${
        value ? "bg-green-500" : "bg-slate-600"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
        transition-transform ${value ? "translate-x-5" : ""}`}
      />
    </button>
  </div>
);

export default SettingPage;
