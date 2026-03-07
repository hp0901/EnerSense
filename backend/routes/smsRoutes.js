import express from "express";
import { testSMS } from "../controller/smsController.js";

const router = express.Router();

router.get("/test-sms", testSMS);

export default router;