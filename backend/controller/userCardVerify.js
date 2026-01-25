import User from "../models/User.js";
import Board from "../models/Board.js";

export const verifyUserCard = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ userUID: uid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired card",
      });
    }

    const board = await Board.findOne({
      user: user._id,
      status: "active",
    });

    return res.status(200).json({
      success: true,
      card: {
        name: `${user.firstName} ${user.lastName}`,
        userUID: user.userUID,
        boardName: board ? board.boardName : user.board,
        state: user.state,
        cardType: user.cardType,
      },
    });
  } catch (error) {
    console.error("[VERIFY CARD ERROR]", error);
    res.status(500).json({ success: false });
  }
};
