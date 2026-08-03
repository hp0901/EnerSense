import express from "express";
import { Device, Telemetry } from "../models/esp32Device.js";

const router = express.Router();

/**
 * Helper to sanitize device IDs consistently across all endpoints
 */
const sanitizeDeviceId = (id) => String(id || "").trim().toUpperCase();

/**
 * 📥 POST /api/v1/esp32device/telemetry/:deviceId
 * Ingest telemetry posted by the ESP32 hardware
 */
router.post("/telemetry/:deviceId", async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`\n============== 📥 [TELEMETRY INGEST START - ${timestamp}] ==============`);
  
  try {
    const rawId = req.params.deviceId || req.body.deviceId;
    const deviceId = sanitizeDeviceId(rawId);
    
    console.log(`[TELEMETRY] Raw Param/Body ID: "${rawId}" | Sanitized ID: "${deviceId}"`);
    console.log(`[TELEMETRY] Incoming Payload:`, JSON.stringify(req.body));

    const { voltage, current, power, temperature, humidity, relayState: reportedRelayState } = req.body;

    if (!deviceId) {
      console.error("❌ [TELEMETRY ERROR] Missing deviceId in request!");
      return res.status(400).json({ success: false, error: "Missing deviceId" });
    }

    // 1. Fetch current device record using .lean() to prevent Mongoose schema field stripping
    let device = await Device.findOne({ deviceId }).lean();

    if (!device) {
      console.warn(`⚠️ [TELEMETRY] Device '${deviceId}' NOT FOUND in DB. Creating new record...`);
      const newDevice = await Device.create({
        deviceId,
        relayState: true,
        "telemetry.relayState": true,
      });
      device = newDevice.toObject();
      console.log(`✅ [TELEMETRY] Created new device doc with Mongo _id: ${device._id}`);
    }

    // 💡 SAFE FALLBACK EVALUATION:
    // Resolves 'undefined' by checking root relayState, nested telemetry.relayState, or defaulting to true
    let currentTargetState;
    if (typeof device.relayState === "boolean") {
      currentTargetState = device.relayState;
    } else if (typeof device.telemetry?.relayState === "boolean") {
      currentTargetState = device.telemetry.relayState;
    } else {
      currentTargetState = true;
    }

    console.log(`🔍 [TELEMETRY STATE CHECK] Doc _id: ${device._id} | DB relayState: ${device.relayState} -> Evaluated Target: ${currentTargetState}`);

    // 2. Perform atomic telemetry snapshot update (Leaves device.relayState 100% UNTOUCHED)
    const updateResult = await Device.updateOne(
      { deviceId },
      {
        $set: {
          relayState: currentTargetState, // Keep root state populated explicitly
          lastSeen: new Date(),
          "telemetry.voltage": voltage ?? 0,
          "telemetry.current": current ?? 0,
          "telemetry.power": power ?? 0,
          "telemetry.temperature": temperature ?? 0,
          "telemetry.humidity": humidity ?? 0,
          "telemetry.relayState": reportedRelayState ?? currentTargetState,
          "telemetry.updatedAt": new Date(),
        }
      }
    );

    console.log(`📊 [TELEMETRY MONGO UPDATE] Matched: ${updateResult.matchedCount} | Modified: ${updateResult.modifiedCount}`);

    // 3. Store historical log
    const telemetryLog = await Telemetry.create({
      deviceId,
      voltage: voltage ?? 0,
      current: current ?? 0,
      power: power ?? 0,
      temperature: temperature ?? 0,
      humidity: humidity ?? 0,
      relayState: reportedRelayState ?? currentTargetState,
    });

    console.log(`📝 [TELEMETRY HISTORICAL LOGGED] Telemetry Doc _id: ${telemetryLog._id}`);

    // 4. Verify DB state AFTER update using .lean()
    const deviceAfter = await Device.findOne({ deviceId }).lean();
    console.log(`🔎 [TELEMETRY POST-VERIFY] Doc _id: ${deviceAfter._id} | DB relayState AFTER TELEMETRY: ${deviceAfter?.relayState}`);

    console.log(`📡 [TELEMETRY INGEST RESPONSE] Device: ${deviceId} | Returning targetRelayState: ${currentTargetState}`);
    console.log(`================ 📥 [TELEMETRY INGEST END] ================\n`);

    return res.status(200).json({
      success: true,
      targetRelayState: currentTargetState,
    });
  } catch (error) {
    console.error("❌ [TELEMETRY ENDPOINT EXCEPTION]:", error);
    console.log(`================ 📥 [TELEMETRY INGEST END WITH ERROR] ================\n`);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 📡 GET /api/v1/esp32device/telemetry/:deviceId
 * Fetch latest live telemetry metrics for a device + Online/Offline status
 */
router.get("/telemetry/:deviceId", async (req, res) => {
  try {
    const rawId = req.params.deviceId;
    const deviceId = sanitizeDeviceId(rawId);

    if (!deviceId) {
      return res.status(400).json({ success: false, message: "DeviceId parameter is required" });
    }

    const device = await Device.findOne({ deviceId }).lean();

    if (!device) {
      return res.status(200).json({
        success: true,
        deviceId,
        telemetry: {
          isOnline: false,
          voltage: 0,
          current: 0,
          power: 0,
          temperature: 0,
          humidity: 0,
          relayState: false,
          lastSeen: null,
        },
      });
    }

    // 🟢 ONLINE / OFFLINE LOGIC:
    // Device is considered ONLINE if lastSeen was within the last 15 seconds (15,000ms)
    const OFFLINE_THRESHOLD_MS = 15000;
    const lastSeenTime = device.lastSeen ? new Date(device.lastSeen).getTime() : 0;
    const isOnline = Date.now() - lastSeenTime < OFFLINE_THRESHOLD_MS;

    const liveTelemetry = {
      voltage: device.telemetry?.voltage ?? 0,
      current: device.telemetry?.current ?? 0,
      power: device.telemetry?.power ?? 0,
      temperature: device.telemetry?.temperature ?? 0,
      humidity: device.telemetry?.humidity ?? 0,
      relayState: device.relayState ?? device.telemetry?.relayState ?? false,
      isOnline, // 👈 True if ESP32 updated within 15 seconds
      lastSeen: device.lastSeen || null,
      updatedAt: device.telemetry?.updatedAt || device.updatedAt || new Date(),
    };

    return res.status(200).json({
      success: true,
      deviceId: device.deviceId,
      telemetry: liveTelemetry,
    });
  } catch (error) {
    console.error("❌ [GET TELEMETRY ERROR]:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 🔌 POST /api/v1/esp32device/toggle
 * 🔌 POST /api/v1/esp32device/toggle/:deviceId
 */
const handleToggle = async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`\n============== 🔌 [RELAY TOGGLE START - ${timestamp}] ==============`);

  try {
    const rawId = req.params.deviceId || req.body.deviceId;
    const deviceId = sanitizeDeviceId(rawId);
    const { targetRelayState } = req.body;

    console.log(`[TOGGLE] Raw Param/Body ID: "${rawId}" | Sanitized ID: "${deviceId}"`);
    console.log(`[TOGGLE] Requested targetRelayState payload:`, targetRelayState, `(Type: ${typeof targetRelayState})`);

    if (!deviceId) {
      console.error("❌ [TOGGLE ERROR] Missing deviceId!");
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: deviceId",
      });
    }

    let device = await Device.findOne({ deviceId }).lean();

    if (!device) {
      console.error(`❌ [TOGGLE ERROR] Device '${deviceId}' not found in database!`);
      return res.status(404).json({
        success: false,
        message: `Device with ID '${deviceId}' not found.`,
      });
    }

    // Determine current state with fallback
    const currentState = 
      typeof device.relayState === "boolean"
        ? device.relayState
        : (typeof device.telemetry?.relayState === "boolean" ? device.telemetry.relayState : false);

    console.log(`🔍 [TOGGLE BEFORE UPDATE] Doc _id: ${device._id} | Current relayState in DB: ${device.relayState}`);

    // Determine target state
    const newRelayState =
      typeof targetRelayState === "boolean"
        ? targetRelayState
        : !currentState;

    console.log(`🎯 [TOGGLE DECISION] Setting relayState to: ${newRelayState}`);

    // Atomic update to BOTH root document and nested telemetry object
    const updateResult = await Device.updateOne(
      { deviceId },
      {
        $set: {
          relayState: newRelayState,
          lastSeen: new Date(),
          "telemetry.relayState": newRelayState
        }
      }
    );

    console.log(`📊 [TOGGLE MONGO UPDATE] Matched: ${updateResult.matchedCount} | Modified: ${updateResult.modifiedCount}`);

    // Verify DB update using .lean()
    const updatedDevice = await Device.findOne({ deviceId }).lean();
    console.log(`🔎 [TOGGLE POST-VERIFY] Doc _id: ${updatedDevice._id} | New DB relayState AFTER TOGGLE: ${updatedDevice?.relayState}`);

    console.log(`🔌 [RELAY TOGGLE COMPLETED] Device: ${deviceId} -> Updated targetRelayState: ${newRelayState}`);
    console.log(`================ 🔌 [RELAY TOGGLE END] ================\n`);

    return res.status(200).json({
      success: true,
      message: `Relay state updated to ${newRelayState ? "ON" : "OFF"}`,
      relayState: newRelayState,
      targetRelayState: newRelayState,
    });
  } catch (error) {
    console.error("❌ [TOGGLE ENDPOINT EXCEPTION]:", error);
    console.log(`================ 🔌 [RELAY TOGGLE END WITH ERROR] ================\n`);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to toggle relay state",
    });
  }
};

router.post("/toggle", handleToggle);
router.post("/toggle/:deviceId", handleToggle);

export default router;