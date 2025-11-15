// src/shared/api/apiTasks.ts
import axios from "axios";

export const apiTasks = axios.create({
  baseURL: "https://690f630945e65ab24ac39edf.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiTasks.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Tasks API Error:", err?.response || err);
    return Promise.reject(err);
  }
);
