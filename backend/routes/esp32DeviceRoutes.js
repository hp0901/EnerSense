import express from "express";
import { Device, Telemetry } from "../models/esp32Device.js";

const router = express.Router();

/**
 * 📥 POST /api/v1/esp32device/telemetry/:deviceId
 * ESP32 Data Ingestion Route
 * Logs telemetry history and returns the stored targetRelayState back to the ESP32.
 */
router.post("/telemetry/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId || req.body.deviceId;
    const { voltage, current, power, temperature, humidity } = req.body;

    if (!deviceId) {
      return res.status(400).json({ success: false, error: "Missing deviceId" });
    }

    // 1. Retrieve or initialize device state from DB FIRST
    let device = await Device.findOne({ deviceId });

    if (!device) {
      device = await Device.create({
        deviceId,
        relayState: true,
      });
    }

    // 2. Log historical entry using the target relay state in DB
    await Telemetry.create({
      deviceId,
      voltage,
      current,
      power,
      temperature,
      humidity,
      relayState: device.relayState,
    });

    // 3. Update lastSeen & telemetry metrics, preserving the database's target relay state
    device.lastSeen = new Date();
    device.telemetry = {
      voltage: voltage ?? 0,
      current: current ?? 0,
      power: power ?? 0,
      temperature: temperature ?? 0,
      humidity: humidity ?? 0,
      relayState: device.relayState,
      updatedAt: new Date(),
    };

    await device.save();

    // 4. Return targetRelayState so ESP32 knows whether to keep physical relay ON or OFF
    return res.status(200).json({
      success: true,
      targetRelayState: device.relayState,
    });
  } catch (error) {
    console.error("Telemetry Endpoint Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 📡 GET /api/v1/esp32device/telemetry/:deviceId
 * Fetches the latest telemetry record for a specific device.
 */
router.get("/telemetry/:deviceId", async (req, res) => {
  try {
    const { deviceId } = req.params;

    const latestTelemetry = await Telemetry.findOne({ deviceId })
      .sort({ timestamp: -1 })
      .lean();

    if (!latestTelemetry) {
      return res.status(200).json({
        success: true,
        telemetry: {
          voltage: 0,
          current: 0,
          power: 0,
          temperature: 0,
          humidity: 0,
          relayState: false,
        },
      });
    }

    return res.status(200).json({
      success: true,
      telemetry: latestTelemetry,
    });
  } catch (error) {
    console.error("Fetch Telemetry Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 🔌 POST /api/v1/esp32device/toggle
 * 🔌 POST /api/v1/esp32device/toggle/:deviceId
 * Frontend / Mobile Toggle Route (Supports deviceId in URL or Body)
 */
const handleToggle = async (req, res) => {
  try {
    const deviceId = req.params.deviceId || req.body.deviceId;
    const { targetRelayState } = req.body;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: deviceId",
      });
    }

    let device = await Device.findOne({ deviceId });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: `Device with ID '${deviceId}' not found.`,
      });
    }

    // Toggle current state if targetRelayState isn't explicitly provided
    const newRelayState =
      typeof targetRelayState === "boolean"
        ? targetRelayState
        : !device.relayState;

    // Update root state and nested telemetry snapshot
    device.relayState = newRelayState;
    device.lastSeen = new Date();

    if (device.telemetry) {
      device.telemetry.relayState = newRelayState;
    }

    await device.save();

    console.log(`🔌 [RELAY TOGGLE] Device: ${deviceId} -> New Target Relay State: ${newRelayState}`);

    return res.status(200).json({
      success: true,
      message: `Relay state updated to ${newRelayState ? "ON" : "OFF"}`,
      relayState: newRelayState,
      device,
    });
  } catch (error) {
    console.error("Toggle Endpoint Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to toggle relay state",
    });
  }
};

// Register toggle endpoints
router.post("/toggle", handleToggle);
router.post("/toggle/:deviceId", handleToggle);

export default router;