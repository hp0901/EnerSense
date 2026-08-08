import express from "express";
import { Device, Telemetry } from "../models/esp32Device.js";

const router = express.Router();

/**
 * Helper to sanitize device IDs consistently across all endpoints
 */
const sanitizeDeviceId = (id) => String(id || "").trim().toUpperCase();

/**
 * 🌉 HARDWARE BRIDGE MAPPING:
 * Maps secondary UI virtual cards to the main physical ESP32 board and its relay channel.
 */
const VIRTUAL_DEVICE_MAP = {
  "ENR-6SQHG0": { primaryHardwareId: "ENR-0KDOY8", channel: 2 },
};

/**
 * 📥 POST /api/v1/esp32device/telemetry
 * 📥 POST /api/v1/esp32device/telemetry/:deviceId
 * Ingest telemetry posted by the physical ESP32 hardware
 */
/**
 * 📥 POST /api/v1/esp32device/telemetry
 * 📥 POST /api/v1/esp32device/telemetry/:deviceId
 */
const handleTelemetryIngest = async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`\n============== 📥 [TELEMETRY INGEST - ${timestamp}] ==============`);

  try {
    const rawId = req.params.deviceId || req.body.deviceId;
    const deviceId = sanitizeDeviceId(rawId);

    const { voltage, current, power, temperature, humidity } = req.body;

    if (!deviceId) {
      return res.status(400).json({ success: false, error: "Missing deviceId" });
    }

    // 1. Find or create device record
    let device = await Device.findOne({ deviceId });

    if (!device) {
      device = await Device.create({
        deviceId,
        relayState: false,
        relay1State: false,
        relay2State: false,
      });
    }

    // 🔑 READ MASTER TARGET STATES FROM DATABASE (Ignore what board sent in body)
    const targetR1 = device.relay1State ?? device.relayState ?? false;
    const targetR2 = device.relay2State ?? false;

    // 2. Update telemetry metrics ONLY (Do NOT overwrite relay1State/relay2State!)
    if (!device.telemetry) device.telemetry = {};
    device.lastSeen = new Date();
    device.telemetry.voltage = voltage ?? 0;
    device.telemetry.current = current ?? 0;
    device.telemetry.power = power ?? 0;
    device.telemetry.temperature = temperature ?? 0;
    device.telemetry.humidity = humidity ?? 0;
    device.telemetry.updatedAt = new Date();

    await device.save();

    // 3. Sync Virtual Device Record (ENR-6SQHG0)
    await Device.updateOne(
      { deviceId: "ENR-6SQHG0" },
      {
        $set: {
          lastSeen: new Date(),
          relayState: targetR2,
          relay1State: targetR2,
          relay2State: targetR2,
          "telemetry.voltage": voltage ?? 0,
          "telemetry.current": current ?? 0,
          "telemetry.power": power ?? 0,
          "telemetry.temperature": temperature ?? 0,
          "telemetry.humidity": humidity ?? 0,
          "telemetry.updatedAt": new Date(),
        },
      },
      { upsert: true }
    );

    console.log(`📡 [RESPONSES TO ESP32] Sending Target States -> R1: ${targetR1} | R2: ${targetR2}`);

    // 4. Respond to ESP32 with the Database Target States
    return res.status(200).json({
      success: true,
      targetRelayState: targetR1,
      relay1State: targetR1,
      relay2State: targetR2,
    });
  } catch (error) {
    console.error("❌ [TELEMETRY ERROR]:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

router.post("/telemetry", handleTelemetryIngest);
router.post("/telemetry/:deviceId", handleTelemetryIngest);

/**
 * 📡 GET /api/v1/esp32device/telemetry/:deviceId
 * Fetch latest live telemetry metrics for a device + Online/Offline status
 */
router.get("/telemetry/:deviceId", async (req, res) => {
  try {
    const rawId = req.params.deviceId;
    let deviceId = sanitizeDeviceId(rawId);
    let channelOverride = null;

    // Bridge check: If queried device is virtual (ENR-6SQHG0), resolve to primary hardware (ENR-0KDOY8)
    if (VIRTUAL_DEVICE_MAP[deviceId]) {
      channelOverride = VIRTUAL_DEVICE_MAP[deviceId].channel;
      deviceId = VIRTUAL_DEVICE_MAP[deviceId].primaryHardwareId;
    }

    if (!deviceId) {
      return res.status(400).json({ success: false, message: "DeviceId parameter is required" });
    }

    const device = await Device.findOne({ deviceId }).lean();

    if (!device) {
      return res.status(200).json({
        success: true,
        deviceId: rawId,
        telemetry: {
          isOnline: false,
          voltage: 0,
          current: 0,
          power: 0,
          temperature: 0,
          humidity: 0,
          relayState: false,
          relay1State: false,
          relay2State: false,
          lastSeen: null,
        },
      });
    }

    // 🟢 ONLINE / OFFLINE LOGIC: 15 Second Threshold
    const OFFLINE_THRESHOLD_MS = 15000;
    const lastSeenTime = device.lastSeen ? new Date(device.lastSeen).getTime() : 0;
    const isOnline = Date.now() - lastSeenTime < OFFLINE_THRESHOLD_MS;

    const evaluatedRelayState = channelOverride === 2 
      ? (device.relay2State ?? false) 
      : (device.relay1State ?? device.relayState ?? false);

    const liveTelemetry = {
      voltage: device.telemetry?.voltage ?? 0,
      current: device.telemetry?.current ?? 0,
      power: device.telemetry?.power ?? 0,
      temperature: device.telemetry?.temperature ?? 0,
      humidity: device.telemetry?.humidity ?? 0,
      relayState: evaluatedRelayState,
      relay1State: device.relay1State ?? device.telemetry?.relay1State ?? false,
      relay2State: device.relay2State ?? device.telemetry?.relay2State ?? false,
      isOnline,
      lastSeen: device.lastSeen || null,
      updatedAt: device.telemetry?.updatedAt || device.updatedAt || new Date(),
    };

    return res.status(200).json({
      success: true,
      deviceId: rawId,
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
/**
 * 🔌 POST /api/v1/esp32device/toggle
 * 🔌 POST /api/v1/esp32device/toggle/:deviceId
 */
const handleToggle = async (req, res) => {
  try {
    let rawId = req.params.deviceId || req.body.deviceId;
    let targetId = sanitizeDeviceId(rawId);

    console.log(`\n============== 🔌 [RELAY TOGGLE START] Target ID: "${targetId}" ==============`);

    // Determine if this request is targeting Relay Channel 2 (e.g. AC card ENR-6SQHG0)
    const isChannel2 = req.body.relayChannel === 2 || targetId === "ENR-6SQHG0";

    // Primary hardware board where physical relays are connected
    const primaryHardwareId = "ENR-0KDOY8";

    // 1. Fetch primary hardware document
    let primaryDevice = await Device.findOne({ deviceId: primaryHardwareId });

    if (!primaryDevice) {
      console.error(`❌ Primary hardware device ${primaryHardwareId} not found in DB!`);
      return res.status(404).json({ success: false, message: "Hardware device not found" });
    }

    if (!primaryDevice.telemetry) primaryDevice.telemetry = {};

    let newR1 = primaryDevice.relay1State ?? false;
    let newR2 = primaryDevice.relay2State ?? false;

    // 2. Toggle the correct relay state on primary hardware
    if (isChannel2) {
      newR2 = !newR2;
      primaryDevice.relay2State = newR2;
      primaryDevice.telemetry.relay2State = newR2;
      console.log(`🎯 [TOGGLE CHANNEL 2] Primary Hardware (${primaryHardwareId}) Relay2 set to: ${newR2}`);
    } else {
      newR1 = !newR1;
      primaryDevice.relay1State = newR1;
      primaryDevice.relayState = newR1;
      primaryDevice.telemetry.relay1State = newR1;
      primaryDevice.telemetry.relayState = newR1;
      console.log(`🎯 [TOGGLE CHANNEL 1] Primary Hardware (${primaryHardwareId}) Relay1 set to: ${newR1}`);
    }

    primaryDevice.lastSeen = new Date();
    await primaryDevice.save();

    // 3. Sync virtual device record (ENR-6SQHG0) if toggled via virtual ID
    if (targetId === "ENR-6SQHG0") {
      await Device.updateOne(
        { deviceId: "ENR-6SQHG0" },
        {
          $set: {
            relayState: newR2,
            relay1State: newR2,
            relay2State: newR2,
            "telemetry.relayState": newR2,
            "telemetry.relay1State": newR2,
            "telemetry.relay2State": newR2,
            lastSeen: new Date(),
          },
        },
        { upsert: true }
      );
      console.log(`✅ Synced Virtual Device ENR-6SQHG0 relayState to: ${newR2}`);
    }

    console.log(`================ 🔌 [RELAY TOGGLE END] ================\n`);

    return res.status(200).json({
      success: true,
      targetRelayState: isChannel2 ? newR2 : newR1,
      relay1State: newR1,
      relay2State: newR2,
    });        
  } catch (err) {  
    console.error("❌ [TOGGLE EXCEPTION]:", err); 
    return res.status(500).json({ success: false, error: err.message });
  }
};

router.post("/toggle", handleToggle);
router.post("/toggle/:deviceId", handleToggle);

export default router;