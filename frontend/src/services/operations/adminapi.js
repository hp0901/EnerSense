import { apiConnector } from "../apiConnector";
import { deviceEndpoints } from "../api";

const { SEND_BULK_EMAIL } = deviceEndpoints;

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