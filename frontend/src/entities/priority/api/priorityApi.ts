import { api } from "@/shared/api/api";

// === Получить все приоритеты ===
export const getTaskPriority = async () => {
  const res = await api.get("/priority");
  return res.data; // [{ id, title }]
};

// === Создать приоритет ===
export const createTaskPriority = async (data: { title: string }) => {
  const res = await api.post("/priority", data);
  return res.data;
};

// === Обновить приоритет ===
export const updateTaskPriority = async (
  id: string,
  data: { title: string }
) => {
  const res = await api.put(`/priority/${id}`, data);
  return res.data;
};

// === Удалить приоритет ===
export const deleteTaskPriority = async (id: string) => {
  const res = await api.delete(`/priority/${id}`);
  return res.data;
};
