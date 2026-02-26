import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/EnerSence_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/AuthContex.js";
import { fetchUserCard } from "../services/card.js";
import CardPopover from "../components/CardPopover";
import { useUser } from "../context/UserContext.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);          // menu
  const [cardOpen, setCardOpen] = useState(false);  // card
  const [cardData, setCardData] = useState(null);

  const menuRef = useRef(null);
  const cardRef = useRef(null);

  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();

  const { user , setUser } = useUser();
  const isPremium = user?.isPremium;
  const isAdmin = user?.role === "admin";

  /* =====================================================
     🔗 NAV LINKS (LOGICAL ORDER – UX FRIENDLY)
     ===================================================== */
  const navLinks = [
    // 🌍 Public / Learning (Guest + All)
    { name: "Home", path: "/", auth: "all" },
    { name: "About", path: "/about", auth: "all" },
    { name: "Energy Awareness", path: "/energy-awareness", auth: "all" },
    { name: "FAQs", path: "/faqs", auth: "all" },
    { name: "Contact", path: "/contact", auth: "all" },

    // 🔐 Core App (Logged-in users)
    { name: "Dashboard", path: "/dashboard", auth: "private" },
    { name: "Energy Meter", path: "/energy-meter-dashboard", auth: "private" },
    { name: "Device Control", path: "/device-control", auth: "private" },
    { name: "Premium Benefits", path: "/premium-benefits", auth: "private" },
    // 💎 Monetization
  isPremium
  ? { name: "My Plan", path: "/premium", auth: "private" }
  : { name: "Pricing", path: "/pricing", auth: "private" },

    // ⚙️ Account
    { name: "Settings", path: "/settings", auth: "private" },

    // 👤 Authentication
    { name: "Login", path: "/login", auth: "guest" },
    { name: "Signup", path: "/signup", auth: "guest" },

    //For Payments
    { name: "My Payments", path: "/my-payments", auth: "private" },

    // Admin links can be added here with auth: "admin" and handled in the filter logic 
    { name: "Admin Panel", path: "/admin", auth: "admin" }

  ];

  /* =====================================================
     🔍 Filter links based on auth state
     ===================================================== */
  const filteredLinks = navLinks.filter((link) => {
    if (link.auth === "all") return true;
    if (link.auth === "private") return isAuth;
    if (link.auth === "guest") return !isAuth;
    if (link.auth === "admin") return isAuth && isAdmin;
    return false;
  });

  /* =====================================================
     🔐 Logout
     ===================================================== */
    const handleLogout = () => {
      logout();        // service logout (remove token)
      setUser(null);   // clear React state
      navigate("/login");
      toast.success("Logged out successfully");
    };


  /* =====================================================
     📡 Fetch user card
     ===================================================== */
  useEffect(() => {
    fetchUserCard()
      .then((res) => setCardData(res.data))
      .catch(() => setCardData({ isGuest: true }));
  }, [isAuth]);

  /* =====================================================
     ❌ Close menu / card on outside click
     ===================================================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setCardOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      
      {/* 🔵 Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="EnerSense Logo" className="h-10 w-auto" />
        <span className="text-xl font-bold text-blue-600">
          EnerSense
        </span>
      </Link>

      {/* ▶ Right Controls */}
      <div className="relative flex items-center gap-3">

        {/* 🪪 User Avatar */}
        <button
          onClick={() => {
            setCardOpen(!cardOpen);
            setOpen(false);
          }}
          className="w-9 h-9 rounded-full border flex items-center justify-center hover:ring-2 hover:ring-blue-500"
        >
        <img
          src={
            isAuth && user?.profileImage
              ? user.profileImage
              : `https://ui-avatars.com/api/?name=${user?.firstName || "GuestUser"} ${user?.lastName || ""}&background=16a34a&color=fff`
          }
          alt={user ? `${user.firstName} ${user.lastName}` : "Guest"}
          className="w-8 h-8 rounded-full object-cover"
        />


        </button>

        {/* ☰ Menu Button */}
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
          {open ? <AiOutlineClose size={18} /> : <BsThreeDotsVertical size={18} />}
        </button>

        {/* 🪪 Card Popover */}
        {cardOpen && cardData && (
          <div ref={cardRef}>
            <CardPopover
              cardData={cardData}
              close={() => setCardOpen(false)}
            />
          </div>
        )}

        {/* ☰ Dropdown Menu */}
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 top-12 bg-white border shadow-lg rounded-md w-52"
          >
            {filteredLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className="flex justify-between items-center px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <span>{link.name}</span>

                {/* 💎 Upgrade Badge */}
                {(link.name === "Pricing" || link.name === "Premium Benefits") && !isPremium && (
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                    Pro
                  </span>
                )}
              </Link>
            ))}

            {/* 🔴 Logout */}
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
