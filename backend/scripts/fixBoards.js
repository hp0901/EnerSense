import mongoose from "mongoose";
import User from "../../models/User.js";
import Board from "../../models/Board.js";
import { generateBoardUID } from "../uid.js";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const users = await User.find();

for (const user of users) {
  const boardExists = await Board.findOne({ user: user._id });

  if (!boardExists) {
    await Board.create({
      boardUID: generateBoardUID(user.state),
      user: user._id,
      boardName: user.board,
      state: user.state,
      location: "Home",
      status: "active",
    });

    console.log("Board created for:", user.email);
  }
}

console.log("Done");
process.exit();
