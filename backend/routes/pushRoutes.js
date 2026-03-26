import express from "express";
import { testPush, saveDeviceToken } from "../controller/pushController.js";
import { updateDeviceUsage } from "../controller/deviceController.js";

const router = express.Router();

/* Save user device token */
router.post("/save-token", saveDeviceToken);

/* Send test push notification */
router.post("/test-push", testPush);

// Example route to update device usage and trigger push notification if threshold exceeded
router.post("/device/update-usage", updateDeviceUsage);

export default router;