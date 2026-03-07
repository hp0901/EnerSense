import express from "express";
import { testPush, saveDeviceToken } from "../controller/pushController.js";

const router = express.Router();

/* Save user device token */
router.post("/save-token", saveDeviceToken);

/* Send test push notification */
router.post("/test-push", testPush);

export default router;