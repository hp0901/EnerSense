import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    boardUID: {
      type: String,
      unique: true,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    boardName: {
      type: String, // PGVCL, MGVCL, etc.
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    location: {
      type: String, // Home / Shop / Factory
      default: "Home",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);
