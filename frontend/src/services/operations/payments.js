import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../api";
import { invoiceEndpoints } from "../api";

// ✅ Get all payments
export const getMyPayments = async () => {
  const token = localStorage.getItem("token");

  const res = await apiConnector(
    "GET",
    paymentEndpoints.GET_MY_PAYMENTS,
    null,
    {
      Authorization: `Bearer ${token}`,
    }
  );

  return res.data;
};


// ✅ Download Invoice (NEW FUNCTION)

export const downloadInvoice = async (paymentId) => {
  const res = await apiConnector(
    "GET",
    `${invoiceEndpoints.DOWNLOAD_INVOICE}/${paymentId}`,
    null,
    {},
    {},
    "blob"
  );

  return res;
};

