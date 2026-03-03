import { apiConnector } from "../apiConnector";
import { userCardEndpoints } from "../api";

export const fetchUserCard = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "GET",
      userCardEndpoints.GET_USER_CARD,
      null,
      token ? { Authorization: `Bearer ${token}` } : {}
    );

    return res.data;

  } catch (error) {
    console.error("FETCH USER CARD ERROR:", error);
    throw error;   // ✅ Throw FULL error, not just message
  }
};