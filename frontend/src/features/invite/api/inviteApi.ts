import { api } from "@/shared/api/api";

export const inviteApi = {
  sendInvite: (email: string, role = "edit") =>
    api.post("/invite/send", { email, role }),

  getMembers: () => api.get("/invite/members"),

  updateRole: (id: string, role: string) =>
    api.put(`/invite/member/${id}/role`, { role }),

  getProjectLink: () => api.get("/invite/project-link"),
};
