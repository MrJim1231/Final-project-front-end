import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getTodos, createTodo, deleteTodo, patchTodo } from "../api/todos";
import type { Todo } from "../api/todos";

// === Тип состояния ===
interface TasksState {
  items: Todo[];
  loading: boolean;
  selected: Todo | null;
  error: string | null;
  selectedDate: string;
  searchQuery: string; // 🆕 добавили поле поиска
}

const initialState: TasksState = {
  items: [],
  loading: false,
  selected: null,
  error: null,
  selectedDate: new Date().toISOString().split("T")[0],
  searchQuery: "", // 🆕 начальное значение
};

// === 🟢 Получить все задачи ===
export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getTodos();
    } catch (err: any) {
      return rejectWithValue(err.message || "Ошибка при загрузке задач");
    }
  }
);

// === 🟣 Добавить задачу ===
export const addNewTask = createAsyncThunk(
  "tasks/addNew",
  async (task: Omit<Todo, "id">, { rejectWithValue }) => {
    try {
      return await createTodo(task);
    } catch (err: any) {
      return rejectWithValue(err.message || "Ошибка при добавлении задачи");
    }
  }
);

// === 🔴 Удалить задачу ===
export const removeTask = createAsyncThunk(
  "tasks/remove",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteTodo(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Ошибка при удалении задачи");
    }
  }
);

// === 🟡 Обновить задачу ===
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async (update: { id: string } & Partial<Todo>, { rejectWithValue }) => {
    try {
      const { id, ...data } = update;
      return await patchTodo(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message || "Ошибка при обновлении задачи");
    }
  }
);

// === Slice ===
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<Todo | null>) => {
      state.selected = action.payload;
    },
    clearSelected: (state) => {
      state.selected = null;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },

    // 🆕 === Поиск ===
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    selectFirstTask: (state, action: PayloadAction<Todo[]>) => {
      state.selected = action.payload[0] ?? null;
    },
  },

  extraReducers: (builder) => {
    builder
      // === Получение ===
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // === Добавление ===
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // === Удаление ===
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
        if (state.selected?.id === action.payload) {
          state.selected = state.items[0] || null;
        }
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // === Обновление ===
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
          if (state.selected?.id === updated.id) state.selected = updated;
        }
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// === Экспорты ===
export const {
  selectTask,
  clearSelected,
  clearError,
  setSelectedDate,
  selectFirstTask,
  setSearchQuery, // 🆕 экспорт
} = tasksSlice.actions;

export default tasksSlice.reducer;
