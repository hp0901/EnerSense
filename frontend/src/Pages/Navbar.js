import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/EnerSence_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/AuthContex.js";
import { fetchUserCard } from "../services/card.js"
import CardPopover from "../components/CardPopover";

const Navbar = () => {
  const [open, setOpen] = useState(false);        // menu
  const [cardOpen, setCardOpen] = useState(false); // card
  const [cardData, setCardData] = useState(null);

  const menuRef = useRef(null);
  const cardRef = useRef(null);

  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();

  // 🔗 NAV LINKS
  const navLinks = [
    { name: "Home", path: "/", auth: "all" },
    { name: "Dashboard", path: "/dashboard", auth: "private" },
    { name: "Settings", path: "/settings", auth: "private" },
    { name: "About", path: "/about", auth: "all" },
    { name: "Contact", path: "/contact", auth: "all" },
    { name: "Energy Awareness", path: "/energy-awareness", auth: "all" },
    { name: "FAQs", path: "/faqs", auth: "all" },
    { name: "Device Control", path: "/device-control", auth: "private" },
    { name: "Signup", path: "/signup", auth: "guest" },
    { name: "Login", path: "/login", auth: "guest" },
  ];

  // 🔍 Filter links based on auth
  const filteredLinks = navLinks.filter((link) => {
    if (link.auth === "all") return true;
    if (link.auth === "private") return isAuth;
    if (link.auth === "guest") return !isAuth;
    return false;
  });

  // 🔐 Logout
  const handleLogout = () => {
    logout();
    setOpen(false);
    setCardOpen(false);
    navigate("/login");
  };

  // 📡 Fetch user card (runs on auth change)
  useEffect(() => {
    fetchUserCard()
      .then((res) => setCardData(res.data))
      .catch(() => setCardData({ isGuest: true }));
  }, [isAuth]);

  // ❌ Close popups on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }

      if (
        cardRef.current &&
        !cardRef.current.contains(e.target)
      ) {
        setCardOpen(false);
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
        <span className="text-xl font-bold text-blue-600">
          EnerSense
        </span>
      </Link>

      {/* Right Controls */}
      <div className="relative flex items-center gap-3">
        {/* 🪪 USER CARD BUTTON */}
        <button
          onClick={() => {
            setCardOpen(!cardOpen);
            setOpen(false);
          }}
          className="w-9 h-9 rounded-full border flex items-center justify-center hover:ring-2 hover:ring-blue-500"
        >
          <img
            src={
              isAuth
                ? "https://api.dicebear.com/6.x/initials/svg?seed=ES"
                : "https://api.dicebear.com/6.x/initials/svg?seed=Guest"
            }
            alt="user"
            className="w-8 h-8 rounded-full"
          />
        </button>

        {/* ☰ MENU BUTTON */}
        <button
          onClick={() => {
            setOpen(!open);
            setCardOpen(false);
          }}
          className={`p-2 rounded-lg transition ${
            open
              ? "bg-red-500 text-white hover:bg-red-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          {open ? (
            <AiOutlineClose size={18} />
          ) : (
            <BsThreeDotsVertical size={18} />
          )}
        </button>

        {/* 🪪 CARD POPOVER */}
        {cardOpen && cardData && (
          <div ref={cardRef}>
            <CardPopover
              cardData={cardData}
              close={() => setCardOpen(false)}
            />
          </div>
        )}

        {/* ☰ MENU DROPDOWN */}
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 top-12 bg-white border shadow-lg rounded-md w-44"
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

            {/* 🔴 LOGOUT */}
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
      </div>
    </nav>
  );
};

export default Navbar;
