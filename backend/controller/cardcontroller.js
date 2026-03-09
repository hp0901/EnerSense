import User from "../models/User.js";
import Board from "../models/Board.js";
import Device from "../models/Device.js"; // ✅ ADD THIS

export const getUserCard = async (req, res) => {
  try {
    if (req.user) {

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const board = await Board.findOne({
        user: user._id,
        status: "active",
      });

      // ✅ DEVICE STATS FROM DEVICE COLLECTION
      const totalDevices = await Device.countDocuments({
        user: user._id,
      });

      const activeDevices = await Device.countDocuments({
        user: user._id,
        powerStatus: true,
      });

      const inactiveDevices = await Device.countDocuments({
        user: user._id,
        powerStatus: false,
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

          totalDevices,
          activeDevices,
          inactiveDevices,
        },
      });
    }

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