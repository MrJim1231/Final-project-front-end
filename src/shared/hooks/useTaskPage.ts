import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  selectTask,
  removeTask,
} from "../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../app/providers/store";

export const useTaskPage = (filterFn: (task: any) => boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selected, loading } = useSelector(
    (state: RootState) => state.tasks
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // ✅ фильтруем задачи по логике конкретной страницы
  const filteredTasks = items.filter(filterFn);

  // === Загружаем задачи при монтировании ===
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // === Отслеживаем ширину экрана ===
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Держим selected в рамках фильтрованных задач
  useEffect(() => {
    if (loading) return;

    // если список пуст — сбрасываем выбор
    if (filteredTasks.length === 0) {
      if (selected) dispatch(selectTask(null));
      return;
    }

    // если ничего не выбрано — выбираем первую задачу
    if (!selected) {
      dispatch(selectTask(filteredTasks[0]));
      return;
    }

    // если выбранная задача не входит в фильтр — выбираем первую доступную
    const stillVisible = filteredTasks.some((t) => t.id === selected.id);
    if (!stillVisible) {
      dispatch(selectTask(filteredTasks[0]));
    }
  }, [loading, filteredTasks, selected, dispatch]);

  // === Выбор задачи (только из отфильтрованных) ===
  const handleSelectTask = (taskId: string) => {
    const found = filteredTasks.find((t) => t.id === taskId);
    if (found) {
      dispatch(selectTask(found));
      if (isMobile) setIsModalOpen(true);
    }
  };

  // === Удаление выбранной задачи ===
  const handleDelete = () => {
    if (!selected) return;
    if (window.confirm("Удалить задачу?")) {
      const currentIndex = filteredTasks.findIndex((t) => t.id === selected.id);
      dispatch(removeTask(selected.id));

      // выбираем следующую задачу
      const next =
        filteredTasks[currentIndex + 1] ||
        filteredTasks[currentIndex - 1] ||
        null;
      dispatch(selectTask(next));
    }
  };

  return {
    items,
    selected,
    loading,
    filteredTasks,
    isMobile,
    isModalOpen,
    setIsModalOpen,
    handleSelectTask,
    handleDelete,
  };
};
