import axios from "axios";

export const axiosInstance = axios.create({});

// 🔥 Request interceptor (adds token automatically)
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

export const apiConnector = (method, url, bodyData, headers = {}, params = {}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: {
      ...headers, // ✅ keep Content-Type etc.
    },
    params,
  });
};
