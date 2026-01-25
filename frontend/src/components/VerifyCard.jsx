import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VerifyCard = () => {
  const { uid } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`https://enersense.duckdns.org/api/v1/user-card/${uid}`)
      .then(res => res.json())
      .then(data => setCard(data.card));
  }, [uid]);

  if (!card) return <p>Verifying...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 rounded-xl shadow-lg bg-white">
        <h2 className="text-xl font-bold">{card.name}</h2>
        <p>{card.boardName}</p>
        <p>{card.state}</p>
        <p className="text-green-600 font-semibold">✔ Verified User</p>
      </div>
    </div>
  );
};

export default VerifyCard;
