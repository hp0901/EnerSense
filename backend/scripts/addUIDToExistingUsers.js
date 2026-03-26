import mongoose from "mongoose";
import crypto from "crypto";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const generateUID = () =>
  "ENS-" + crypto.randomBytes(4).toString("hex").toUpperCase();

(async () => {
  await mongoose.connect(MONGO_URI);

  const users = await User.find({ userUID: { $exists: false } });

  console.log(`Found ${users.length} users without UID`);

  for (const user of users) {
    await User.updateOne(
      { _id: user._id },
      { $set: { userUID: generateUID() } }
    );

    console.log(`Updated ${user.email}`);
  }

  console.log("✅ UID migration completed safely");
  process.exit();
})();
