import { isAdmin } from "../middlewares/isAdmin.js";
import { auth } from "../middlewares/auth.js";
import { sendBulkEmail } from "../controller/deviceController.js";
import express from "express";
import {
    createDevice,
    getAllDevices
} from "../controller/deviceController.js";

const router = express.Router();

// Admin-only route to create a new device
router.post("/create", auth, isAdmin, createDevice);
router.get("/all", auth, isAdmin, getAllDevices);
router.post("/send-email", auth, isAdmin, sendBulkEmail);
router.get("/test", (req, res) => {
  res.send("Device route working");
});

export default router;