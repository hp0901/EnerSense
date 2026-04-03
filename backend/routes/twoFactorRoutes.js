import express from "express";
import { generate2FA,setup2FA, verify2FA, sendOTP, verifyOTP } from "../controller/twoFactorController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate", auth, setup2FA);
router.post("/verify", auth, verify2FA);
router.post("/send-otp", sendOTP);
router.post("/verify-otp",verifyOTP);

export default router;