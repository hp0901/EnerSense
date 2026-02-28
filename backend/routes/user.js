import express from "express";
import { signup, login, sendotp } from "../controller/auth.js";
import { googleLogin } from "../controller/googleLogin.js";
import { sendForgotPasswordOtp } from "../controller/auth.js";
import { verifyForgotPasswordOtp } from "../controller/auth.js";
import { resetPassword } from "../controller/auth.js";
import { verifyLogin2FA } from "../controller/auth.js";

const router = express.Router();

console.log("Here in routes")
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendotp);
router.post("/forgot-password/send-otp", sendForgotPasswordOtp);
router.post("/forgot-password/verify-otp", verifyForgotPasswordOtp);
router.post("/google-login", googleLogin);
router.post("/reset-password", resetPassword);
router.post("/login-2fa", verifyLogin2FA);

export default router;
 