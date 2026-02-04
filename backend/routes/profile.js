import express from "express";
import { updateProfile } from "../controller/profileController.js";
import { auth } from "../middlewares/auth.js";
import { getMyProfile } from "../controller/profileController.js";

const router = express.Router();

// PUT /api/v1/profile/update
router.put("/update", auth, updateProfile);
// GET /api/v1/profile/me
router.get("/me", auth, getMyProfile);

export default router;
