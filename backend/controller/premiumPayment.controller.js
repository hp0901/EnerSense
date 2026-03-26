import instance from "../config/razorpay.js";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import { PREMIUM_PLANS } from "../utils/premiumPlans.js";
import { activatePremiumLogic } from "./activatePremiumLogic.js";

/* ======================================
   CREATE RAZORPAY ORDER
====================================== */
export const capturePremiumPayment = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.user.id;

    if (!plan || !PREMIUM_PLANS[plan]) {
      return res.status(400).json({
        success: false,
        message: "Invalid premium plan",
      });
    }

    const planData = PREMIUM_PLANS[plan];

    const options = {
      amount: planData.price * 100, // INR → paise
      currency: "INR",
      receipt: `prem_${Date.now().toString().slice(-10)}`, // < 40 chars
      notes: {
        plan,
        userId,
      },
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Capture premium payment error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment",
    });
  }
};

/* ======================================
   VERIFY PAYMENT + SAVE HISTORY + ACTIVATE
====================================== */
export const verifyPremiumPayment = async (req, res) => {
  console.log("VERIFY BODY 👉", req.body);

  try {
    const userId = req.user.id;

    // ✅ NUCLEAR-SAFE MAPPING (no destructuring bugs)
    const razorpayOrderId = req.body.razorpay_order_id;
    const razorpayPaymentId = req.body.razorpay_payment_id;
    const razorpaySignature = req.body.razorpay_signature;
    const plan = req.body.plan;

    console.log("MAPPED 👉", razorpayOrderId, razorpayPaymentId);

    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature ||
      !plan ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
      });
    }

    /* 🔐 VERIFY SIGNATURE */
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    /* 💾 SAVE PAYMENT */
    const planData = PREMIUM_PLANS[plan];
    console.log("SCHEMA PATHS 👉", Object.keys(Payment.schema.paths));

    await Payment.create({
      user: userId,
      plan,
      amount: planData.price,
      razorpayOrderId,
      razorpayPaymentId,
      status: "success",
    });

    /* 🔁 ACTIVATE PREMIUM */
    await activatePremiumLogic(userId, plan);

    return res.status(200).json({
      success: true,
      message: "Payment verified & premium activated",
    });
  } catch (error) {
    console.error("Verify premium payment error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
