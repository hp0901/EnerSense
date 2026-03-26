import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import Board from "../models/Board.js";
import { generateUserUID, generateBoardUID } from "../utils/uid.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName: given_name,
        lastName: family_name || "",
        email,
        password: "GOOGLE_AUTH",
        phone: "0000000000",
        state: "NA",
        board: "NA",
        gender: "Other",
        userUID: generateUserUID(),
        image: picture,
      });

      await Board.create({
        boardUID: generateBoardUID("NA"),
        user: user._id,
        boardName: "NA",
        state: "NA",
        location: "NA",
        status: "active",
      });
    }

    // 🔐 IMPORTANT: ADMIN 2FA CHECK BEFORE JWT
    if (user.role === "admin") {
      if (user.twoFactorEnabled) {
        return res.status(200).json({
          success: true,
          require2FA: true,
          userId: user._id,
        });
      }
    }

    // ✅ NORMAL USER OR ADMIN WITHOUT 2FA
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    console.error("GOOGLE LOGIN ERROR FULL:", error);
    return res.status(401).json({
      success: false,
      message: error.message || "Google login failed",
    });
  }
};
