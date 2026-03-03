import axios from "axios";

export const axiosInstance = axios.create({});

/* =================================
   REQUEST INTERCEPTOR
   Add token automatically
================================= */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =================================
   RESPONSE INTERCEPTOR
   Clear token ONLY (NO redirect)
================================= */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.log("Session expired. Clearing token...");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

/* =================================
   API CONNECTOR
================================= */
export const apiConnector = (
  method,
  url,
  bodyData = null,
  headers = {},
  params = {},
  responseType = "json"
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers: {
      ...headers,
    },
    params,
    responseType,
  });
};