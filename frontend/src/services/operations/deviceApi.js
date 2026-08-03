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

const { DELETE_DEVICE } = adminEndpoints;

// Default active backend base URL fallback
const DEFAULT_BASE_HOST = "http://192.168.33.101:4000/api/v1/esp32device";

// Helper to sanitize base URLs and remove trailing slashes cleanly
const getBaseUrl = (endpoint, fallback) => {
  const url = endpoint || fallback;
  return url.replace(/\/+$/, "");
};

// =============================
// Pair Device
// =============================
export const pairDeviceApi = async (deviceData) => {
  try {
    const payload =
      typeof deviceData === "string" ? { deviceId: deviceData } : deviceData;

    const res = await apiConnector("POST", PAIR_DEVICE, payload, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

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
    const res = await apiConnector("GET", GET_MY_DEVICES, null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch devices";
  }
};

// =============================
// Toggle Device Relay
// =============================
export const toggleDeviceApi = async (deviceId, targetRelayState) => {
  try {
    const rawBaseUrl = TOGGLE_DEVICE || `${DEFAULT_BASE_HOST}/toggle`;
    const baseUrl = getBaseUrl(rawBaseUrl, `${DEFAULT_BASE_HOST}/toggle`);

    const payload =
      typeof targetRelayState === "boolean" ? { targetRelayState } : {};

    const res = await apiConnector("POST", `${baseUrl}/${deviceId}`, payload, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

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
    const res = await apiConnector("POST", `${UNPAIR_DEVICE}/${id}`, {}, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unpair failed";
  }
};

// =============================
// Get Live Telemetry Data (Frontend Fallback)
// =============================
export const getLatestTelemetryApi = async (deviceId) => {
  try {
    const rawUrl = GET_TELEMETRY || `${DEFAULT_BASE_HOST}/telemetry`;
    const baseUrl = getBaseUrl(rawUrl, `${DEFAULT_BASE_HOST}/telemetry`);

    const url = baseUrl.endsWith(`/${deviceId}`)
      ? baseUrl
      : `${baseUrl}/${deviceId}`;

    // 1. Try hitting the GET telemetry endpoint first
    const res = await apiConnector("GET", url, null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return res.data;
  } catch (error) {
    // 2. If backend throws 404 for GET /telemetry/:deviceId, intercept & fallback gracefully!
    if (error?.response?.status === 404 || error?.status === 404) {
      try {
        // Fetch all devices for this user
        const devicesRes = await getMyDevicesApi();
        const rawDevices = devicesRes?.devices || devicesRes?.data || (Array.isArray(devicesRes) ? devicesRes : []);
        
        // Find the matching device
        const targetDev = rawDevices.find(
          (d) => (d.deviceId || d.id || d._id) === deviceId
        );

        if (targetDev) {
          // Return the telemetry object nested inside the device document
          return {
            success: true,
            deviceId,
            telemetry: {
              voltage: targetDev.telemetry?.voltage ?? 0,
              current: targetDev.telemetry?.current ?? 0,
              power: targetDev.telemetry?.power ?? 0,
              temperature: targetDev.telemetry?.temperature ?? 0,
              humidity: targetDev.telemetry?.humidity ?? 0,
              relayState: targetDev.relayState ?? targetDev.telemetry?.relayState ?? false,
            },
          };
        }
      } catch (fallbackError) {
        console.warn("Fallback device search failed:", fallbackError);
      }
    }

    // 3. Ultimate safe response so Dashboard never crashes on 0s
    return {
      success: true,
      deviceId,
      telemetry: { voltage: 0, current: 0, power: 0, relayState: false },
    };
  }
};

// =============================
// Send Telemetry Payload (Simulator / Testing)
// =============================
export const sendTelemetryApi = async (telemetryPayload) => {
  try {
    const { deviceId } = telemetryPayload || {};

    const rawUrl = GET_TELEMETRY || `${DEFAULT_BASE_HOST}/telemetry`;
    const baseUrl = getBaseUrl(rawUrl, `${DEFAULT_BASE_HOST}/telemetry`);

    // Append deviceId if it's missing from the base path
    let url = baseUrl;
    if (deviceId && !baseUrl.endsWith(`/${deviceId}`)) {
      url = `${baseUrl}/${deviceId}`;
    }

    const res = await apiConnector("POST", url, telemetryPayload, {
      "Content-Type": "application/json",
    });

    return res.data;
  } catch (error) {
    throw (
      error?.response?.data?.message || "Failed to deliver telemetry payload"
    );
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
    const res = await apiConnector("GET", GET_ALL_DEVICES, null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch devices";
  }
};

// =============================
// Delete Device (Admin Only)
// =============================
export const deleteDeviceApi = async (id) => {
  try {
    const res = await apiConnector("DELETE", `${DELETE_DEVICE}/${id}`, null, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete device";
  }
};