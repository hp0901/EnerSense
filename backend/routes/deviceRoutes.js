import express from "express";
import {
  pairDevice,
  getMyDevices,
  toggleDevice,
  unpairDevice,
  getAllDevices,
  createDevice
} from "../controller/deviceController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/pair", auth, pairDevice);
router.get("/my-devices", auth, getMyDevices);
router.post("/toggle/:id", auth, toggleDevice);
router.post("/unpair/:id", auth, unpairDevice);


// Admin-only route to create a new device
router.post("/create", auth, isAdmin, createDevice);
router.get("/all", auth, isAdmin, getAllDevices);

router.get("/test", (req, res) => {
  res.send("Device route working");
});
export default router;