import { generateBoardUID } from "../utils/uid.js";
import Board from "../models/Board.js";

export const createBoard = async (req, res) => {
  try {
    const { boardName, location } = req.body;

    const board = await Board.create({
      boardUID: generateBoardUID(req.user.state),
      user: req.user.id,
      boardName,
      state: req.user.state,
      location,
    });

    res.status(201).json({
      success: true,
      board,
    });
  } catch (error) {
    res.status(500).json({ message: "Board creation failed" });
  }
};
