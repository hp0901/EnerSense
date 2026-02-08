import { apiConnector } from "../apiConnector";
import { userCardEndpoints } from "../api";

export const verifyUserCardApi = async (uid) => {
  try {
    const res = await apiConnector(
      "GET",
      `${userCardEndpoints.VERIFY_CARD}/${uid}`
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.card;

  } catch (err) {
    console.log("VERIFY CARD ERROR", err);

    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Invalid or expired EnerSense Card"
    );
  }
};


