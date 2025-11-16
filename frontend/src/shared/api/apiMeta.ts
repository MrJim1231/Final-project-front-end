// src/shared/api/apiMeta.ts
import axios from "axios";

export const apiMeta = axios.create({
  baseURL: "https://691861ee21a96359486fde57.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiMeta.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Meta API Error:", err?.response || err);
    return Promise.reject(err);
  }
);
