import React, { useEffect, useRef } from "react";
import UserCard from "./UserCard";

const DigitalIdModal = ({ open, onClose, user }) => {
  const modalRef = useRef(null);

  // ✅ Hooks must always run
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open || !user) return null;

  const cardData = {
    cardType: "Silver",
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone || "0000000000",
    userUID: `USER-${user._id?.slice(-6).toUpperCase()}`,
    boardUID: "ENER-METER-476752",
    deviceCount: user.devices?.length || 0,
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div ref={modalRef} className="relative">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-sm hover:text-gray-300"
        >
          ✕ Close
        </button>

        <UserCard card={cardData} />
      </div>
    </div>
  );
};

export default DigitalIdModal;