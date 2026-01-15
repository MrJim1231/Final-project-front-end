import { api } from "@/shared/api/api";
import { setAuthToken } from "@/shared/api/api";

export const UserAPI = {
  setToken: setAuthToken,

  // ===========================
  // 🔐 AUTH
  // ===========================
  login: (data: { email: string; password: string }) =>
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
