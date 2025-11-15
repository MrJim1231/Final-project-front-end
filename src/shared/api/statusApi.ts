import { apiMeta } from "@/shared/api/apiMeta";

export const getTaskStatus = () => apiMeta.get("task-status");
export const createTaskStatus = (data: { title: string }) =>
  apiMeta.post("task-status", data);
export const updateTaskStatus = (id: string, data: { title: string }) =>
  apiMeta.put(`task-status/${id}`, data);
export const deleteTaskStatus = (id: string) =>
  apiMeta.delete(`task-status/${id}`);
