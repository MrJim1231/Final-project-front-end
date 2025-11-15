import { apiMeta } from "@/shared/api/apiMeta";

export const getTaskStatus = async () => {
  const { data } = await apiMeta.get("task-status");
  return data; // ← ВОЗВРАЩАЕМ data !!!
};

export const createTaskStatus = async (body: { title: string }) => {
  const { data } = await apiMeta.post("task-status", body);
  return data;
};

export const updateTaskStatus = async (id: string, body: { title: string }) => {
  const { data } = await apiMeta.put(`task-status/${id}`, body);
  return data;
};

export const deleteTaskStatus = async (id: string) => {
  await apiMeta.delete(`task-status/${id}`);
};
