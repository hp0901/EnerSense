import { apiConnector } from "../apiConnector";
import { userCardEndpoints } from "../api";

export const verifyUserCardApi = async (uid) => {
  try {
    const res = await apiConnector(
      "GET",
      `${userCardEndpoints.VERIFY_CARD}/${uid}`
    );
    console.log("API Responce", res);

    if (!res.success) {
      throw new Error(res.message);
    }

    return res.card;

  } catch (err) {
    console.log("VERIFY CARD ERROR", err);

    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Invalid or expired EnerSense Card"
    );
  }
};


