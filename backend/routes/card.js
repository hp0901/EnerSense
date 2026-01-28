import express from "express";
import { getUserCard } from "../controller/cardcontroller.js";
import { verifyUserCard } from "../controller/userCardVerify.js";
import { auth } from "../middlewares/auth.js"
const router = express.Router();

router.get("/", auth, getUserCard);
router.get("/user-card/verify/:uid", verifyUserCard);

export default router;