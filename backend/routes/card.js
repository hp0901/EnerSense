import express from "express";
import { getUserCard } from "../controller/cardcontroller.js";
import { optionalAuth } from "../middlewares/auth.js"
const router = express.Router();

router.get("/", optionalAuth, getUserCard);

export default router;