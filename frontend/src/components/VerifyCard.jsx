import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUserCardApi } from "../services/operations/verifyCardApi";

const VerifyCard = () => {
  const { uid } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  const verifyUser = async () => {
    try {
      setError("");

      const cardData = await verifyUserCardApi(uid);
      setCard(cardData);

    } catch (err) {
      setError("Invalid or expired EnerSense Card");
    } finally {
      setLoading(false);
    }
  };

  verifyUser();
}, [uid]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">🔍 Verifying EnerSense Card...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-4">
        <p className="text-sm tracking-wide">
          ENERSENSE DIGITAL VERIFICATION
        </p>
        <p className="text-lg font-semibold mt-1">
          ✔ Verified Smart Card
        </p>
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

        <div className="mt-4 bg-green-50 text-green-700 rounded-lg py-2 text-sm font-semibold">
          EnerSense Verified User
        </div>

        <p className="mt-5 text-xs text-gray-500">
          This identity has been verified by EnerSense Server.
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
