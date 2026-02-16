import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUserCardApi } from "../services/operations/verifyCardApi";
import { maskEmail } from "../utils/stringUtils";

const VerifyCard = () => {
  const { uid } = useParams();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verifiedAt, setVerifiedAt] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);

  /* ---------------- VERIFY USER ---------------- */

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const cardData = await verifyUserCardApi(uid);
        setCard(cardData);
        setVerifiedAt(new Date());

        setTimeout(() => setShowSuccess(true), 150);
      } catch {
        setError("Invalid or expired EnerSense Card");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [uid]);

  /* ---------------- REDIRECT COUNTDOWN ---------------- */

  useEffect(() => {
    if (!card) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [card]);

  /* ---------------- CARD THEMES ---------------- */

  const cardThemes = {
    Silver: {
      bg: "bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200",
      border: "border-gray-300",
      badge: "text-gray-700 border-gray-400 bg-gray-200/50",
      header: "from-gray-400 to-gray-600",
      avatar: "from-gray-400 to-gray-600",
    },
    Gold: {
      bg: "bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200",
      border: "border-yellow-500",
      badge: "text-yellow-800 border-yellow-600 bg-yellow-300/50",
      header: "from-yellow-400 to-yellow-600",
      avatar: "from-yellow-400 to-yellow-600",
    },
    Platinum: {
      bg: "bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200",
      border: "border-purple-600",
      badge: "text-purple-800 border-purple-700 bg-purple-300/50",
      header: "from-purple-500 to-purple-700",
      avatar: "from-purple-500 to-purple-700",
    },
    Bronze: {
      bg: "bg-gradient-to-br from-[#f5e6c8] via-[#e0b97a] to-[#b07a3f]",
      border: "border-[#8b5a2b]",
      badge: "text-[#5c3a1e] border-[#8b5a2b] bg-[#e6c79c]/70",
      header: "from-[#c18a4a] to-[#8b5a2b]",
      avatar: "from-[#c18a4a] to-[#8b5a2b]",
    },
  };

  const theme = cardThemes[card?.cardType] || cardThemes.Silver;

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">
            Verifying EnerSense Card...
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  /* ---------------- VERIFIED UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">

      <div
        className={`w-full max-w-sm rounded-3xl shadow-2xl border ${theme.border}
        overflow-hidden transition-all duration-700 transform
        ${showSuccess ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >

        {/* HEADER */}
        <div className={`bg-gradient-to-r ${theme.header} text-white text-center py-6`}>
          <p className="text-xs tracking-widest opacity-80">
            ENERSENSE DIGITAL VERIFICATION
          </p>

          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold">Verified Identity</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className={`${theme.bg} px-6 pb-6 pt-12 text-center`}>

          {/* Avatar */}
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${theme.avatar}
            flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto -mt-16`}>
            {card.name.charAt(0)}
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-3">
            {card.name}
          </h2>

          {card.email && (
            <p className="text-xs text-gray-600 mt-1">
              {maskEmail(card.email)}
            </p>
          )}

          {/* Card Badge */}
          <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full border ${theme.badge}`}>
            {card.cardType} Card
          </span>

          {/* Info */}
          <div className="mt-6 space-y-3">
            <div className="bg-white/60 backdrop-blur rounded-lg p-3">
              <p className="text-xs text-gray-500">Board</p>
              <p className="font-semibold text-gray-800">
                {card.boardName}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur rounded-lg p-3">
              <p className="text-xs text-gray-500">State</p>
              <p className="font-semibold text-gray-800">
                {card.state}
              </p>
            </div>

            <div className="bg-green-50 text-green-700 rounded-lg py-2 text-sm font-semibold">
              EnerSense Verified User
            </div>

            {verifiedAt && (
              <p className="text-xs text-gray-600">
                Verified on {verifiedAt.toLocaleDateString()} at{" "}
                {verifiedAt.toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* REDIRECT MESSAGE */}
          <div className="mt-5 text-xs text-gray-500">
            Redirecting to homepage in{" "}
            <span className="font-semibold text-gray-700">
              {countdown}s
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 text-center py-3 text-xs text-gray-500">
          Official EnerSense Digital Identity
        </div>
      </div>
    </div>
  );
};

export default VerifyCard;
