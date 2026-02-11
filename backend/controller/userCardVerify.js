export const verifyUserCard = async (req, res) => {
  try {
    const uid = req.params.uid.toUpperCase();

    console.log("Verify UID:", uid);

    const user = await User.findOne({
      userUID: uid,
    });

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
        boardName: board?.boardName || user.board || "No Board",
        state: user.state,
        cardType: user.cardType,
      },
    });

  } catch (error) {
    console.error("[VERIFY CARD ERROR]", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
