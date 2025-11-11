// src/pages/dashboard/ui/CompletedTask/CompletedTask.tsx
import "./CompletedTask.css";
import { useEffect, useMemo } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { TaskCard } from "../../entities/task/TaskCard/ui/TaskCard";
import { fetchTasks } from "../../entities/task/model/tasksSlice";
import type { RootState, AppDispatch } from "../../app/providers/store";

export const CompletedTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.tasks);

  // 🚀 Загружаем задачи при первом открытии
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, items.length]);

  // ✅ Получаем завершённые задачи из Redux
  const completedTasks = useMemo(
    () => items.filter((t) => t.status === "Completed"),
    [items]
  );

  if (loading) {
    return (
      <p className="completed-task__loading">Loading completed tasks...</p>
    );
  }

  return (
    <div className="completed-task">
      {/* === Заголовок === */}
      <div className="completed-task__header">
        <div className="completed-task__title-wrapper">
          <FiCheckSquare className="completed-task__icon" />
          <h3 className="completed-task__title">Completed Tasks</h3>
        </div>
      </div>

      {/* === Список карточек === */}
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            date={new Date(task.createdAt).toLocaleDateString()}
            priority={task.priority}
            status={task.status}
            image={task.image}
            completedAt={task.completedAt || "Recently completed"}
            type="completed"
            showAlert
            enableDesktopModal // 👈 теперь работает и на десктопе
          />
        ))
      ) : (
        <p className="completed-task__empty">
          ✅ No completed tasks yet — finish some from your To-Do list!
        </p>
      )}
    </div>
  );
};
