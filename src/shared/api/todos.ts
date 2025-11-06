// src/shared/api/todos.ts
import axios from "axios";

const BASE_URL = "https://6907339bb1879c890ed9165d.mockapi.io/todos";

// 👇 добавляем именованный экспорт интерфейса
export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Moderate" | "High" | "Extreme";
  status: "Not Started" | "In Progress" | "Completed";
  image?: string;
  createdAt: string;
  dueDate?: string;
}

// 👇 а вот сам запрос
export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
