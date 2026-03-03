import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/EnerSence_logo.png";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContex";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import DigitalIdModal from "./AdminDigitalIdModal";

const AdminTopbar = () => {
  const { user, setUser, loading } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return null;
  if (!user) return null;

  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // 🔥 Admin Menu Items
  const adminMenu = [
    { label: "Dashboard", path: "/admin" },
    { label: "Manage Users", path: "/admin/manage-users" },
    { label: "Devices", path: "/admin/create-unique-id" },
    { label: "Payments", path: "/admin/payments" },
    { label: "Send Bulk Email", path: "/admin/send-bulk-email" },
  ];

  return (
    <>
      <div className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between border-b">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="EnerSense Logo" className="h-8" />
            <span className="text-xl font-semibold text-blue-600">
              EnerSense Admin
            </span>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div ref={dropdownRef} className="relative flex items-center gap-4">

          {/* ✅ CLICKABLE AVATAR */}
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={`w-10 h-10 text-white rounded-full 
              flex items-center justify-center font-semibold 
              cursor-pointer hover:ring-2 transition
              ${
                user.role === "admin"
                  ? "bg-blue-600 hover:ring-blue-400"
                  : "bg-green-600 hover:ring-green-400"
              }`}
          >
            {user.firstName.charAt(0).toUpperCase()}
          </div>

          {/* ✅ THREE DOTS */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-1 text-gray-500 hover:text-gray-700 transition"
          >
            <BsThreeDotsVertical size={20} />
          </button>

          {/* ✅ DROPDOWN MENU */}
          {open && (
            <div className="absolute right-0 top-14 bg-white border shadow-xl rounded-xl w-60 py-3 z-50">

              {/* User Info */}
              <div className="px-4 pb-3 border-b">
                <p className="font-medium text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  Role: {user.role}
                </p>
              </div>

              {/* Menu Links */}
              <div className="py-2">
                {adminMenu.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t my-2"></div>

              {/* Digital ID */}
              <button
                onClick={() => {
                  setShowCard(true);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition"
              >
                View Digital ID
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Digital ID Modal */}
      <DigitalIdModal
        open={showCard}
        onClose={() => setShowCard(false)}
        user={user}
      />
    </>
  );
};

export default AdminTopbar;