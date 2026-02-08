import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { userProfile, authEndpoints } from "../api";
import {getMyProfile}from "./profileapi"

/* ===============================
   SEND OTP (SIGNUP + RESEND)
================================ */
export const sendOtp = async (email, firstName) => {
  const toastId = toast.loading("Sending OTP...");
  try {
    const res = await apiConnector(
      "POST",
      userProfile.SENDOTP_API,
      { email, firstName }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success("📩 OTP sent successfully");
    return true;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Could not send OTP"
    );
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

/* ===============================
   SIGNUP (OTP VERIFIED)
================================ */
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
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.message ||
      "Signup failed"
    );
  }
};

/* ===============================
   LOGIN
================================ */
export const login = async (email, password, setUser) => {
  try {
    const res = await apiConnector(
      "POST",
      userProfile.LOGIN_API,
      { email, password },
      { "Content-Type": "application/json" }
    );

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      try {
        // ✅ fetch profile separately
        const profileRes = await getMyProfile();
        setUser(profileRes.data);
      } catch (profileError) {
        console.log("Profile fetch failed:", profileError);
      }
    }

    return res.data;

  } catch (error) {
    throw error?.response?.data?.message || "Login failed";
  }
};



/* ===============================
   SEND FORGOT PASSWORD OTP
================================ */
export const sendForgotPasswordOtp = async (email) => {
  const toastId = toast.loading("Sending OTP...");
  try {
    const res = await apiConnector(
      "POST",
      authEndpoints.SEND_FORGOT_PASSWORD_OTP,
      { email }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success("📩 OTP sent to your email");
    return true;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to send OTP"
    );
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

/* ===============================
   VERIFY FORGOT PASSWORD OTP
================================ */
export const verifyForgotPasswordOtp = async (email, otp) => {
  try {
    const res = await apiConnector(
      "POST",
      authEndpoints.VERIFY_FORGOT_PASSWORD_OTP,
      { email, otp }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return true;
  } catch (error) {
    throw (
      error?.response?.data?.message ||
      error?.message ||
      "OTP verification failed"
    );
  }
};

/* ===============================
   RESET PASSWORD
================================ */
export const resetPassword = async (data) => {
  try {
    const res = await apiConnector(
      "POST",
      userProfile.RESETPASSWORD_API,
      data
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (error) {
    throw error;
  }
};

/* ===============================
   LOGOUT
================================ */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  toast.success("Logged out successfully");
};

/* ===============================
   GOOGLE LOGIN
================================ */
export const googleLoginApi = async (credential) => {
  try {
    const res = await apiConnector(
      "POST",
      userProfile.GOOGLE_LOGIN_API,
      { credential },
      { "Content-Type": "application/json" }
    );

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Google login failed";
  }
};
