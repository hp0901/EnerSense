import NotificationToken from "../models/notificationToken.js";

export const saveToken = async (req, res) => {

  try {

    const userId = req.user.id;
    const { token } = req.body;

    if(!token){
      return res.status(400).json({
        success:false,
        message:"Token required"
      });
    }

    await NotificationToken.findOneAndUpdate(
      { token },
      {
        token,
        user: userId
      },
      { upsert:true }
    );

    return res.status(200).json({
      success:true,
      message:"Token saved successfully"
    });

  } catch(error){

    console.error("SAVE_TOKEN_ERROR",error);

    res.status(500).json({
      success:false,
      message:"Failed to save token"
    });

  }

};