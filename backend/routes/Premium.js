import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  capturePremiumPayment,
  verifyPremiumPayment,
} from "../controller/premiumPayment.controller.js"

const router = express.Router();

// Razorpay
router.post("/capture", auth, capturePremiumPayment);
router.post("/verify", auth, verifyPremiumPayment);

export default router;
