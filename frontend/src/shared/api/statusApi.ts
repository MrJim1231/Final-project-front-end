import { apiMeta } from "@/shared/api/apiMeta";

export const getTaskStatus = async () => {
  const { data } = await apiMeta.get("task-status");
  return data; // ← теперь возвращается массив статусов
};

export const createTaskStatus = (data: { title: string }) =>
  apiMeta.post("task-status", data);

export const updateTaskStatus = (id: string, data: { title: string }) =>
  apiMeta.put(`task-status/${id}`, data);

export const deleteTaskStatus = (id: string) =>
  apiMeta.delete(`task-status/${id}`);
