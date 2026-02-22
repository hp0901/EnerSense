import { apiConnector } from "../apiConnector";
import { deviceEndpoints } from "../api"

const {
  PAIR_DEVICE,
  GET_MY_DEVICES,
  TOGGLE_DEVICE,
  UNPAIR_DEVICE,
  CREATE_DEVICE,
  GET_ALL_DEVICES
} = deviceEndpoints;

// =============================
// Pair Device
// =============================
export const pairDeviceApi = async (deviceId) => {
  try {
    const res = await apiConnector(
      "POST",
      PAIR_DEVICE,
      { deviceId },
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Pairing failed";
  }
};

// =============================
// Get My Devices
// =============================
export const getMyDevicesApi = async () => {
  try {
    const res = await apiConnector(
      "GET",
      GET_MY_DEVICES,
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch devices";
  }
};

// =============================
// Toggle Device
// =============================
export const toggleDeviceApi = async (id) => {
  try {
    const res = await apiConnector(
      "POST",
      `${TOGGLE_DEVICE}/${id}`,
      {},
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Toggle failed";
  }
};

// =============================
// Unpair Device
// =============================
export const unpairDeviceApi = async (id) => {
  try {
    const res = await apiConnector(
      "POST",
      `${UNPAIR_DEVICE}/${id}`,
      {},
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unpair failed";
  }
};

// =============================
// Create Device (Admin Only)
// =============================
export const createDeviceApi = async (deviceType) => {
  try {
    const res = await apiConnector(
      "POST",
      CREATE_DEVICE,
      { deviceType },
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Device creation failed";
  }
};

// =============================
// Get All Devices (Admin Only)
// =============================
export const getAllDevicesApi = async () => {
  try {
    const res = await apiConnector(
      "GET",
      GET_ALL_DEVICES,
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch devices";
  }
};