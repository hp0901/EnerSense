import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    /* ================= AUTH CHECK ================= */
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    /* ================= BODY DATA ================= */
    const {
      firstName,
      lastName,
      phone,
      removeProfileImage,
    } = req.body || {};

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    /* ================= FIND USER ================= */
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updateData = {};

    /* ================= TEXT FIELDS ================= */
    if (firstName?.trim()) updateData.firstName = firstName.trim();
    if (lastName?.trim()) updateData.lastName = lastName.trim();
    if (phone?.trim()) updateData.phone = phone.trim();

    /* ================= IMAGE UPLOAD ================= */
    if (req.file) {
      if (user.profileImageId && process.env.CLOUD_NAME) {
        try {
          await cloudinary.uploader.destroy(user.profileImageId);
        } catch (err) {
          console.log("Cloudinary delete failed:", err.message);
        }
      }

      updateData.profileImage = req.file.path;
      updateData.profileImageId = req.file.filename;
    }

    /* ================= IMAGE DELETE ================= */
    if (removeProfileImage === true || removeProfileImage === "true") {
      if (user.profileImageId && process.env.CLOUD_NAME) {
        try {
          await cloudinary.uploader.destroy(user.profileImageId);
        } catch (err) {
          console.log("Cloudinary delete failed:", err.message);
        }
      } 

      updateData.profileImage = "";
      updateData.profileImageId = "";
    }

    /* ================= EMPTY UPDATE CHECK ================= */
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided to update",
      });
    }

    /* ================= UPDATE USER ================= */
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    /* ================= RESPONSE ================= */
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    /* ================= DUPLICATE ERROR ================= */
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Phone number already in use",
      });
    }

    /* ================= GENERAL ERROR ================= */
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
 