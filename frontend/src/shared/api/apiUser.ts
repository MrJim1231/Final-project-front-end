import { api, setAuthToken } from "./api";

export const UserAPI = {
  setToken: setAuthToken,

  // Auth routes
  login: (data: { username: string; password: string }) =>
    api.post("/auth/login", data),

  register: (data: any) => api.post("/auth/register", data),

  // Profile routes
  getProfile: () => api.get("/profile"), // GET /api/profile
  updateProfile: (data: any) => api.put("/profile", data), // PUT /api/profile

  changePassword: (params: {
    oldPassword: string;
    newPassword: string;
    token: string;
  }) =>
    api.put(
      "/profile/change-password", // PUT /api/profile/change-password
      { oldPassword: params.oldPassword, newPassword: params.newPassword },
      { headers: { Authorization: params.token } }
    ),
};
