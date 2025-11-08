import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getTodos,
  createTodo,
  deleteTodo,
  patchTodo,
} from "../../../shared/api/todos";
import type { Todo } from "../../../shared/api/todos";

// === Тип состояния ===
interface TasksState {
  items: Todo[];
  loading: boolean;
  selected: Todo | null;
  error?: string | null;
  selectedDate: string; // 📅 текущая дата из календаря
}

const initialState: TasksState = {
  items: [],
  loading: false,
  selected: null,
  error: null,
  selectedDate: new Date().toISOString().split("T")[0], // по умолчанию сегодня
};

// === 🟢 Получить все задачи ===
export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const data = await getTodos();
  return data;
});

// === 🟣 Добавить новую задачу ===
export const addNewTask = createAsyncThunk(
  "tasks/addNew",
  async (newTask: Omit<Todo, "id">, { rejectWithValue }) => {
    try {
      const created = await createTodo(newTask);
      return created;
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

// === 🟡 Универсальное обновление задачи ===
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async (update: { id: string } & Partial<Todo>, { rejectWithValue }) => {
    try {
      const { id, ...data } = update;
      const updated = await patchTodo(id, data);
      return updated;
    } catch (err: any) {
      return rejectWithValue(err.message || "Ошибка при обновлении задачи");
    }
  }
);

// === 🔵 Универсальное обновление (старый вариант) ===
export const updateTask = createAsyncThunk(
  "tasks/update",
  async (update: Partial<Todo> & { id: string }, { rejectWithValue }) => {
    try {
      const updated = await patchTodo(update.id, update);
      return updated;
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
    // 📌 Выбор конкретной задачи
    selectTask: (state, action: PayloadAction<Todo | null>) => {
      state.selected = action.payload;
    },

    // 🧹 Очистка выбранной задачи при переходе между страницами
    clearSelected: (state) => {
      state.selected = null;
    },

    // 📅 Установка выбранной даты (из календаря)
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },

    // ❗ Очистка ошибок
    clearError: (state) => {
      state.error = null;
    },

    // 🟢 Выбор первой задачи из фильтрованного списка
    selectFirstTask: (state, action: PayloadAction<Todo[]>) => {
      if (action.payload.length > 0) {
        state.selected = action.payload[0];
      } else {
        state.selected = null;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // === Получение задач ===
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
        state.error = action.error.message || "Ошибка при загрузке задач";
      })

      // === Добавление задачи ===
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // === Удаление задачи ===
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);

        // если удалили выбранную → выбрать следующую
        if (state.selected?.id === action.payload) {
          if (state.items.length > 0) {
            state.selected = state.items[0];
          } else {
            state.selected = null;
          }
        }
      })

      // === Обновление статуса / vital / completedAt и т.д. ===
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;

          // если выбранная изменилась — обновить ссылку
          if (state.selected?.id === updated.id) {
            state.selected = updated;
          }
        }
      })

      // === Универсальное обновление (старый вариант) ===
      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((t) => t.id === updated.id);
        if (index !== -1) {
          state.items[index] = updated;
          if (state.selected?.id === updated.id) {
            state.selected = updated;
          }
        }
      });
  },
});

// === Экспорт экшенов ===
export const {
  selectTask,
  clearSelected,
  clearError,
  setSelectedDate,
  selectFirstTask,
} = tasksSlice.actions;

// === Экспорт редьюсера ===
export default tasksSlice.reducer;
