import axios from "axios";

const API = axios.create({
  baseURL: "https://enersense.duckdns.org/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
});

export const fetchUserCard = () => {
  const token = localStorage.getItem("token");

  return API.get("/user-card", {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
};
