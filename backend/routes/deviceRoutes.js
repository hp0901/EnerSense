import express from "express";
import {
  pairDevice,
  getMyDevices,
  toggleDevice,
  unpairDevice,
} from "../controller/deviceController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/pair", auth, pairDevice);
router.get("/my-devices", auth, getMyDevices);
router.post("/toggle/:id", auth, toggleDevice);
router.post("/unpair/:id", auth, unpairDevice);


export default router;