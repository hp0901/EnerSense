import express from "express";
import { updateProfile } from "../controller/profileController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// PUT /api/v1/profile/update
router.put("/update", auth, updateProfile);

export default router;
