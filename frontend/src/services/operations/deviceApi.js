import { apiConnector } from "../apiConnector";
import { deviceEndpoints, adminEndpoints } from "../api";

const {
  PAIR_DEVICE,
  GET_MY_DEVICES,
  TOGGLE_DEVICE,
  UNPAIR_DEVICE,
  CREATE_DEVICE,
  GET_ALL_DEVICES,
  GET_TELEMETRY,
} = deviceEndpoints;

// Helper to sanitize base URLs and remove trailing slashes
const getBaseUrl = (endpoint, fallback) => {
  const url = endpoint || fallback;
  return url.replace(/\/$/, "");
};

// =============================
// Pair Device
// =============================
export const pairDeviceApi = async (deviceData) => {
  try {
    const payload = typeof deviceData === "string" ? { deviceId: deviceData } : deviceData;

    const res = await apiConnector(
      "POST",
      PAIR_DEVICE,
      payload,
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
export const toggleDeviceApi = async (deviceId, targetRelayState) => {
  try {
    const baseUrl = TOGGLE_DEVICE || "http://localhost:4000/api/v1/esp32device/toggle";

    const res = await apiConnector(
      "POST",
      `${baseUrl}/${deviceId}`,
      { targetRelayState },
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
// Get Live Telemetry Data
// =============================
export const getLatestTelemetryApi = async (deviceId) => {
  try {
    const baseUrl = getBaseUrl(GET_TELEMETRY, "http://localhost:4000/api/v1/esp32device/telemetry");
    const url = `${baseUrl}/${deviceId}`;

    const res = await apiConnector(
      "GET",
      url,
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch telemetry data";
  }
};

// =============================
// Send Telemetry Payload (For Web Simulator / Testing)
// =============================
export const sendTelemetryApi = async (telemetryPayload) => {
  try {
    const { deviceId } = telemetryPayload;
    const baseUrl = getBaseUrl(GET_TELEMETRY, "http://localhost:4000/api/v1/esp32device/telemetry");
    
    // Append deviceId if sending to the ingestion endpoint
    const url = deviceId ? `${baseUrl}/${deviceId}` : baseUrl;

    const res = await apiConnector(
      "POST",
      url,
      telemetryPayload,
      {
        "Content-Type": "application/json",
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to deliver telemetry payload";
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

// =============================
// Delete Device (Admin Only)
// =============================
const { DELETE_DEVICE } = adminEndpoints;

export const deleteDeviceApi = async (id) => {
  try {
    const res = await apiConnector(
      "DELETE",
      `${DELETE_DEVICE}/${id}`,
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete device";
  }
};