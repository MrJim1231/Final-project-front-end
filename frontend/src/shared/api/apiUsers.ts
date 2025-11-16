// src/shared/api/apiUsers.ts
import axios from "axios";

export const apiUsers = axios.create({
  baseURL: "https://6918561721a96359486fba13.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiUsers.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Users API Error:", err?.response || err);
    return Promise.reject(err);
  }
);
