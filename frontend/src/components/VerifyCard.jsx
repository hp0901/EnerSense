import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VerifyCard = () => {
  const { uid } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`https://enersense.duckdns.org/api/v1/user-card/${uid}`)

        const data = await res.json();

        if (!data.success) {
          throw new Error("Invalid UID");
        }

        setCard(data.card);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-xl font-bold text-gray-800">
          {card.name}
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          {card.boardName}, {card.state}
        </p>

        <p className="mt-2 text-xs uppercase tracking-wide">
          {card.cardType} Card
        </p>

        <div className="mt-4 text-green-600 font-semibold flex items-center justify-center gap-2">
          ✔ EnerSense Verified User
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Verified via EnerSense Digital Identity
        </p>
      </div>
    </div>
  );
};

export default VerifyCard;
