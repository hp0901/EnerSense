import User from "../models/User.js";
import Board from "../models/Board.js";

export const getUserCard = async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get active board
      const board = await Board.findOne({
        user: user._id,
        status: "active",
      });

      const phone = user.phone;

      return res.status(200).json({
        isGuest: false,
        card: {
          userUID: user.userUID,
          boardUID: board ? board.boardUID : "NOT_ASSIGNED",
          boardName: board ? board.boardName : user.board,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone,
          state: user.state,
          gender: user.gender,
          role: user.role,
          joinDate: user.createdAt,
          cardType: user.cardType,
          deviceCount: user.devices?.length || 0,
        },
      });
    }

    // Guest user
    return res.status(200).json({
      isGuest: true,
      card: {
        userUID: "GUEST-USER",
        boardUID: "GUEST-METER",
        boardName: "Demo Electricity Board",
        name: "Guest User",
        email: "guest@enersense.io",
        phone: "+91 XXXXXXXXXX",
        state: "NA",
        gender: "NA",
        role: "guest",
        joinDate: "2024-01-01",
        cardType: "Silver",
        deviceCount: 0,
      },
    });
  } catch (error) {
    console.error("[BACKEND] User Card Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
