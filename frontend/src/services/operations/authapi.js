import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { userProfile } from "../api";

// ===============================
// SEND OTP
// ===============================
export const sendOtp = async (email, firstName, navigate) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector(
      "POST",
      userProfile.SENDOTP_API,
      { email, firstName }
    );

    toast.success("OTP Sent Successfully");
    navigate("/login");
    return res.data;
  } catch (err) {
    toast.error("Could Not Send OTP");
    throw err?.response?.data?.message || "OTP sending failed";
  } finally {
    toast.dismiss(toastId);
  }
};

// ===============================
// SIGNUP
// ===============================
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

// ===============================
// LOGIN (🔥 FIXED)
// ===============================
export const login = async (email, password) => {
  try {
    const res = await apiConnector(
      "POST",
      userProfile.LOGIN_API,
      { email, password },
      {
        "Content-Type": "application/json",
      }
    );

    // ✅ SAVE TOKEN
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (err) {
    throw err?.response?.data?.message || "Login failed";
  }
};

// ===============================
// RESET PASSWORD TOKEN
// ===============================
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

// ===============================
// RESET PASSWORD
// ===============================
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

// ===============================
// LOGOUT
// ===============================
export const logout = () => {
  localStorage.removeItem("token");
};

// ===============================
// VERIFY FORGOT PASSWORD OTP
// ===============================
export const verifyForgotOtp = async ({ email, otp }) => {
  const response = await apiConnector(
    "POST",
    userProfile.VERIFY_FORGOT_OTP_API,
    { email, otp }
  );

  return response.data;
};

// ===============================
// GOOGLE LOGIN (🔥 FIXED)
// ===============================
export const googleLoginApi = async (credential) => {
  try {
    const res = await apiConnector(
      "POST",
      userProfile.GOOGLE_LOGIN_API,
      { credential },
      {
        "Content-Type": "application/json",
      }
    );

    // ✅ SAVE TOKEN
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (err) {
    throw err?.response?.data?.message || "Google login failed";
  }
};
