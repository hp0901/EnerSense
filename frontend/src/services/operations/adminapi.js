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