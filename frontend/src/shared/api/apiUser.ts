import { api, setAuthToken } from "./api";

export const UserAPI = {
  setToken: setAuthToken,

  // ===========================
  // 🔐 AUTH
  // ===========================
  login: (data: { username: string; password: string }) =>
    api.post("/auth/login", data),

  register: (data: any) => api.post("/auth/register", data),

  // ===========================
  // 👤 PROFILE
  // ===========================
  getProfile: () => api.get("/profile"),

  updateProfile: (data: any) => api.put("/profile", data),

  // ===========================
  // 🔑 CHANGE PASSWORD
  // ===========================
  changePassword: (params: { oldPassword: string; newPassword: string }) =>
    api.put("/profile/change-password", {
      oldPassword: params.oldPassword,
      newPassword: params.newPassword,
    }),
};
