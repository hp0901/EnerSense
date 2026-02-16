import axios from "axios";

export const axiosInstance = axios.create({});

/* =================================
   ✅ REQUEST INTERCEPTOR
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
   ✅ RESPONSE INTERCEPTOR
   Auto logout when token expired
================================= */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.log("Session expired");

      // remove token
      localStorage.removeItem("token");

      // redirect to login
      window.location.href = "/login";
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
  bodyData,
  headers = {},
  params = {},
  responseType = "json"
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: {
      ...headers,
    },
    params,
    responseType, // ✅ ADD THIS
  });
};

