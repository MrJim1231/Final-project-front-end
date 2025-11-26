import { api } from "./api";

export const getTaskStatus = async () => {
  const res = await api.get("/status");
  return res.data; // массив
};

export const createTaskStatus = async (data: { title: string }) => {
  const res = await api.post("/status", data);
  return res.data;
};

export const updateTaskStatus = async (id: string, data: { title: string }) => {
  const res = await api.put(`/status/${id}`, data);
  return res.data;
};

export const deleteTaskStatus = async (id: string) => {
  const res = await api.delete(`/status/${id}`);
  return res.data;
};
