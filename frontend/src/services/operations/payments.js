import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../api";

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
