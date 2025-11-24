// shared/api/apiUser.ts
import { api, setAuthToken } from "./api";

export const UserAPI = {
  setToken: setAuthToken,

  login: (data: { username: string; password: string }) =>
    api.post("/auth/login", data),

  register: (data: any) => api.post("/auth/register", data),

  getProfile: () => api.get("/auth/profile"),

  updateProfile: (data: any) => api.put("/auth/profile", data),

  changePassword: (params: {
    oldPassword: string;
    newPassword: string;
    token: string;
  }) =>
    api.put(
      "/auth/change-password",
      { oldPassword: params.oldPassword, newPassword: params.newPassword },
      { headers: { Authorization: params.token } }
    ),
};
