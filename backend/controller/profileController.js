import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { firstName, lastName, phone, removeProfileImage } =
      req.body || {};

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updateData = {};

    /* ================= TEXT FIELDS ================= */
    if (firstName && firstName.trim() !== "")
      updateData.firstName = firstName.trim();

    if (lastName && lastName.trim() !== "")
      updateData.lastName = lastName.trim();

    if (phone && phone.trim() !== "")
      updateData.phone = phone.trim();


    /* ================= IMAGE UPLOAD ================= */
    if (req.file) {

      // ✅ delete old image from cloudinary
      if (user.profileImageId) {
        await cloudinary.uploader.destroy(user.profileImageId);
      }

      updateData.profileImage = req.file.path;
      updateData.profileImageId = req.file.filename;
    }

    /* ================= IMAGE DELETE ================= */
    if (removeProfileImage === "true") {

      if (user.profileImageId) {
        await cloudinary.uploader.destroy(user.profileImageId);
      }

      updateData.profileImage = "";
      updateData.profileImageId = "";
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Phone number already in use",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};



export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select("-password")
      .populate("devices");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};
 