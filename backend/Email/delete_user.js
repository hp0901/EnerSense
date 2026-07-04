import User from "../models/User.js";
import {mailSender} from "../utils/mailSender.js";

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ================= SEND DELETE EMAIL =================
    await mailSender(
      user.email,
      "Your EnerSense Account Has Been Deleted",

      `
      <div style="
        font-family:Arial,sans-serif;
        max-width:650px;
        margin:auto;
        border:1px solid #eee;
        border-radius:14px;
        overflow:hidden;
      ">

        <div style="
          background:#0F172A;
          padding:30px;
          text-align:center;
        ">
          <img
            src="https://res.cloudinary.com/harshpatel0901/image/upload/v1768970755/EnerSence_logo_oarobg.png"
            style="height:70px;"
          />
        </div>

        <div style="padding:35px">

          <h2 style="color:#111827">
            Account Deleted
          </h2>

          <p>
            Hi <b>${user.firstName}</b>,
          </p>

          <p>
            Your EnerSense account has been
            permanently deleted by the admin.
          </p>

          <p>
            All associated access and
            premium services have been removed.
          </p>

          <div
            style="
              background:#FEF2F2;
              color:#991B1B;
              padding:16px;
              border-radius:10px;
              margin-top:18px;
            "
          >
            This action cannot be undone.
          </div>

          <br/>

          <p>
            Thank you for using
            <b>EnerSense</b>.
          </p>

          <br/>

          <p>
            Team EnerSense
          </p>

        </div>

      </div>
      `
    );

    // ================= DELETE USER =================
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted and email sent",
    });

  } catch (error) {

    console.log(
      "DELETE USER ERROR",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
