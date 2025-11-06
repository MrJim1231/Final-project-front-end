import axios from "axios";

// === Интерфейс задачи ===
export interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: "Low" | "Moderate" | "High" | "Extreme";
  status: "Not Started" | "In Progress" | "Completed";
  image?: string;
}

// === Базовый URL ===
const API_URL = "https://6907339bb1879c890ed9165d.mockapi.io/todos";

// === Получить все задачи ===
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const { data } = await axios.get<Todo[]>(API_URL);
    return data;
  } catch (error) {
    console.error("Ошибка при загрузке задач:", error);
    throw new Error("Не удалось загрузить список задач");
  }
};

// === Добавить новую задачу ===
export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  try {
    const { data } = await axios.post<Todo>(API_URL, todo, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    throw new Error("Не удалось добавить задачу");
  }
};

// === Удалить задачу ===
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw new Error("Не удалось удалить задачу");
  }
};

// === Обновить задачу (полное обновление) ===
export const updateTodo = async (
  id: string,
  updatedFields: Partial<Todo>
): Promise<Todo> => {
  try {
    const { data } = await axios.put<Todo>(`${API_URL}/${id}`, updatedFields);
    return data;
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    throw new Error("Не удалось обновить задачу");
  }
};

// === Частичное обновление (например, только статус) ===
export const patchTodo = async (
  id: string,
  fields: Partial<Todo>
): Promise<Todo> => {
  try {
    const { data } = await axios.patch<Todo>(`${API_URL}/${id}`, fields);
    return data;
  } catch (error) {
    console.error("Ошибка при частичном обновлении:", error);
    throw new Error("Не удалось изменить данные задачи");
  }
};
