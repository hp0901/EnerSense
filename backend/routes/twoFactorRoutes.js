import express from "express";
import { generate2FA, verify2FA } from "../controller/twoFactorController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/generate", auth, generate2FA);
router.post("/verify", auth, verify2FA);

export default router;