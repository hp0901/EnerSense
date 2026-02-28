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
  GET_MY_PAYMENTS:  BASE_URL + "/payments/my-payments",
};

// User Card Verification API
export const userCardEndpoints = {
  VERIFY_CARD: BASE_URL + "/user-card/verify",
};

// Invoice APIs
export const invoiceEndpoints = {
  DOWNLOAD_INVOICE: BASE_URL + "/invoice",
};

// Device Management APIs
export const deviceEndpoints = {
  // User APIs
  PAIR_DEVICE: BASE_URL + "/device/pair",
  GET_MY_DEVICES: BASE_URL + "/device/my-devices",
  TOGGLE_DEVICE: BASE_URL + "/device/toggle",
  UNPAIR_DEVICE: BASE_URL + "/device/unpair",
  CREATE_DEVICE: BASE_URL + "/admin/create",
  GET_ALL_DEVICES: BASE_URL + "/admin/all",
};

// Admin APIs
export const adminEndpoints = {
  SEND_BULK_EMAIL: BASE_URL + "/admin/send-email",
  GET_DASHBOARD: BASE_URL + "/admin/dashboard",
  GET_MONTHLY_REVENUE: BASE_URL + "/admin/monthly-revenue",
  GET_ALL_USERS: BASE_URL + "/admin/users",
  GET_ALL_PAYMENTS: BASE_URL + "/admin/payments/all",
};