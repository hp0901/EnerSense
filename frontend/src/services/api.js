//User Profile API Service

// const BASE_URL = 'http://localhost:4000/api/v1';

const BASE_URL = "https://enersense.duckdns.org/api/v1";

export const userProfile = {
  // auth (already there)
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  VERIFY_FORGOT_OTP_API: BASE_URL + "/auth/verify-forgot-otp",
  GOOGLE_LOGIN_API: BASE_URL + "/auth/google-login",

  // 🔔 notification settings
  GET_NOTIFICATION_SETTINGS_API: BASE_URL + "/settings/notifications",
  UPDATE_NOTIFICATION_SETTINGS_API: BASE_URL + "/settings/notifications",
};
