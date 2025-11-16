// src/entities/task/index.ts

// === UI ===
export { TaskCard } from "./TaskCard/ui/TaskCard";
export { TaskDetailsModal } from "./ui/TaskDetailsModal/TaskDetailsModal";

// === MODEL ===
export {
  fetchTasks,
  addNewTask,
  removeTask,
  updateTaskStatus,
  selectTask,
  clearSelected,
  clearError,
  setSelectedDate,
  selectFirstTask,
} from "./model/tasksSlice";

export type { Todo } from "./api/todos";
