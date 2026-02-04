import express from "express";
import { auth } from "../middlewares/auth.js";
import { getMyPayments } from "../controller/paymentHistory.controller.js";

const router = express.Router();

router.get("/my-payments", auth, getMyPayments);

export default router;
