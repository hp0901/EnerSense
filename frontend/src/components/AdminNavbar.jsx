import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/EnerSence_logo.png";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";

const AdminTopbar = () => {
  const { user, setUser } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between border-b">

      {/* Left */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="EnerSense Logo" className="h-8" />
        <span className="text-xl font-semibold text-blue-600">
          EnerSense
        </span>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-4">

        {/* Avatar */}
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-green-600 text-white rounded-full 
                     flex items-center justify-center font-semibold 
                     cursor-pointer hover:ring-2 hover:ring-green-400"
        >
          {user?.firstName?.charAt(0) || "A"}
        </div>

        <BsThreeDotsVertical className="text-gray-500 cursor-pointer" />

        {/* Dropdown Card */}
        {open && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-14 bg-white border shadow-lg rounded-lg w-52 p-3"
          >
            <p className="font-medium text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Role: {user?.role}
            </p>

            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 hover:bg-red-50 px-2 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar;