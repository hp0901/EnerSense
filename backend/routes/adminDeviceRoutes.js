import { isAdmin } from "../middlewares/isAdmin.js";
import { auth } from "../middlewares/auth.js";
import { sendBulkEmail } from "../controller/deviceController.js";
import express from "express";

import {
  createDevice,
  getAllDevices
} from "../controller/deviceController.js";

import { 
  getAllPayments,
  getDashboardStatus,
   getMonthlyRevenue
} from "../controller/paymentHistory.controller.js";

import {getAllUsers} from "../controller/userDetails.js"; 

import { deleteDevice } from "../controller/deviceController.js";



const router = express.Router();

// ================= DEVICE ROUTES =================
router.post("/create", auth, isAdmin, createDevice);
router.get("/all", auth, isAdmin, getAllDevices);
router.post("/send-email", auth, isAdmin, sendBulkEmail);

// ================= PAYMENT ROUTES =================
router.get("/payments/all", auth, isAdmin, getAllPayments);
router.get("/monthly-revenue", auth, isAdmin, getMonthlyRevenue);
// ================= DASHBOARD ROUTE =================
router.get("/dashboard", auth, isAdmin, getDashboardStatus);

// ================= USER ROUTES =================
router.get("/users", auth, isAdmin, getAllUsers);

// ================= DELETE DEVICE ROUTE =================
router.delete("/delete/:id", auth, isAdmin, deleteDevice);

router.get("/test", (req, res) => {
  res.send("Device route working");
});

export default router;