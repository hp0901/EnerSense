import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUserCardApi } from "../services/operations/verifyCardApi";

const VerifyCard = () => {
  const { uid } = useParams();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verifiedAt, setVerifiedAt] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        setError("");

        const cardData = await verifyUserCardApi(uid);
        setCard(cardData);
        setVerifiedAt(new Date());

      } catch (err) {
        setError("Invalid or expired EnerSense Card");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [uid]);

  /* ---------------- LOADING STATE ---------------- */

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

  /* ---------------- ERROR STATE ---------------- */

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  /* ---------------- VERIFIED CARD ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-5">
          <p className="text-xs tracking-widest opacity-90">
            ENERSENSE DIGITAL VERIFICATION
          </p>

          <div className="flex items-center justify-center gap-2 mt-2">
            {/* Animated Tick */}
            <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center animate-pulse shadow">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-lg font-semibold">
              Verified Smart Card
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">

          <h2 className="text-xl font-bold text-gray-800">
            {card.name}
          </h2>

          <p className="text-sm text-gray-600 mt-1">
            {card.boardName}, {card.state}
          </p>

          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
            {card.cardType} Card
          </p>

          {/* Verified Badge */}
          <div className="mt-4 bg-green-50 text-green-700 rounded-lg py-2 text-sm font-semibold">
            EnerSense Verified User
          </div>

          {/* Verified Time */}
          {verifiedAt && (
            <p className="mt-3 text-xs text-gray-500">
              Verified on{" "}
              {verifiedAt.toLocaleDateString()} at{" "}
              {verifiedAt.toLocaleTimeString()}
            </p>
          )}

          <p className="mt-5 text-xs text-gray-500">
            This identity has been verified securely by EnerSense Server.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-2 text-xs text-gray-500">
          Official EnerSense Digital Identity
        </div>

      </div>
    </div>
  );
};

export default VerifyCard;
