import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";


// 🔹 Get logged-in user profile
export const getMyProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await apiConnector(
    "GET",
    profileEndpoints.GET_PROFILE,
    null,
    {
      Authorization: `Bearer ${token}`,
    }
  );
  return res.data;
};

// 🔹 Update profile
export const updateProfile = async (data) => {
  const res = await apiConnector(
    "PUT",
    profileEndpoints.UPDATE_PROFILE,
    data
  );
  return res.data;
};
