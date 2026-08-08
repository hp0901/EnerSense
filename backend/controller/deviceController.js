// controllers/deviceController.js
import { nanoid } from "nanoid";
import Device from "../models/Device.js";
import User from "../models/User.js"; 
import { maintenanceEmail } from "../Email/maintenanceTemplate.js";
import { sendPushNotification } from "../services/pushNotificationService.js";
import NotificationSettings from "../models/NotificationSettings.js";

// =============================
// Pair Device to User
// =============================
export const pairDevice = async (req, res) => {
  try {
    const { deviceId, name, deviceType } = req.body;
    const userId = req.user.id; // from auth middleware

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "Device ID is required",
      });
    }

    // Clean inputs (trim whitespace & make uppercase to match ENR-XXXXXX)
    const cleanDeviceId = deviceId.trim().toUpperCase();

    // 1. Check if device exists in pre-registered pool
    const existingDevice = await Device.findOne({ deviceId: cleanDeviceId });

    if (!existingDevice) {
      return res.status(404).json({
        success: false,
        message: "Invalid device ID. Please check the code or contact support.",
      });
    }

    // 2. Prevent hijacking if already paired
    if (existingDevice.user && existingDevice.user.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "Device is already paired to another user",
      });
    }

    // 3. Pair device to user (FIXED: using 'user' to match getMyDevices)
    existingDevice.user = userId; 
    if (name) existingDevice.name = name;
    if (deviceType) existingDevice.deviceType = deviceType;

    await existingDevice.save();

    return res.status(200).json({
      success: true,
      message: "Device paired successfully",
      device: existingDevice,
    });
  } catch (error) {
    console.error("Pairing error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error during pairing",
    });
  }
};

// =============================
// Get My Devices
// =============================
export const getMyDevices = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user.id });
    console.log("Devices found for user:", devices.length);

    return res.status(200).json({
      success: true,
      devices
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// =============================
// Toggle Device Relay State
// =============================
// backend/controller/deviceController.js

// backend/controllers/deviceController.js

export const toggleDevice = async (req, res) => {
  try {
    const rawId = req.params.id || req.params.deviceId || req.body.deviceId;
    const deviceId = rawId ? rawId.trim().toUpperCase() : null;
    const { relayChannel, targetState } = req.body;

    if (!deviceId) {
      return res.status(400).json({ success: false, message: "Device ID missing" });
    }

    // Identify primary hardware ID vs virtual ID
    const PRIMARY_ID = "ENR-0KDOY8";
    const VIRTUAL_ID = "ENR-6SQHG0";

    const isChannel2 = relayChannel === 2 || deviceId === VIRTUAL_ID;

    // 1. Always fetch the primary hardware device
    let primaryDevice = await Device.findOne({ deviceId: PRIMARY_ID });

    if (!primaryDevice) {
      // Fallback if primary isn't found by exact ID
      primaryDevice = await Device.findOne({ deviceId });
    }

    if (!primaryDevice) {
      return res.status(404).json({ success: false, message: "Device not found" });
    }

    if (!primaryDevice.telemetry) primaryDevice.telemetry = {};

    // 2. Toggle state on primary hardware
    if (isChannel2) {
      const newState = targetState !== undefined ? targetState : !primaryDevice.relay2State;
      primaryDevice.relay2State = newState;
      primaryDevice.telemetry.relay2State = newState;

      // 🔑 CRITICAL FIX: Keep Virtual Device ENR-6SQHG0 perfectly in sync!
      await Device.updateOne(
        { deviceId: VIRTUAL_ID },
        {
          $set: {
            relayState: newState,
            relay1State: newState,
            relay2State: newState,
            "telemetry.relayState": newState,
            "telemetry.relay1State": newState,
            "telemetry.relay2State": newState,
            lastSeen: new Date(),
          },
        },
        { upsert: true }
      );
    } else {
      const newState = targetState !== undefined ? targetState : !primaryDevice.relay1State;
      primaryDevice.relay1State = newState;
      primaryDevice.relayState = newState;
      primaryDevice.powerStatus = newState;
      primaryDevice.telemetry.relay1State = newState;
      primaryDevice.telemetry.relayState = newState;
    }

    primaryDevice.lastSeen = new Date();
    await primaryDevice.save();

    return res.status(200).json({
      success: true,
      message: "Device toggled successfully",
      deviceId: primaryDevice.deviceId,
      relay1State: primaryDevice.relay1State,
      relay2State: primaryDevice.relay2State,
    });
  } catch (error) {
    console.error("Error in toggleDevice:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =============================
// Unpair Device
// =============================
export const unpairDevice = async (req, res) => {
  try {
    const { id } = req.params;

    const device = await Device.findById(id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    device.user = null;
    device.powerStatus = false;
    device.voltage = 0;
    device.usage = 0;

    await device.save();

    return res.status(200).json({
      success: true,
      message: "Device unpaired successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unpair failed",
    });
  }
};

// =============================
// Create Device (Admin / Master Pool)
// =============================
export const createDevice = async (req, res) => {
  try {
    const { deviceType } = req.body;

    // Generate Unique ID starting with ENR-
    const deviceId = "ENR-" + nanoid(6).toUpperCase();

    const newDevice = await Device.create({
      deviceId,
      deviceType: deviceType || "bulb",
      user: null,
      powerStatus: false,
      voltage: 0,
      usage: 0,
      connectionStatus: "offline",
    });

    return res.status(201).json({
      success: true,
      message: "Device created successfully",
      device: newDevice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Device creation failed",
    });
  }
};

// =============================
// Get All Devices (Admin)
// =============================
export const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate("user", "email");

    return res.status(200).json({
      success: true,
      devices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch devices",
    });
  }
};

// =============================
// Admin Bulk Email
// =============================
export const sendBulkEmail = async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({
        success: false,
        message: "Subject and content are required",
      });
    }

    const users = await User.find({}, "email firstName");
    let successCount = 0;

    for (const user of users) {
      try {
        await maintenanceEmail(
          user.email,
          user.firstName,
          subject,
          content
        );

        successCount++;
        await new Promise(resolve => setTimeout(resolve, 150));
      } catch (err) {
        console.log("Failed for:", user.email, err.message);
      }
    }

    return res.json({
      success: true,
      totalSent: successCount,
    });
  } catch (error) {
    console.error("Bulk email error:", error);
    return res.status(500).json({
      success: false,
      message: "Bulk email failed",
    });
  }
};

// =============================
// Update Device Usage & Alerts
// =============================
const threshold = 2000;

export const updateDeviceUsage = async (req, res) => {
  try {
    const { deviceId, usage } = req.body;

    const device = await Device.findOne({ deviceId });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found"
      });
    }

    device.usage = usage;
    await device.save();

    if (device.usage > threshold && device.user) {
      const settings = await NotificationSettings.findOne({ user: device.user });

      if (settings?.pushAlerts) {
        await sendPushNotification(
          device.user,
          "EnerSense Alert ⚡",
          "High energy consumption detected"
        );
      }
    }

    res.json({
      success: true,
      device
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Device update failed"
    });
  }
};

// =============================
// Delete Device (Admin)
// =============================
export const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    const device = await Device.findById(id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found"
      });
    }

    if (device.user) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete paired device"
      });
    }

    await Device.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Device deleted successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Device deletion failed"
    });
  }
};