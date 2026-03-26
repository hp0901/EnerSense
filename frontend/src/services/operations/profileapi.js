import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";

/* ================= GET PROFILE ================= */
export const getMyProfile = async () => {
  try {
    const res = await apiConnector(
      "GET",
      profileEndpoints.GET_PROFILE
    );

    return res.data;
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    throw error;
  }
};


/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (data) => {
  try {
    const res = await apiConnector(
      "PUT",
      profileEndpoints.UPDATE_PROFILE,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    throw error;
  }
};
