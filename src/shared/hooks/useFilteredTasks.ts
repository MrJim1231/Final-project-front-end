import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  removeTask,
  selectTask,
  updateTask,
} from "../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../app/providers/store";

/**
 * Универсальный хук для управления списками задач
 */
export const useFilteredTasks = (filterFn: (task: any) => boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, selected } = useSelector(
    (state: RootState) => state.tasks
  );

  const tasks = items.filter(filterFn);

  // === Загрузка при монтировании
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // === Автовыбор первой задачи
  useEffect(() => {
    if (tasks.length > 0 && !selected) {
      dispatch(selectTask(tasks[0]));
    }
  }, [tasks, selected, dispatch]);

  // === Если выбранная удалена
  useEffect(() => {
    if (selected && !tasks.find((t) => t.id === selected.id)) {
      const next = tasks[0] || null;
      dispatch(selectTask(next));
    }
  }, [tasks, selected, dispatch]);

  // === Обновление статуса
  const handleStatusUpdate = (
    id: string,
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    dispatch(
      updateTask({
        id,
        status: newStatus,
        vital: newStatus !== "Completed",
        completedAt:
          newStatus === "Completed" ? new Date().toISOString() : null,
      })
    );
    if (newStatus === "Completed" && selected?.id === id) {
      const idx = tasks.findIndex((t) => t.id === id);
      const next = tasks[idx + 1] || tasks[idx - 1] || null;
      dispatch(selectTask(next));
    }
  };

  // === Обновление vital
  const handleVitalUpdate = (id: string, isVital: boolean) => {
    dispatch(updateTask({ id, vital: isVital }));
    if (!isVital && selected?.id === id) {
      const idx = tasks.findIndex((t) => t.id === id);
      const next = tasks[idx + 1] || tasks[idx - 1] || null;
      dispatch(selectTask(next));
    }
  };

  // === Удаление
  const handleDelete = (id: string) => {
    if (window.confirm("Удалить задачу?")) {
      const idx = tasks.findIndex((t) => t.id === id);
      dispatch(removeTask(id));
      const next = tasks[idx + 1] || tasks[idx - 1] || null;
      dispatch(selectTask(next));
    }
  };

  // === Выбор задачи
  const handleSelect = (taskId: string) => {
    const found = items.find((t) => t.id === taskId);
    if (found) dispatch(selectTask(found));
  };

  return {
    tasks,
    loading,
    selected,
    handleDelete,
    handleStatusUpdate,
    handleVitalUpdate,
    handleSelect,
  };
};
