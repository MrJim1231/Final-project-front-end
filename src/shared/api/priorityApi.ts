import { apiMeta } from "@/shared/api/apiMeta";

export const getTaskPriority = () => apiMeta.get("task-priority");
export const createTaskPriority = (data: { title: string }) =>
  apiMeta.post("task-priority", data);
export const updateTaskPriority = (id: string, data: { title: string }) =>
  apiMeta.put(`task-priority/${id}`, data);
export const deleteTaskPriority = (id: string) =>
  apiMeta.delete(`task-priority/${id}`);
