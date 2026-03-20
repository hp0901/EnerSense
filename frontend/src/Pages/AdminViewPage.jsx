import React, { useEffect, useState } from "react";
import { getUserByEmail } from "../services/operations/adminapi";

const AdminViewPage = ({ email }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [email]);

  const fetchUser = async () => {
    try {
      const data = await getUserByEmail(email);
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            👤 User Profile
          </h1>
          <p className="text-slate-400">
            Detailed information about selected user
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">

          {/* Name */}
          <div className="mb-6">
            <p className="text-sm text-slate-400">Full Name</p>
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
          </div>

          {/* Email */}
          <div className="mb-6">
            <p className="text-sm text-slate-400">Email</p>
            <p className="text-blue-400">{user.email}</p>
          </div>

          {/* Role */}
          <div className="mb-6">
            <p className="text-sm text-slate-400">Role</p>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
              {user.role}
            </span>
          </div>

          {/* Premium */}
          <div className="mb-6">
            <p className="text-sm text-slate-400">Subscription</p>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                user.isPremium
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {user.isPremium ? "Premium User" : "Free User"}
            </span>
          </div>

          {/* Created */}
          <div className="mb-6">
            <p className="text-sm text-slate-400">Joined On</p>
            <p>
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminViewPage;