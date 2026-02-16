//User Profile API Service

const BASE_URL = 'http://localhost:4000/api/v1';

// const BASE_URL = "https://enersense.duckdns.org/api/v1";

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

// Chatbot API Service
export const chatbotEndpoints = {
  SEND_MESSAGE_API: BASE_URL + "/chatbot/message",
};
// Forget Password APIs

export const authEndpoints = {
  // ...existing
  RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
  SEND_FORGOT_PASSWORD_OTP: BASE_URL + "/auth/forgot-password/send-otp",
  VERIFY_FORGOT_PASSWORD_OTP: BASE_URL +"/auth/forgot-password/verify-otp",
};

// Profile Update Api
export const profileEndpoints = {
   UPDATE_PROFILE: BASE_URL + "/profile/update",
   GET_PROFILE: BASE_URL + "/profile/me",
}

// Premium APIs
export const premiumEndpoints = {
  ACTIVATE_PREMIUM: BASE_URL + "/premium/activate",
  CAPTURE_PREMIUM: BASE_URL + "/premium/capture",
  VERIFY_PREMIUM: BASE_URL + "/premium/verify",
};

// Payment APIs
export const paymentEndpoints = {
  GET_MY_PAYMENTS: "/payments/my-payments",
};

// User Card Verification API
export const userCardEndpoints = {
  VERIFY_CARD: BASE_URL + "/user-card/verify",
};

