import { apiConnector } from "../apiConnector";
import { adminEndpoints  } from "../api";

const { SEND_BULK_EMAIL } = adminEndpoints;

/* ===============================
   SEND BULK EMAIL
=============================== */
export const sendBulkEmailApi = async (subject, content) => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "POST",
      SEND_BULK_EMAIL,
      { subject, content },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.message;

  } catch (err) {
    console.log("SEND_BULK_EMAIL ERROR", err);

    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to send bulk email"
    );
  }
};

export const sendPushNotificationApi = async ({
  title,
  message,
  audience,
  link,
}) => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "POST",
      adminEndpoints.SEND_PUSH_NOTIFICATION,
      {
        title,
        message,
        audience, // all | premium | non-premium | new
        link,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.message;

  } catch (err) {
    console.log("SEND_PUSH_NOTIFICATION ERROR", err);

    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to send push notification"
    );
  }
};


const { GET_DASHBOARD, GET_MONTHLY_REVENUE } = adminEndpoints;

/* ===============================
   GET DASHBOARD STATS
================================ */
export const getDashboardStatsApi = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "GET",
      GET_DASHBOARD,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.data;

  } catch (err) {
    console.log("GET_DASHBOARD ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch dashboard stats"
    );
  }
};


/* ===============================
   GET MONTHLY REVENUE
================================ */
export const getMonthlyRevenueApi = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "GET",
      GET_MONTHLY_REVENUE,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.data;

  } catch (err) {
    console.log("GET_MONTHLY_REVENUE ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch monthly revenue"
    );
  }
};

const { GET_ALL_USERS } = adminEndpoints;

/* ===============================
   GET ALL USERS
================================ */
export const getAllUsersApi = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "GET",
      GET_ALL_USERS,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data.data;
  } catch (err) {
    console.log("GET_ALL_USERS ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch users"
    );
  }
};

const { GET_ALL_PAYMENTS } = adminEndpoints;

/* ===============================
   GET ALL PAYMENTS (ADMIN)
================================ */
export const getAllPaymentsApi = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "GET",
      GET_ALL_PAYMENTS,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    console.log("User All pAyment ",res.data.data)

    return res.data.data;

  } catch (err) {
    console.log("GET_ALL_PAYMENTS ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch payments"
    );
  }
};

///* ===============================
//   GET USER BY EMAIL
//================================ */
export const getUserById = async (id) => {
  try {
    const res = await apiConnector(
      "POST",
      adminEndpoints.GET_USER_BY_ID,
      { id }
    );

    return res.data;

  } catch (error) {
    console.error("GET USER BY ID ERROR:", error);
    throw error;
  }
};

const { MAKE_ADMIN } = adminEndpoints;

/* ================= MAKE ADMIN ================= */
export const makeAdminApi  = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "POST",
      MAKE_ADMIN,
      { userId }, // 🔥 body
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (err) {
    console.log("MAKE_ADMIN ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to make admin"
    );
  }
};

const { REMOVE_ADMIN } = adminEndpoints;

//* ================= REMOVE ADMIN ================= */
export const removeAdminApi  = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await apiConnector(
      "POST",
      REMOVE_ADMIN,
      { userId }, // 🔥 body
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (err) {
    console.log("REMOVE_ADMIN ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to remove admin"
    );
  }
}

const { SEND_OTP, VERIFY_OTP } = adminEndpoints;
//* ================= SEND OTP (2FA) ================= */
export const sendOtpApi = async (email) => {
  try {
    const res = await apiConnector(
      "POST",
      SEND_OTP,
      { email } // body
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data;

  } catch (err) {
    console.log("SEND OTP ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "Failed to send OTP"
    );
  }
};

//* ================= VERIFY OTP (2FA) ================= */
export const verifyOtpApi = async (email, otp) => {
  try {
    const res = await apiConnector(
      "POST",
      VERIFY_OTP,
      { email, otp } // body
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    return res.data;

  } catch (err) {
    console.log("VERIFY OTP ERROR", err);
    throw (
      err?.response?.data?.message ||
      err?.message ||
      "OTP verification failed"
    );
  }
};