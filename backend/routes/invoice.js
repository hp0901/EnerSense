import express from "express";
import { auth } from "../middlewares/auth.js";
import { downloadInvoice } from "../controller/invoice.controller.js";

const router = express.Router();

router.get("/:paymentId", auth, downloadInvoice);

export default router;
