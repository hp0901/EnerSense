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
  getDashboardStats,
   getMonthlyRevenue
} from "../controller/paymentHistory.controller.js";
import {getAllUsers} from "../controller/userDetails.js"; 

const router = express.Router();

// ================= DEVICE ROUTES =================
router.post("/create", auth, isAdmin, createDevice);
router.get("/all", auth, isAdmin, getAllDevices);
router.post("/send-email", auth, isAdmin, sendBulkEmail);

// ================= PAYMENT ROUTES =================
router.get("/payments/all", auth, isAdmin, getAllPayments);
router.get("/monthly-revenue", auth, isAdmin, getMonthlyRevenue);
// ================= DASHBOARD ROUTE =================
router.get("/dashboard", auth, isAdmin, getDashboardStats);

// ================= USER ROUTES =================
router.get("/users", auth, isAdmin, getAllUsers);


router.get("/test", (req, res) => {
  res.send("Device route working");
});

export default router;