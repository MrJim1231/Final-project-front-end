import axios from "axios";

// ===============================
// 🔥 BASE URL
// ===============================
export const API_URL =
  import.meta.env.VITE_API_URL || "https://todolist-back-end.vercel.app/api";

// ===============================
// 🔥 Axios instance
// ===============================
export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ===============================
// 🔥 Token setter
// ===============================
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
