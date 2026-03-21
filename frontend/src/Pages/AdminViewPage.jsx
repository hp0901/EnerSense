import React, { useEffect, useState } from "react";
import { getUserById } from "../services/operations/adminapi";
import { useParams } from "react-router-dom";
import { getAvatar } from "../utils/getAvatar";
const AdminViewPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const data = await getUserById(id);
      setUser(data.data || data);
      console.log("Id data ", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Safe Date Formatter (FIXES 1970 ISSUE)
  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading user details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        User not found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={getAvatar(user)}
            alt="profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${user.firstName}`;
            }}
            className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-slate-400">{user.email}</p>

            <div className="flex gap-3 mt-2">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                {user.role}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  user.isPremium
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {user.isPremium ? "Premium" : "Free"}
              </span>

              {user.isVerified && (
                <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PERSONAL INFO */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">👤 Personal Info</h2>
            <p><span className="text-slate-400">User UID:</span> {user.userUID || "N/A"}</p>
            <p><span className="text-slate-400">Phone:</span> {user.phone || "N/A"}</p>
            <p><span className="text-slate-400">Gender:</span> {user.gender || "N/A"}</p>
            <p><span className="text-slate-400">State:</span> {user.state || "N/A"}</p>
            <p><span className="text-slate-400">Board:</span> {user.board || "N/A"}</p>
            <p><span className="text-slate-400">Card Type:</span> {user.cardType || "N/A"}</p>
          </div>

          {/* ACCOUNT INFO */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">🔐 Account Info</h2>

            <p><span className="text-slate-400">Role:</span> {user.role}</p>
            <p><span className="text-slate-400">2FA Enabled:</span> {user.twoFactorEnabled ? "Yes" : "No"}</p>
            <p><span className="text-slate-400">Verified:</span> {user.isVerified ? "Yes" : "No"}</p>
            <p><span className="text-slate-400">Devices:</span> { user?.deviceCount || 0}</p>
          </div>

          {/* SUBSCRIPTION */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">💎 Subscription</h2>

            <p><span className="text-slate-400">Plan:</span> {user.premiumPlan || "N/A"}</p>
            <p><span className="text-slate-400">Started:</span> {formatDate(user.premiumStartedAt)}</p>
            <p><span className="text-slate-400">Expires:</span> {formatDate(user.premiumExpiresAt)}</p>
            <p><span className="text-slate-400">Reminder Sent:</span> {user.premiumExpiryReminderSent ? "Yes" : "No"}</p>
          </div>

          {/* SYSTEM INFO */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">📅 System Info</h2>

            <p><span className="text-slate-400">Created At:</span> {formatDate(user.createdAt)}</p>
            <p><span className="text-slate-400">Updated At:</span> {formatDate(user.updatedAt)}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminViewPage;