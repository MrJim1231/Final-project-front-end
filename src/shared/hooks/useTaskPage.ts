// src/shared/hooks/useTaskPage.ts
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

  const filteredTasks = items.filter(filterFn);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (filteredTasks.length > 0 && !selected) {
      dispatch(selectTask(filteredTasks[0]));
    }
  }, [filteredTasks, selected, dispatch]);

  const handleSelectTask = (taskId: string) => {
    const found = items.find((t) => t.id === taskId);
    if (found) {
      dispatch(selectTask(found));
      if (isMobile) setIsModalOpen(true);
    }
  };

  const handleDelete = () => {
    if (!selected) return;
    if (window.confirm("Удалить задачу?")) {
      const currentIndex = filteredTasks.findIndex((t) => t.id === selected.id);
      dispatch(removeTask(selected.id));
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
