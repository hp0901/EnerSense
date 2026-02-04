import express from "express";
import { activatePremium } from "../controller/premium.controller.js";
import { auth } from "../middlewares/auth.js";
import { downloadInvoice } from "../controller/invoice.controller.js";

const router = express.Router();

router.post("/activate", auth, activatePremium);
router.get("/:paymentId", auth, downloadInvoice);
export default router;