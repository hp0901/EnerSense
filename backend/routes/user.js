import express from "express";
import { signup, login, sendotp } from "../controller/auth.js";

const router = express.Router();

console.log("Here in routes")
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendotp);

export default router;
