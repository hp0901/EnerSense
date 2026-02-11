import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUserCardApi } from "../services/operations/verifyCardApi";

const VerifyCard = () => {
  const { uid } = useParams();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verifiedAt, setVerifiedAt] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const cardData = await verifyUserCardApi(uid);
        setCard(cardData);
        setVerifiedAt(new Date());

        // success animation trigger
        setTimeout(() => setShowSuccess(true), 150);

      } catch {
        setError("Invalid or expired EnerSense Card");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [uid]);

  /* ---------- CARD COLOR THEMES ---------- */

  const cardThemes = {
    Silver: {
      header: "from-gray-400 to-gray-600",
      badge: "bg-gray-100 text-gray-700",
      avatar: "from-gray-400 to-gray-600",
    },
    Gold: {
      header: "from-yellow-400 to-yellow-600",
      badge: "bg-yellow-100 text-yellow-700",
      avatar: "from-yellow-400 to-yellow-600",
    },
    Bronze: {
      header: "from-orange-400 to-amber-600",
      badge: "bg-orange-100 text-orange-700",
      avatar: "from-orange-400 to-amber-600",
    },
  };

  const theme = cardThemes[card?.cardType] || cardThemes.Silver;

  /* ---------- LOADING ---------- */

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

  /* ---------- ERROR ---------- */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  /* ---------- VERIFIED UI ---------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">

      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden
        transform transition-all duration-700
        ${showSuccess ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >

        {/* Header */}
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

            <p className="text-lg font-semibold">
              Verified Identity
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center -mt-10 px-6 pt-2">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${theme.avatar}
            flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
            {card.name.charAt(0)}
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-3">
            {card.name}
          </h2>

          <span className={`mt-1 px-3 py-1 text-xs font-semibold rounded-full ${theme.badge}`}>
            {card.cardType} Card
          </span>
        </div>

        {/* Info Section */}
        <div className="px-6 mt-8 space-y-3">

          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">Board</p>
            <p className="font-semibold text-gray-800">{card.boardName}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">State</p>
            <p className="font-semibold text-gray-800">{card.state}</p>
          </div>

          <div className="bg-green-50 text-green-700 rounded-lg py-2 text-sm font-semibold text-center">
            EnerSense Verified User
          </div>

          {verifiedAt && (
            <p className="text-xs text-gray-500 text-center">
              Verified on {verifiedAt.toLocaleDateString()} at{" "}
              {verifiedAt.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-3 mt-6 text-xs text-gray-500">
          Official EnerSense Digital Identity
        </div>
      </div>
    </div>
  );
};

export default VerifyCard;
