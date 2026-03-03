import User from "../models/User.js";
import Board from "../models/Board.js";

export const getUserCard = async (req, res) => {
  try {
    if (req.user) {

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Active board (for displaying main board UID)
      const board = await Board.findOne({
        user: user._id,
        status: "active",
      });

      // 🔥 Device Statistics
      const totalDevices = await Board.countDocuments({
        user: user._id,
      });

      const activeDevices = await Board.countDocuments({
        user: user._id,
        status: "active",
      });

      const inactiveDevices = await Board.countDocuments({
        user: user._id,
        status: "inactive",
      });

      return res.status(200).json({
        isGuest: false,
        card: {
          userUID: user.userUID,
          boardUID: board ? board.boardUID : "NOT_ASSIGNED",
          boardName: board ? board.boardName : "NOT_ASSIGNED",
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          state: user.state,
          gender: user.gender,
          role: user.role,
          joinDate: user.createdAt,
          cardType: user.cardType,

          // 🔥 Device Data
          totalDevices,
          activeDevices,
          inactiveDevices,
        },
      });
    }

    // Guest fallback
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
        totalDevices: 0,
        activeDevices: 0,
        inactiveDevices: 0,
      },
    });

  } catch (error) {
    console.error("[BACKEND] User Card Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};