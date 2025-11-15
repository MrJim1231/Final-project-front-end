import { apiTasks } from "@/shared/api/apiTasks";

export interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt: string;

  // 🔥 теперь динамические статусы и приоритеты
  priority: string;
  status: string;

  image?: string;
  vital?: boolean;
  completedAt?: string | null;
  date?: string;
}

const ENDPOINT = "todos";

// === Получить все задачи ===
export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await apiTasks.get<Todo[]>(ENDPOINT);
  return data;
};

// === Добавить новую задачу ===
export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const { data } = await apiTasks.post<Todo>(ENDPOINT, todo);
  return data;
};

// === Удалить задачу ===
export const deleteTodo = async (id: string): Promise<void> => {
  await apiTasks.delete(`${ENDPOINT}/${id}`);
};

// === Обновить задачу полностью ===
export const updateTodo = async (
  id: string,
  updatedFields: Partial<Todo>
): Promise<Todo> => {
  const { data } = await apiTasks.put<Todo>(`${ENDPOINT}/${id}`, updatedFields);
  return data;
};

// === Частичное обновление ===
export const patchTodo = async (
  id: string,
  fields: Partial<Todo>
): Promise<Todo> => {
  const { data } = await apiTasks.put<Todo>(`${ENDPOINT}/${id}`, fields);
  return data;
};
