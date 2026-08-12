import express from "express";
import { Device, Telemetry } from "../models/esp32Device.js";

const router = express.Router();

const sanitizeDeviceId = (id) => String(id || "").trim().toUpperCase();

const VIRTUAL_DEVICE_MAP = {
  "ENR-OOI0VW": { primaryHardwareId: "ENR-0KDOY8", channel: 2 },
};

/**
 * 📥 POST /api/v1/esp32device/telemetry
 */
const handleTelemetryIngest = async (req, res) => {
  try {
    const rawId = req.params.deviceId || req.body.deviceId;
    const deviceId = sanitizeDeviceId(rawId);
    const { voltage, current, power, temperature, humidity } = req.body;

    if (!deviceId) return res.status(400).json({ success: false, error: "Missing deviceId" });

    let device = await Device.findOne({ deviceId });
    if (!device) {
      device = await Device.create({
        deviceId,
        relayState: false,
        relay1State: false,
        relay2State: false,
      });
    }

    const targetR1 = device.relay1State ?? false;
    const targetR2 = device.relay2State ?? false;

    if (!device.telemetry) device.telemetry = {};
    device.lastSeen = new Date();
    device.telemetry.voltage = voltage ?? 0;
    device.telemetry.current = current ?? 0;
    device.telemetry.power = power ?? 0;
    device.telemetry.temperature = temperature ?? 0;
    device.telemetry.humidity = humidity ?? 0;
    device.telemetry.updatedAt = new Date();

    device.markModified("telemetry");
    await device.save();

    // Sync mapped virtual devices strictly for their assigned channel
    for (const [virtId, mapInfo] of Object.entries(VIRTUAL_DEVICE_MAP)) {
      if (mapInfo.primaryHardwareId === deviceId) {
        const virtState = mapInfo.channel === 2 ? targetR2 : targetR1;
        await Device.updateOne(
          { deviceId: virtId },
          {
            $set: {
              lastSeen: new Date(),
              relayState: virtState,
              relay1State: mapInfo.channel === 1 ? virtState : false,
              relay2State: mapInfo.channel === 2 ? virtState : false,
              powerStatus: virtState,
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
      }
    }

    return res.status(200).json({
      success: true,
      targetRelayState: targetR1,
      relay1State: targetR1,
      relay2State: targetR2,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

router.post("/telemetry", handleTelemetryIngest);
router.post("/telemetry/:deviceId", handleTelemetryIngest);

/**
 * 📡 GET /api/v1/esp32device/telemetry/:deviceId
 */
router.get("/telemetry/:deviceId", async (req, res) => {
  try {
    const rawId = req.params.deviceId;
    let deviceId = sanitizeDeviceId(rawId);
    let channelOverride = 1;

    if (VIRTUAL_DEVICE_MAP[deviceId]) {
      channelOverride = VIRTUAL_DEVICE_MAP[deviceId].channel;
      deviceId = VIRTUAL_DEVICE_MAP[deviceId].primaryHardwareId;
    }

    const device = await Device.findOne({ deviceId }).lean();
    if (!device) {
      return res.status(200).json({
        success: true,
        deviceId: rawId,
        telemetry: { isOnline: false, relay1State: false, relay2State: false },
      });
    }

    const evaluatedRelayState = channelOverride === 2 
      ? (device.relay2State ?? false) 
      : (device.relay1State ?? false);

    return res.status(200).json({
      success: true,
      deviceId: rawId,
      telemetry: {
        voltage: device.telemetry?.voltage ?? 0,
        current: device.telemetry?.current ?? 0,
        power: device.telemetry?.power ?? 0,
        temperature: device.telemetry?.temperature ?? 0,
        humidity: device.telemetry?.humidity ?? 0,
        relayState: evaluatedRelayState,
        relay1State: device.relay1State ?? false,
        relay2State: device.relay2State ?? false,
        isOnline: Date.now() - new Date(device.lastSeen || 0).getTime() < 15000,
        lastSeen: device.lastSeen || null,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 🔌 POST /api/v1/esp32device/toggle
 */
const handleToggle = async (req, res) => {
  try {
    let rawId = req.params.deviceId || req.body.deviceId;
    let targetId = sanitizeDeviceId(rawId);

    if (!targetId) return res.status(400).json({ success: false, message: "Missing deviceId" });

    let primaryHardwareId = targetId;
    let isChannel2 = req.body.relayChannel === 2;

    if (VIRTUAL_DEVICE_MAP[targetId]) {
      primaryHardwareId = VIRTUAL_DEVICE_MAP[targetId].primaryHardwareId;
      isChannel2 = VIRTUAL_DEVICE_MAP[targetId].channel === 2;
    }

    let primaryDevice = await Device.findOne({ deviceId: primaryHardwareId });
    if (!primaryDevice) primaryDevice = await Device.findOne({ deviceId: targetId });
    if (!primaryDevice) return res.status(404).json({ success: false, message: "Device not found" });

    if (!primaryDevice.telemetry) primaryDevice.telemetry = {};

    let newR1 = primaryDevice.relay1State ?? false;
    let newR2 = primaryDevice.relay2State ?? false;

    // 🔑 STRICT CHANNEL ISOLATION
    if (isChannel2) {
      newR2 = !newR2;
      primaryDevice.relay2State = newR2;
      primaryDevice.telemetry.relay2State = newR2;
    } else {
      newR1 = !newR1;
      primaryDevice.relay1State = newR1;
      primaryDevice.telemetry.relay1State = newR1;
    }

    primaryDevice.lastSeen = new Date();
    primaryDevice.markModified("telemetry");
    await primaryDevice.save();

    // Sync Virtual Device Record without setting relay1State to true
    if (VIRTUAL_DEVICE_MAP[targetId]) {
      const activeState = isChannel2 ? newR2 : newR1;
      await Device.updateOne(
        { deviceId: targetId },
        {
          $set: {
            relayState: activeState,
            relay1State: isChannel2 ? false : activeState,
            relay2State: isChannel2 ? activeState : false,
            powerStatus: activeState,
            "telemetry.relayState": activeState,
            "telemetry.relay1State": isChannel2 ? false : activeState,
            "telemetry.relay2State": isChannel2 ? activeState : false,
            lastSeen: new Date(),
          },
        },
        { upsert: true }
      );
    }

    return res.status(200).json({
      success: true,
      targetRelayState: isChannel2 ? newR2 : newR1,
      relay1State: newR1,
      relay2State: newR2,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

router.post("/toggle", handleToggle);
router.post("/toggle/:deviceId", handleToggle);

export default router;