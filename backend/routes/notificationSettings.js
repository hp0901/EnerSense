import express from "express";
import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../controller/notificationSettings.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/notifications", auth, getNotificationSettings);
router.patch("/notifications", auth, updateNotificationSettings);

export default router;
