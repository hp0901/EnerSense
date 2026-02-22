// controllers/deviceController.js
import { nanoid } from "nanoid";
import Device from "../models/Device.js";

export const pairDevice = async (req, res) => {
  try {
    const { deviceId } = req.body;
    const userId = req.user.id;

    const device = await Device.findOne({ deviceId });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Invalid device ID"
      });
    }

    if (device.user) {
      return res.status(400).json({
        success: false,
        message: "Device already paired"
      });
    }

    device.user = userId;
    await device.save();

    return res.status(200).json({
      success: true,
      message: "Device paired successfully",
      device
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getMyDevices = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user.id });

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

export const toggleDevice = async (req, res) => {
  try {
    const { id } = req.params;

    const device = await Device.findById(id);

    if (!device)
      return res.status(404).json({ success: false });

    device.powerStatus = !device.powerStatus;
    device.voltage = device.powerStatus ? 228 : 0;
    device.usage = device.powerStatus
      ? Math.floor(Math.random() * 80 + 20)
      : 0;

    await device.save();

    return res.status(200).json({
      success: true,
      device
    });

  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

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

export const createDevice = async (req, res) => {
  try {
    const { deviceType } = req.body;

    // Generate Unique ID
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