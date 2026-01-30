import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api"

export const updateProfile = async (data) => {
  const res = await apiConnector(
    "PUT",
    profileEndpoints.UPDATE_PROFILE,
    data
  );
  return res.data;
};
