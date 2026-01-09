import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/EnerSence_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { isLoggedIn, logout } from "../utils/auth";
import { useAuth } from "../context/AuthContex.js";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { isAuth , logout } = useAuth();
  const loggedIn = isAuth;

  // 🔐 Dynamic nav links
  const navLinks = loggedIn
    ? [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Settings", path: "/settings" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Signup", path: "/signup" },
        { name: "Login", path: "/login" },
      ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  // 🔒 Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="EnerSense Logo" className="h-10 w-auto" />
        <span className="text-xl font-bold text-blue-600">EnerSense</span>
      </Link>

      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`p-2 rounded-lg transition ${
          open
            ? "bg-red-500 text-white hover:bg-red-600"
            : "text-gray-600 hover:text-blue-600"
        }`}
      >
        {open ? <AiOutlineClose size={18} /> : <BsThreeDotsVertical size={18} />}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-6 top-14 bg-white border shadow-lg rounded-md w-44"
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* 🔴 Logout button (only if logged in) */}
          {loggedIn && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
