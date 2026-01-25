import express from "express";
import { signup, login, sendotp } from "../controller/auth.js";
import { googleLogin } from "../controller/googleLogin.js";

const router = express.Router();

console.log("Here in routes")
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendotp);
// router.post("/reset-password-token", resetPasswordToken);
// router.post("/reset-password", resetPassword);
router.post("/google-login", googleLogin);

export default router;
 