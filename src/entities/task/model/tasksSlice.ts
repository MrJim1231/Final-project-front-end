// src/entities/task/model/tasksSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // 👈 тип импортируется отдельно
import { getTodos, deleteTodo, patchTodo } from "../../../shared/api/todos";
import type { Todo } from "../../../shared/api/todos";

interface TasksState {
  items: Todo[];
  loading: boolean;
  selected: Todo | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  selected: null,
};

// === 🔹 Thunks ===
export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const data = await getTodos();
  return data;
});

export const removeTask = createAsyncThunk(
  "tasks/remove",
  async (id: string) => {
    await deleteTodo(id);
    return id;
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({
    id,
    status,
  }: {
    id: string;
    status: "Not Started" | "In Progress" | "Completed";
  }) => {
    const updated = await patchTodo(id, { status });
    return updated;
  }
);

// === 🔹 Slice ===
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<Todo | null>) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
        if (state.selected?.id === action.payload) {
          state.selected = null;
        }
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      });
  },
});

export const { selectTask } = tasksSlice.actions;
export default tasksSlice.reducer;
