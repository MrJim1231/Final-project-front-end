import { api } from "./api";

export const getTaskPriority = async () => {
  const res = await api.get("/priority");
  return res.data; // массив [{id,title}]
};

export const createTaskPriority = async (data: { title: string }) => {
  const res = await api.post("/priority", data);
  return res.data;
};

export const updateTaskPriority = async (
  id: string,
  data: { title: string }
) => {
  const res = await api.put(`/priority/${id}`, data);
  return res.data;
};

export const deleteTaskPriority = async (id: string) => {
  const res = await api.delete(`/priority/${id}`);
  return res.data;
};
