import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/EnerSence_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/AuthContex.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { isAuth, logout } = useAuth();

  // 🔗 ALL LINKS (single source of truth)
  const navLinks = [
    { name: "Home", path: "/", auth: "all" },
    { name: "Dashboard", path: "/dashboard", auth: "private" },
    { name: "Settings", path: "/settings", auth: "private" },
    { name: "About", path: "/about", auth: "all" },
    { name: "Contact", path: "/contact", auth: "all" },
    { name: "Energy Awareness", path: "/energy-awareness", auth: "all" },
    { name: "Signup", path: "/signup", auth: "guest" },
    { name: "Login", path: "/login", auth: "guest" },
    // ⚠️ Terms & Conditions handled separately (example)
    // { name: "Terms", path: "/terms", auth: "all", special: true },
  ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  // 🔒 Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔍 Filter links based on auth
  const filteredLinks = navLinks.filter((link) => {
    if (link.auth === "all") return true;
    if (link.auth === "private") return isAuth;
    if (link.auth === "guest") return !isAuth;
    return false;
  });

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

      {/* Dropdown */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-6 top-14 bg-white border shadow-lg rounded-md w-44"
        >
          {filteredLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* 🔴 Logout (still separate, action-based) */}
          {isAuth && (
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
