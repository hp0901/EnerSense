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
import { getAvatar } from "../utils/getAvatar";
import { maskEmail } from "../utils/maskEmail";
import { maskPhone } from "../utils/maskPhone";

import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../services/operations/notificationAPI";
import { updateProfile, getMyProfile } from "../services/operations/profileapi";
import { logout } from "../services/operations/authapi";
import { useUser } from "../context/UserContext";

const SettingPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profileImage: "",
    imageFile: null,
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: false,
    smsAlerts: false,
    weeklyReports: false,
  });

  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [deletePhoto, setDeletePhoto] = useState(false);

  const NOTIFICATION_META = {
    emailAlerts: { number: 1, label: "Email Alerts" },
    smsAlerts: { number: 2, label: "SMS Alerts" },
    weeklyReports: { number: 3, label: "Weekly Reports" },
  };

  /* ================= FETCH PROFILE ================= */
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
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, []);

  /* ================= FETCH NOTIFICATIONS ================= */
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

  /* ================= CLEANUP BLOB ================= */
  useEffect(() => {
    return () => {
      if (profile.profileImage?.startsWith("blob:")) {
        URL.revokeObjectURL(profile.profileImage);
      }
    };
  }, [profile.profileImage]);


  /* ================= SAVE PROFILE ================= */
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

      setUser(res.data || res.user); // safer
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

  /* ================= TOGGLE ================= */
  const handleToggle = async (key) => {
    const prev = { ...notifications };
    const updated = { ...notifications, [key]: !notifications[key] };
    const { number, label } = NOTIFICATION_META[key];

    setNotifications(updated);
    setLoading(true);
    toast.loading(`${number}. Updating ${label}...`, { id: key });

    try {
      await updateNotificationSettings(updated);
      toast.success(`${label} ${updated[key] ? "Enabled" : "Disabled"}`, {
        id: key,
      });
    } catch {
      setNotifications(prev);
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

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-green-400 mb-10">Settings</h1>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* PROFILE */}
        <Section icon={<FiUser />} title="Profile Settings">

          {/* IMAGE */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-white/20">
              <img
                src={getAvatar(profile)}
                alt="profile"
                onError={(e) => {
                  e.target.src = "https://ui-avatars.com/api/?name=User";
                }}
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
                  onClick={() => {
                    setDeletePhoto(true);
                    setProfile({
                      ...profile,
                      profileImage: "",
                      imageFile: null,
                    });
                  }}
                  className="text-red-400 text-sm"
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

          <Input label="Email" value={maskEmail(profile.email)} readOnly />
          <Input label="Phone" value={maskPhone(profile.phone)} readOnly />

          <button
            onClick={handleProfileSave}
            disabled={loading}
            className="bg-green-600 rounded-md p-2"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </Section>

        {/* NOTIFICATIONS */}
        <Section icon={<FiBell />} title="Notifications">
          {Object.keys(notifications).map((key) => (
            <Toggle
              key={key}
              label={NOTIFICATION_META[key].label}
              value={notifications[key]}
              onChange={() => handleToggle(key)}
            />
          ))}
        </Section>

        {/* SECURITY */}
        <Section icon={<FiShield />} title="Security">
          <button onClick={() => navigate("/change-password")}>
            Change Password
          </button>
          <button onClick={() => navigate("/security/2fa")}>
            Enable 2FA
          </button>
        </Section>

        {/* LOGOUT */}
        <button onClick={handleLogout} className="text-red-400">
          Logout
        </button>

      </div>
    </div>
  );
};

/* COMPONENTS */

const Section = ({ icon, title, children }) => (
  <div className="bg-[#020617] p-6 rounded-xl space-y-4">
    <h2 className="flex items-center gap-2 text-xl text-green-400">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-slate-400">{label}</label>
    <input {...props} className="w-full p-2 bg-[#0f172a]" />
  </div>
);

const Toggle = ({ label, value, onChange }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <button onClick={onChange}>{value ? "ON" : "OFF"}</button>
  </div>
);

export default SettingPage;