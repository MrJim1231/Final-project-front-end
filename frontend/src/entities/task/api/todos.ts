import { api } from "@/shared/api/api";

// === Тип ответа с backend ===
interface ServerTodo {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  image?: string;
  vital?: boolean;
  completedAt?: string | null;

  status: { _id: string; title: string };
  priority: { _id: string; title: string };
}

// === Фронтовый Todo ===
export interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt: string;

  status: string;
  priority: string;

  image?: string;
  vital: boolean;
  completedAt?: string | null;
}

const ENDPOINT = "todos";

// === Маппинг Server → Client ===
const mapServerTodo = (t: ServerTodo): Todo => ({
  id: t._id,
  title: t.title,
  description: t.description,
  createdAt: t.createdAt,
  status: t.status?.title ?? "",
  priority: t.priority?.title ?? "",
  image: t.image ?? "",
  vital: Boolean(t.vital),
  completedAt: t.completedAt ?? null,
});

// === GET /todos ===
export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get<ServerTodo[]>(ENDPOINT);
  return data.map(mapServerTodo);
};

// === POST /todos ===
export const createTodo = async (todo: {
  title: string;
  description: string;
  priority: string;
  status: string;
  image?: string;
  vital: boolean;
}): Promise<Todo> => {
  const { data } = await api.post<ServerTodo>(ENDPOINT, todo);
  return mapServerTodo(data);
};

// === DELETE /todos/:id ===
export const deleteTodo = async (id: string) => {
  await api.delete(`${ENDPOINT}/${id}`);
};

// === PUT /todos/:id ===
export const updateTodo = async (
  id: string,
  fields: Partial<Todo>
): Promise<Todo> => {
  const { data } = await api.put<ServerTodo>(`${ENDPOINT}/${id}`, fields);
  return mapServerTodo(data);
};

// === PATCH /todos/:id ===
export const patchTodo = async (
  id: string,
  fields: Partial<Todo>
): Promise<Todo> => {
  const { data } = await api.patch<ServerTodo>(`${ENDPOINT}/${id}`, fields);
  return mapServerTodo(data);
};
