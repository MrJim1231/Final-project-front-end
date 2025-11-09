// src/shared/api/base.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://690f630945e65ab24ac39edf.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

// (опционально) общий перехватчик ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error);
    return Promise.reject(error);
  }
);
