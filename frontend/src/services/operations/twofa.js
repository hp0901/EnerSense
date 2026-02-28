import { twoFactorEndpoints } from "../api.js" // Adjust the path as necessary
import { apiConnector } from "../apiConnector.js"; // Adjust the path as necessary

const { LOGIN_API } = twoFactorEndpoints;

/* ==================================
   ADMIN LOGIN 2FA VERIFY
================================== */

export const login2FAApi = async (userId, otp) => {
  try {
    const res = await apiConnector(
      "POST",
      LOGIN_API,
      {
        userId,
        token: otp,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data;

  } catch (err) {
    console.log("LOGIN_2FA_ERROR", err);

    throw (
      err?.response?.data?.message ||
      err?.message ||
      "2FA Verification Failed"
    );
  }
};