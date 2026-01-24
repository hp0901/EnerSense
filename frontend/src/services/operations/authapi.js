import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { userProfile } from "../api";

// Send OTP
export const sendOtp = async (email, firstName, navigate, dispatch) => {
  console.log("Comes under authapi")
  const toastId = toast.loading("Loading...")
  // dispatch(setLoading(true))
  try {
    console.log("going to backend side")
    const res = await apiConnector("POST", userProfile.SENDOTP_API, { email, firstName });
    console.log(firstName)
    toast.success("OTP Sent Successfully")
    navigate("/login")
    return res.data;
  } catch (err) {
    console.log("Error in otp")
    console.log("SENDOTP API ERROR............", err)
    toast.error("Could Not Send OTP")
    throw err?.response?.data?.message || "OTP sending failed";
  } finally {
    // dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// Signup
export const signup = async (payload) => {
  try {
    const res = await apiConnector(
      "POST",
      userProfile.SIGNUP_API,
      payload
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (err) {
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Signup failed"
    );
  }
};


// Login
export const login = async (email, password) => {
  try {
    const res = await apiConnector("POST", userProfile.LOGIN_API, {
      email,
      password,
    });

    return res.data;
  } catch (err) {
    throw err?.response?.data?.message || "Login failed";
  }
};

// Reset password token
export const resetPasswordToken = async (email) => {
  try {
    const res = await apiConnector(
      "POST",
      userProfile.RESETPASSTOKEN_API,
      { email }
    );
    return res.data;
  } catch (err) {
    throw err?.response?.data?.message || "Reset token failed";
  }
};

// Reset password
export const resetPassword = async (data) => {
  try {
    const res = await apiConnector(
      "POST",
      userProfile.RESETPASSWORD_API,
      data
    );
    return res.data;
  } catch (err) {
    throw err?.response?.data?.message || "Password reset failed";
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};
// VERIFY FORGOT PASSWORD OTP
// ===============================
export const verifyForgotOtp = async ({ email, otp }) => {
  const response = await apiConnector("POST", userProfile.VERIFY_FORGOT_OTP_API, {
    email,
    otp,
  });

  return response.data;
};