import express from "express";
import {
  testPush,
  saveDeviceToken,
  sendNotificationToUsers,
} from "../controller/pushController.js";

import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

/* 🔔 Save user device token (protected) */
router.post("/save-token", auth, saveDeviceToken);

/* 🔔 Send test push notification */
router.post("/test-push", testPush);

/* 🔔 Admin: Send notification to users */
router.post(
  "/send-notification",
  auth,
  isAdmin,
  sendNotificationToUsers
);

export default router;