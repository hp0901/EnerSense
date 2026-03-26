import { premiumEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

// 1️⃣ Create Razorpay order
export const capturePremiumPayment = async (data) => {
  const token = localStorage.getItem("token");

  const res = await apiConnector(
    "POST",
    premiumEndpoints.CAPTURE_PREMIUM,
    data,
    {
      Authorization: `Bearer ${token}`,
    }
  );

  if (!res.data.success) {
    throw new Error(res.data.message);
  }
 
  return res.data;
};

// 2️⃣ Verify payment + activate premium
export const verifyPremiumPayment = async (data) => {
  const token = localStorage.getItem("token");

  const res = await apiConnector(
    "POST",
    premiumEndpoints.VERIFY_PREMIUM,
    data,
    {
      Authorization: `Bearer ${token}`,
    }
  );

  if (!res.data.success) {
    throw new Error(res.data.message);
  }

  return res.data;
};
