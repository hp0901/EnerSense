import UserCard from "./UserCard";
import GuestCard from "./GuestCard";

const CardPopover = ({ cardData, close }) => {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex justify-center items-start
        md:absolute md:inset-auto md:right-14 md:top-14
      "
    >
      {/* click outside overlay */}
      <div className="fixed inset-0" onClick={close} />

      <div className="relative bg-transparent rounded-xl shadow-xl p-2 w-full max-w-[380px] mt-16 md:mt-0">
        {cardData.isGuest ? (
          <GuestCard />
        ) : (
          <UserCard card={cardData.card} />
        )}
      </div>
    </div>
  );
};

export default CardPopover;
