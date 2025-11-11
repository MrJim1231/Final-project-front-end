// src/entities/task/api/todos.ts
import { api } from "../../../shared/api/base";

export interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: "Low" | "Moderate" | "High" | "Extreme";
  status: "Not Started" | "In Progress" | "Completed";
  image?: string;
  vital?: boolean;
  completedAt?: string | null;
  date?: string; // ✅ добавь вот это (для пользовательской даты)
}

const ENDPOINT = "todos";

// === Получить все задачи ===
export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get<Todo[]>(ENDPOINT);
  return data;
};

// === Добавить новую задачу ===
export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const { data } = await api.post<Todo>(ENDPOINT, todo);
  return data;
};

// === Удалить задачу ===
export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`${ENDPOINT}/${id}`);
};

// === Обновить задачу полностью ===
export const updateTodo = async (
  id: string,
  updatedFields: Partial<Todo>
): Promise<Todo> => {
  const { data } = await api.put<Todo>(`${ENDPOINT}/${id}`, updatedFields);
  return data;
};

// === Частичное обновление (например, статус) ===
export const patchTodo = async (
  id: string,
  fields: Partial<Todo>
): Promise<Todo> => {
  const { data } = await api.put<Todo>(`${ENDPOINT}/${id}`, fields);
  return data;
};
