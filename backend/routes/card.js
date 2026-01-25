import express from "express";
import { getUserCard } from "../controller/cardcontroller.js";
import { verifyUserCard } from "../controller/userCardVerify.js";
import { optionalAuth } from "../middlewares/auth.js"
const router = express.Router();

router.get("/", optionalAuth, getUserCard);
router.get("/user-card/verify/:uid", verifyUserCard);

export default router;